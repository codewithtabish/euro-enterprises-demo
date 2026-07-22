// src/components/general/(team)/check-upload-image.tsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { uploadWatermarkedImage } from "@/app/actions/upload-w-m-image";

export default function WatermarkedImageUploader() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadedUrl(null);

    try {
      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);

      // Convert to plain number array for server action
      const arrayBuffer = await file.arrayBuffer();
      const fileData = Array.from(new Uint8Array(arrayBuffer));

      const result = await uploadWatermarkedImage(
        fileData,
        file.type,
        file.name,
      );

      setUploadedUrl(result.fileUrl);
      setPreviewUrl(result.fileUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async () => {
    if (!uploadedUrl) return;

    try {
      const response = await fetch(uploadedUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `euro-enterprises-${Date.now()}.webp`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      setError("Download failed");
    }
  };

  const handleReset = () => {
    setPreviewUrl(null);
    setUploadedUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          EURO ENTERPRISES — Image Uploader
        </h2>
        <p className="text-gray-500 text-sm">
          Select an image to add branded watermark and upload
        </p>
      </div>

      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-600 file:text-white
            hover:file:bg-blue-700
            disabled:opacity-50 disabled:cursor-not-allowed
            cursor-pointer"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {isUploading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-3 text-gray-600 text-sm">
            Adding EURO ENTERPRISES watermark...
          </p>
        </div>
      )}

      {previewUrl && !isUploading && (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
            <div className="relative w-full h-[400px]">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 600px"
                priority
              />
            </div>
            {uploadedUrl && (
              <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                Watermarked
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-center">
            {uploadedUrl && (
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download
              </button>
            )}
            <button
              onClick={handleReset}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Upload Another
            </button>
          </div>

          {uploadedUrl && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1 font-semibold">
                S3 URL:
              </p>
              <p className="text-xs text-blue-600 break-all">{uploadedUrl}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
