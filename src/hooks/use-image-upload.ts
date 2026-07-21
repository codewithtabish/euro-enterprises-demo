"use client";

import { useState, useCallback } from "react";
import { getPresignedUrl } from "@/app/actions/upload-image"; // your existing action
import { toast } from "sonner";

interface UploadingFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: "uploading" | "done" | "error";
  url?: string;
}

export function useImageUpload(maxFiles: number = 10) {
  const [files, setFiles] = useState<UploadingFile[]>([]);

  const addFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return;

    const currentCount = files.filter((f) => f.status === "done").length;
    const remainingSlots = maxFiles - currentCount;

    if (remainingSlots <= 0) {
      toast.error(`Maximum ${maxFiles} images allowed`);
      return;
    }

    const validFiles = Array.from(newFiles)
      .filter((file) => {
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} is not an image`);
          return false;
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} exceeds 5MB limit`);
          return false;
        }
        return true;
      })
      .slice(0, remainingSlots);

    const newUploads: UploadingFile[] = validFiles.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: "uploading",
    }));

    setFiles((prev) => [...prev, ...newUploads]);

    // Upload each file
    newUploads.forEach(async (upload) => {
      try {
        const { presignedUrl, fileUrl } = await getPresignedUrl(
          upload.file.type,
          upload.file.name
        );

        await fetch(presignedUrl, {
          method: "PUT",
          body: upload.file,
          headers: { "Content-Type": upload.file.type },
        });

        setFiles((prev) =>
          prev.map((f) =>
            f.id === upload.id
              ? { ...f, status: "done", progress: 100, url: fileUrl }
              : f
          )
        );

        toast.success("Image uploaded!", { icon: "✅" });
      } catch (error) {
        console.error("Upload error:", error);
        setFiles((prev) =>
          prev.map((f) => (f.id === upload.id ? { ...f, status: "error", progress: 0 } : f))
        );
        toast.error(`Failed to upload ${upload.file.name}`);
      }
    });
  }, [files, maxFiles]);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file?.preview?.startsWith("blob:")) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
    toast.info("Image removed");
  }, []);

  const getUploadedUrls = useCallback(() => {
    return files.filter((f) => f.status === "done" && f.url).map((f) => f.url!);
  }, [files]);

  const uploadedCount = files.filter((f) => f.status === "done").length;
  const uploadingCount = files.filter((f) => f.status === "uploading").length;

  return { files, addFiles, removeFile, getUploadedUrls, uploadedCount, uploadingCount };
}