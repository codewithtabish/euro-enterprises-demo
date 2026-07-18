"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { BlogPreviewer } from "@/components/dashboard/blogs/create-blog/blog-previewer";

export default function BlogPreviewPage() {
  const searchParams = useSearchParams();
  const contentParam = searchParams.get("content");

  let content = { blocks: [] };
  try {
    if (contentParam) {
      content = JSON.parse(decodeURIComponent(contentParam));
    }
  } catch (e) {
    console.error("Failed to parse content:", e);
  }

  if (!content?.blocks?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <p>No content to preview</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <BlogPreviewer content={content} />
      </div>
    </div>
  );
}