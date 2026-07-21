"use server";

import prisma from "@/lib/prisma-client";
import { OpenAI } from "openai";
import { CarFormData, carSchema } from "@/schema/car";
import { generateUniqueSlug } from "@/lib/slugify";
import { revalidateAllSaleCars } from "./get_sales_car";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// ============================================
// EXTRACT TEXT FROM EDITORJS FOR AI
// ============================================
function extractTextFromContent(content: any): string {
  if (!content?.blocks) return "";

  return content.blocks
    .map((block: any) => {
      if (block.type === "paragraph") return block.data?.text || "";
      if (block.type === "header") return `## ${block.data?.text || ""}`;
      if (block.type === "list") return (block.data?.items || []).join("\n");
      if (block.type === "quote") return `> ${block.data?.text || ""}`;
      if (block.type === "raw") {
        const html = block.data?.html || "";
        return html
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim();
      }
      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}

// ============================================
// OPENAI: GENERATE SEO METADATA FOR CAR
// ============================================
async function generateCarSEOWithAI(
  title: string,
  brand: string,
  model: string,
  year: number,
  price: number,
  contentText: string,
) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert automotive SEO specialist. Based on the car details and description provided, generate professional SEO metadata for a car listing website.

STRICT RULES:
- DO NOT change or modify the title, brand, model, year, or price
- Generate compelling, click-worthy SEO metadata
- Keep meta descriptions under 160 characters
- Keep meta titles under 60 characters
- Make Open Graph descriptions engaging for social sharing
- Return ONLY a valid JSON object

Return this exact JSON structure:
{
  "metaTitle": "SEO-optimized title under 60 chars",
  "metaDescription": "Compelling meta description under 160 chars",
  "ogDescription": "Engaging social media description",
  "twitterDescription": "Twitter-optimized description",
  "keywords": ["relevant", "car", "seo", "keywords", "max", "10"]
}`,
        },
        {
          role: "user",
          content: `Car: ${year} ${brand} ${model} — ${title}\nPrice: PKR ${price}\n\nDescription:\n${contentText.slice(0, 3000)}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const aiResponse = response.choices[0]?.message?.content || "";
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        metaTitle: parsed.metaTitle || title,
        metaDescription:
          parsed.metaDescription ||
          `Buy ${year} ${brand} ${model} at PKR ${price}. View detailed specs and features.`,
        ogDescription:
          parsed.ogDescription ||
          `Check out this ${year} ${brand} ${model} for PKR ${price}.`,
        twitterDescription:
          parsed.twitterDescription ||
          parsed.ogDescription ||
          `Buy ${year} ${brand} ${model} — PKR ${price}`,
        keywords: parsed.keywords || [],
      };
    }

    throw new Error("Invalid AI response format");
  } catch (error) {
    console.error("OpenAI car SEO generation error:", error);
    return {
      metaTitle: `${year} ${brand} ${model} for Sale — PKR ${price}`,
      metaDescription: `Buy ${year} ${brand} ${model} at PKR ${price}. View detailed specs, features, and contact the seller today.`,
      ogDescription: `Check out this ${year} ${brand} ${model} for PKR ${price}. Available now!`,
      twitterDescription: `Buy ${year} ${brand} ${model} — PKR ${price}. Contact now!`,
      keywords: [
        brand.toLowerCase(),
        model.toLowerCase(),
        year.toString(),
        "car for sale",
        "used car",
      ],
    };
  }
}

// ============================================
// SERVER ACTION: Create Car
// ============================================
export async function createCarAction(formData: CarFormData) {
  const validated = carSchema.safeParse(formData);
  console.log("I AM HERE");

  if (!validated.success) {
    return {
      success: false,
      error: "Validation failed. Please check your inputs.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  // Auto-generate slug if empty
  const slug =
    validated.data.slug?.trim() || generateUniqueSlug(validated.data.title);

  // Check slug uniqueness
  const existing = await prisma.saleCar.findUnique({
    where: { slug },
  });

  if (existing) {
    return {
      success: false,
      error:
        "A car with this slug already exists. Please use a different slug.",
    };
  }

  try {
    // Extract text for AI SEO generation
    const contentText = extractTextFromContent(validated.data.description);

    // Generate SEO with OpenAI
    console.log("🤖 Generating SEO for car with OpenAI...");
    const seoData = await generateCarSEOWithAI(
      validated.data.title,
      validated.data.brand,
      validated.data.model,
      validated.data.year,
      validated.data.price,
      contentText,
    );
    console.log("✅ AI Generated metaTitle:", seoData.metaTitle);

    // Build canonical URL
    const canonicalUrl = `${BASE_URL}/cars/sales/${slug}`;

    // Use ogImage from form or fallback to coverImage
    const ogImage = validated.data.ogImage || validated.data.coverImage;

    const car = await prisma.saleCar.create({
      data: {
        title: validated.data.title,
        slug,
        coverImage: validated.data.coverImage,
        brand: validated.data.brand,
        model: validated.data.model,
        year: validated.data.year,
        price: validated.data.price,
        currency: validated.data.currency,
        mileage: validated.data.mileage,
        fuelType: validated.data.fuelType,
        transmission: validated.data.transmission,
        engine: validated.data.engine,
        color: validated.data.color,
        registration: validated.data.registration,
        description: validated.data.description,
        isAvailable: validated.data.isAvailable,
        images: {
          create: validated.data.images.map((img) => ({
            url: img.url,
            alt: img.alt || null,
          })),
        },
        // Create SEO record
        seo: {
          create: {
            metaTitle: seoData.metaTitle,
            metaDescription: seoData.metaDescription,
            canonicalUrl: canonicalUrl,
            noIndex: false,
            noFollow: false,
            ogTitle: validated.data.title,
            ogDescription: seoData.ogDescription,
            ogImage: ogImage,
            twitterTitle: validated.data.title,
            twitterDescription: seoData.twitterDescription,
            twitterImage: ogImage,
            schemaType: "Vehicle",
          },
        },
      },
      include: {
        images: true,
        seo: true,
      },
    });

    console.log("✅ Car created:", car.id, "| SEO:", car.seo?.metaTitle);
    revalidateAllSaleCars();

    // revalidatePath("/cars");
    return {
      success: true,
      carId: car.id,
      slug: car.slug,
      seo: {
        metaTitle: car.seo?.metaTitle,
        metaDescription: car.seo?.metaDescription,
        canonicalUrl: car.seo?.canonicalUrl,
        ogDescription: car.seo?.ogDescription,
        twitterDescription: car.seo?.twitterDescription,
      },
    };
  } catch (error) {
    console.error("Failed to create car:", error);
    return {
      success: false,
      error: "Something went wrong while saving the car. Please try again.",
    };
  }
}
