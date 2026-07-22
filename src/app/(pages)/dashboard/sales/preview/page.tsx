"use client";

import { BlogPreviewer } from "@/components/dashboard/blogs/create-blog/blog-previewer";

export default function SalesCarPreview(props) {
  if (typeof window === "undefined") return null;

  let content = null;

  try {
    const stored = sessionStorage.getItem("car_preview_content");

    if (stored) {
      content = JSON.parse(stored).content;
    }
  } catch (error) {
    console.error(error);
  }

  if (!content?.blocks?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <p>No content to preview. Go back and click Preview.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="mx-auto max-w-4xl">
        <BlogPreviewer content={content} />
      </div>
    </div>
  );
}
