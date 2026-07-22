"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// ── Watermark path ──────────────────────────────────────────────────────
const watermarkPath = path.join(
  process.cwd(),
  "public",
  "logos",
  "watermark.png",
);

/**
 * Load the original watermark PNG from disk.
 * Throws if the file does not exist.
 */
async function getOriginalWatermarkBuffer(): Promise<Buffer> {
  if (!fs.existsSync(watermarkPath)) {
    throw new Error(
      `Watermark file not found at: ${watermarkPath}. ` +
        `Please ensure public/logos/watermark.png exists.`,
    );
  }

  return fs.promises.readFile(watermarkPath);
}

/**
 * Resize the watermark proportionally to fit the target image.
 * The watermark will be ~30% of the image width (within 25–35% range).
 * Never larger than the image. Preserves aspect ratio. Keeps PNG transparency.
 */
async function resizeWatermark(
  originalWatermarkBuffer: Buffer,
  targetImageWidth: number,
  targetImageHeight: number,
): Promise<Buffer> {
  // Get watermark original dimensions
  const wmMeta = await sharp(originalWatermarkBuffer).metadata();
  const wmOriginalWidth = wmMeta.width ?? 500;
  const wmOriginalHeight = wmMeta.height ?? 200;

  // Target watermark width: 30% of image width
  let targetWidth = Math.round(targetImageWidth * 0.3);

  // Ensure watermark never exceeds image dimensions
  targetWidth = Math.min(targetWidth, targetImageWidth);

  // Calculate proportional height to preserve aspect ratio
  const aspectRatio = wmOriginalHeight / wmOriginalWidth;
  let targetHeight = Math.round(targetWidth * aspectRatio);

  // Ensure height also fits within the image
  targetHeight = Math.min(targetHeight, targetImageHeight);

  // If height was clamped, recalculate width to preserve aspect ratio
  if (targetHeight < Math.round(targetWidth * aspectRatio)) {
    targetWidth = Math.round(targetHeight / aspectRatio);
  }

  // Final safety clamp
  targetWidth = Math.min(targetWidth, targetImageWidth);
  targetHeight = Math.min(targetHeight, targetImageHeight);

  console.log(
    "[Watermark] Original dimensions:",
    wmOriginalWidth,
    "x",
    wmOriginalHeight,
  );
  console.log(
    "[Watermark] Target image dimensions:",
    targetImageWidth,
    "x",
    targetImageHeight,
  );
  console.log(
    "[Watermark] Resized watermark dimensions:",
    targetWidth,
    "x",
    targetHeight,
  );

  const resizedBuffer = await sharp(originalWatermarkBuffer)
    .resize(targetWidth, targetHeight, {
      fit: "inside",
      withoutEnlargement: false,
    })
    .png() // Preserve transparency
    .toBuffer();

  return resizedBuffer;
}

/**
 * Upload a watermarked image to S3.
 *
 * Pipeline:
 * 1. Receive image as number[] (Server Action compatible)
 * 2. Auto-rotate via EXIF
 * 3. Resize to max 1920px width
 * 4. Resize watermark proportionally (25–35% of image width)
 * 5. Composite watermark centered with blend: "over"
 * 6. Convert to WebP quality 90
 * 7. Strip EXIF
 * 8. Save debug.webp locally
 * 9. Upload processed buffer to S3
 * 10. Return S3 URL
 */
export async function uploadWatermarkedImage(
  fileData: number[],
  fileType: string,
  fileName: string,
): Promise<{ fileUrl: string }> {
  try {
    // ── 1. Convert incoming data to Buffer ─────────────────────────────
    const inputBuffer = Buffer.from(fileData);

    if (inputBuffer.length === 0) {
      throw new Error("Input file is empty");
    }

    console.log(
      "[Upload] Received file:",
      fileName,
      "| Type:",
      fileType,
      "| Size:",
      inputBuffer.length,
      "bytes",
    );

    // ── 2. Load original watermark ─────────────────────────────────────
    const originalWatermarkBuffer = await getOriginalWatermarkBuffer();
    console.log("[Upload] Watermark loaded from:", watermarkPath);

    // ── 3. Auto-rotate image based on EXIF ────────────────────────────
    const rotatedBuffer = await sharp(inputBuffer).rotate().toBuffer();

    const rotatedMeta = await sharp(rotatedBuffer).metadata();
    const originalWidth = rotatedMeta.width ?? 1920;
    const originalHeight = rotatedMeta.height ?? 1080;

    console.log(
      "[Upload] Image dimensions after rotation:",
      originalWidth,
      "x",
      originalHeight,
    );

    // ── 4. Resize image to max 1920px width ───────────────────────────
    const resizedBuffer = await sharp(rotatedBuffer)
      .resize(1920, null, {
        fit: "inside",
        withoutEnlargement: false,
      })
      .toBuffer();

    const resizedMeta = await sharp(resizedBuffer).metadata();
    const finalWidth = resizedMeta.width ?? 1920;
    const finalHeight = resizedMeta.height ?? 1080;

    console.log(
      "[Upload] Image dimensions after resize:",
      finalWidth,
      "x",
      finalHeight,
    );

    // ── 5. Resize watermark to fit the final image ────────────────────
    const watermarkResizedBuffer = await resizeWatermark(
      originalWatermarkBuffer,
      finalWidth,
      finalHeight,
    );

    // Verify watermark dimensions after resize
    const wmResizedMeta = await sharp(watermarkResizedBuffer).metadata();
    console.log(
      "[Upload] Watermark final dimensions:",
      wmResizedMeta.width,
      "x",
      wmResizedMeta.height,
    );

    // ── 6. Composite watermark onto image ─────────────────────────────
    // CRITICAL: The watermark MUST be smaller than or equal to the image.
    // We already ensured this in resizeWatermark().
    const watermarkedBuffer = await sharp(resizedBuffer)
      .composite([
        {
          input: watermarkResizedBuffer,
          gravity: "center",
          blend: "over",
        },
      ])
      .webp({
        quality: 90,
        effort: 4,
      })
      .withMetadata({ exif: {} }) // strip EXIF
      .toBuffer();

    console.log("[Upload] Watermark composited successfully");

    // ── 7. Save debug file locally ────────────────────────────────────
    const debugPath = path.join(process.cwd(), "debug.webp");
    await fs.promises.writeFile(debugPath, watermarkedBuffer);
    console.log("[Upload] Debug file saved to:", debugPath);

    // ── 8. Upload processed buffer to S3 ──────────────────────────────
    const sanitizedName = fileName
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-]/g, "-");

    const key = `euro/blog-covers/${uuidv4()}-${sanitizedName}.webp`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
      Body: watermarkedBuffer,
      ContentType: "image/webp",
      CacheControl: "public, max-age=31536000",
    });

    await s3.send(command);

    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    console.log("[Upload] S3 upload complete:", fileUrl);

    return { fileUrl };
  } catch (error) {
    console.error("[uploadWatermarkedImage] Error:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to process and upload image",
    );
  }
}
