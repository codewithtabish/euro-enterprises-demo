"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema, BlogSchemaType, slugify } from "@/schema/blog-schema";
import { X, Loader2, ImageIcon, CheckCircle2, FileText, Globe, Info, Upload, Eye, Star, List, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { getPresignedUrl } from "@/app/actions/upload-image";
import { toast, Toaster } from "sonner";
import BlogEditor from "./blog-editor";
import { createBlogAction } from "@/app/actions/blog-actions";

// ============================================
// TYPES
// ============================================
type TOCItem = {
  id: string;
  title: string;
  slug: string;
};

// ============================================
// STANDALONE IMAGE UPLOAD COMPONENT
// ============================================
type ImageUploadFieldProps = {
  label: string;
  icon: React.ElementType;
  preview: string | null;
  url: string;
  isUploading: boolean;
  fieldName: string;
  error?: { message?: string };
  description: string;
  dimensions: string;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
};

const ImageUploadField = React.memo(({
  label,
  icon: Icon,
  preview,
  url,
  isUploading,
  fieldName,
  error,
  description,
  dimensions,
  onFileSelect,
  onRemove,
}: ImageUploadFieldProps) => (
  <div className="space-y-3">
    <div className="flex items-start justify-between">
      <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Icon className="h-4 w-4 text-muted-foreground" />
        {label}
      </label>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
        <Info className="h-3 w-3" />
        <span>{dimensions}</span>
      </div>
    </div>

    <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>

    {!preview ? (
      <label
        htmlFor={`${fieldName}-input`}
        className={`flex h-52 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition
          ${isUploading 
            ? "border-primary bg-primary/5 cursor-wait" 
            : "border-border bg-muted/30 hover:border-primary hover:bg-primary/5"
          }`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
              <div className="absolute inset-0 h-10 w-10 rounded-full bg-primary/10 animate-ping" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-primary">Uploading to S3...</p>
              <p className="text-sm text-muted-foreground mt-1">Please don&apos;t close this tab</p>
            </div>
          </div>
        ) : (
          <>
            <div className="rounded-full bg-primary/10 p-3 mb-3 transition-transform group-hover:scale-110">
              <Upload className="h-7 w-7 text-primary" />
            </div>
            <p className="font-medium text-foreground text-sm">Click to upload {label.toLowerCase()}</p>
            <p className="mt-1 text-xs text-muted-foreground">PNG, JPG, WEBP — Max 5MB</p>
          </>
        )}
        <input
          id={`${fieldName}-input`}
          type="file"
          accept="image/*"
          onChange={onFileSelect}
          className="hidden"
          disabled={isUploading}
        />
      </label>
    ) : (
      <div className="relative h-60 w-full overflow-hidden rounded-2xl border border-border group shadow-sm">
        <Image
          src={preview}
          alt={label}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Uploaded
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="absolute right-3 top-3 rounded-full bg-destructive/90 backdrop-blur-sm p-2 text-destructive-foreground shadow-lg transition-all hover:bg-destructive hover:scale-110 active:scale-95"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="absolute bottom-3 left-3 right-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-[11px] text-white/90 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 truncate font-mono">
            {url}
          </p>
        </div>
      </div>
    )}

    {error && (
      <p className="text-sm font-medium text-destructive">{error.message}</p>
    )}
  </div>
));

ImageUploadField.displayName = "ImageUploadField";

// ============================================
// TABLE OF CONTENTS MANAGER COMPONENT
// ============================================
const TableOfContentsManager = React.memo(({
  items,
  onAdd,
  onRemove,
}: {
  items: TOCItem[];
  onAdd: (title: string) => void;
  onRemove: (id: string) => void;
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      toast.error("Please enter a section title");
      return;
    }

    // Support comma-separated values: "How JS works, Variables, Functions"
    const titles = trimmed.split(",").map((t) => t.trim()).filter(Boolean);

    titles.forEach((title) => {
      onAdd(title);
    });

    setInputValue("");

    if (titles.length > 1) {
      toast.success(`Added ${titles.length} sections`);
    } else {
      toast.success("Section added");
    }
  }, [inputValue, onAdd]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  }, [handleAdd]);

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <List className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Table of Contents</h3>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          {items.length} sections
        </span>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="How does JS work, Variables, Functions..."
          className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-background border border-input transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 active:scale-95 transition-all flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>
      <p className="text-xs text-muted-foreground">
        Type a section title and press Enter. Use commas to add multiple at once.
      </p>

      {/* TOC List */}
      {items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-muted/50 border border-border/50 group hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-sm text-foreground truncate">{item.title}</span>
              </div>
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="flex-shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all opacity-0 group-hover:opacity-100"
                title="Remove section"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-6 text-muted-foreground text-sm bg-muted/30 rounded-lg border border-dashed border-border">
          <List className="h-8 w-8 mx-auto mb-2 opacity-40" />
          No sections added yet. Add some above.
        </div>
      )}
    </div>
  );
});

TableOfContentsManager.displayName = "TableOfContentsManager";

// ============================================
// FEATURED TOGGLE COMPONENT
// ============================================
const FeaturedToggle = React.memo(({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}) => (
  <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${value ? "bg-amber-500/20" : "bg-muted"}`}>
        <Star className={`h-5 w-5 ${value ? "text-amber-500 fill-amber-500" : "text-muted-foreground"}`} />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">Featured Blog</p>
        <p className="text-xs text-muted-foreground">
          {value
            ? "This blog will appear in the featured section"
            : "This blog will appear in the regular listing"}
        </p>
      </div>
    </div>
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        value ? "bg-amber-500" : "bg-muted-foreground/30"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
          value ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  </div>
));

FeaturedToggle.displayName = "FeaturedToggle";

// ============================================
// MAIN FORM COMPONENT
// ============================================
export const BlogFormComp = () => {
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  const [isCoverUploading, setIsCoverUploading] = useState(false);

  const [ogPreview, setOgPreview] = useState<string | null>(null);
  const [ogImageUrl, setOgImageUrl] = useState<string>("");
  const [isOgUploading, setIsOgUploading] = useState(false);

  const [editorContent, setEditorContent] = useState<any>({ blocks: [] });
  const editorRef = useRef<any>(null);
  const [contentValidated, setContentValidated] = useState(false);

  // MANUAL TABLE OF CONTENTS STATE
  const [tableOfContents, setTableOfContents] = useState<TOCItem[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BlogSchemaType>({
    resolver: zodResolver(blogSchema) as any,
    defaultValues: {
      title: "",
      slug: "",
      coverImage: "",
      ogImage: "",
      isFeatured: false,
      content: { blocks: [] },
    },
    mode: "onChange",
  });

  const isFeatured = useWatch({ control, name: "isFeatured" });

  // Sync editor content to form and validate
  const handleEditorChange = useCallback((data: any) => {
    setEditorContent(data);
    const hasBlocks = data?.blocks && data.blocks.length > 0;
    setValue("content", data, { shouldValidate: true });
    setContentValidated(hasBlocks);
  }, [setValue]);

  useEffect(() => {
    if (editorContent?.blocks?.length > 0) {
      setValue("content", editorContent, { shouldValidate: true });
    }
  }, [editorContent, setValue]);

  const handleGenerateSlug = useCallback(() => {
    const title = getValues("title");
    if (title?.trim()) {
      setValue("slug", slugify(title), { shouldValidate: true });
    }
  }, [getValues, setValue]);

  // ADD TOC ITEM
  const handleAddTOC = useCallback((title: string) => {
    setTableOfContents((prev) => {
      let slug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      const existingSlugs = new Set(prev.map((p) => p.slug));
      const baseSlug = slug;
      let counter = 1;
      while (existingSlugs.has(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      const newItem: TOCItem = {
        id: `${slug}-${Date.now()}`,
        title,
        slug,
      };

      return [...prev, newItem];
    });
  }, []);

  // REMOVE TOC ITEM
  const handleRemoveTOC = useCallback((id: string) => {
    setTableOfContents((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const onSubmit = useCallback(async (data: BlogSchemaType) => {
    const payload = {
      title: data.title,
      slug: data.slug,
      content: editorContent,
      ogImage: ogImageUrl,
      bannerImage: coverImageUrl,
      featured: data.isFeatured,
      tableOfContents: tableOfContents,
    };

    console.log("📤 Sending to server:", payload);
    console.log("📑 Table of Contents:", tableOfContents);

    const result = await createBlogAction(payload);

    if (result.success) {
      toast.success("Blog created successfully!");
      // Reset form
      setTableOfContents([]);
      setEditorContent({ blocks: [] });
      setCoverPreview(null);
      setCoverImageUrl("");
      setOgPreview(null);
      setOgImageUrl("");
    } else {
      toast.error(result.error || "Failed to create blog");
    }
  }, [editorContent, coverImageUrl, ogImageUrl, tableOfContents]);

  const handleImageUpload = useCallback(async (
    file: File,
    setPreview: (url: string | null) => void,
    setUrl: (url: string) => void,
    setUploading: (v: boolean) => void,
    fieldName: "coverImage" | "ogImage",
    label: string
  ) => {
    if (!file.type.startsWith("image/")) {
      toast.error(`${label} must be an image file`);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(`${label} must be less than 5MB`);
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    setUploading(true);

    try {
      const { presignedUrl, fileUrl } = await getPresignedUrl(file.type, file.name);

      const uploadRes = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!uploadRes.ok) throw new Error("Upload failed");

      URL.revokeObjectURL(localPreview);
      setPreview(fileUrl);
      setUrl(fileUrl);
      setValue(fieldName, fileUrl, { shouldValidate: true });

      toast.success(`${label} uploaded!`, {
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
      });
    } catch (error) {
      console.error("Upload error:", error);
      URL.revokeObjectURL(localPreview);
      setPreview(null);
      setUrl("");
      setValue(fieldName, "", { shouldValidate: true });
      toast.error(`Failed to upload ${label.toLowerCase()}. Try again.`);
    } finally {
      setUploading(false);
    }
  }, [setValue]);

  const removeImage = useCallback((
    preview: string | null,
    setPreview: (v: string | null) => void,
    setUrl: (v: string) => void,
    fieldName: "coverImage" | "ogImage"
  ) => {
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setUrl("");
    setValue(fieldName, "", { shouldValidate: true });
    toast.info("Image removed");
  }, [setValue]);

  const handlePreview = useCallback(async () => {
    let editorData;
    try {
      if (editorRef.current?.save) {
        editorData = await editorRef.current.save();
      } else {
        editorData = editorContent;
      }
    } catch {
      editorData = editorContent;
    }

    if (!editorData || !editorData.blocks?.length) {
      toast.error("No content to preview. Please add some content first.");
      return;
    }

    const previewPayload = {
      content: editorData,
      tableOfContents,
    };

    sessionStorage.setItem("blog_preview_content", JSON.stringify(previewPayload));
    window.open("/dashboard/blogs/preview", "_blank");
  }, [editorContent, tableOfContents]);

  const hasContent = editorContent?.blocks?.length > 0;
  const isFormReady = !isSubmitting && !isCoverUploading && !isOgUploading;

  return (
    <>
      <Toaster position="top-right" richColors />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 max-w-5xl mx-auto p-6 md:p-8 rounded-2xl bg-card border shadow-sm"
      >
        {/* Header with Preview */}
        <div className="flex items-start justify-between gap-4">
          <div className="text-center space-y-2 flex-1">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Create a Blog
            </h2>
            <p className="text-muted-foreground text-sm">
              Fill in the details below to publish your new blog post
            </p>
          </div>

          <div className="shrink-0 pt-2">
            <button
              type="button"
              onClick={handlePreview}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 transition-colors"
            >
              <Eye className="h-4 w-4" />
              Preview
            </button>
          </div>
        </div>

        {/* Title Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">
            Title <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            {...register("title")}
            className={`w-full px-4 py-3 rounded-xl text-sm bg-background border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
              ${errors.title ? "border-destructive focus:border-destructive" : "border-input hover:border-primary/50 focus:border-primary"}`}
            placeholder="My Awesome Blog Post"
          />
          {errors.title && (
            <p className="text-sm font-medium text-destructive">{errors.title.message}</p>
          )}
        </div>

        {/* Slug Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">
            Slug <span className="text-destructive">*</span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              {...register("slug")}
              className={`flex-1 px-4 py-3 rounded-xl text-sm bg-background border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
                ${errors.slug ? "border-destructive focus:border-destructive" : "border-input hover:border-primary/50 focus:border-primary"}`}
              placeholder="my-awesome-post"
            />
            <button
              type="button"
              onClick={handleGenerateSlug}
              className="px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 shrink-0 bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 active:scale-95 transition-all duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                <path d="M5 3v4M19 17v4M3 5h4M17 19h4" />
              </svg>
              Auto
            </button>
          </div>
          {errors.slug && (
            <p className="text-sm font-medium text-destructive">{errors.slug.message}</p>
          )}
        </div>

        {/* Featured Toggle */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">
            Visibility
          </label>
          <FeaturedToggle
            value={isFeatured}
            onChange={(val) => setValue("isFeatured", val, { shouldValidate: true })}
          />
        </div>

        {/* Cover Image - 1600 x 900 px */}
        <ImageUploadField
          label="Cover Image"
          icon={ImageIcon}
          preview={coverPreview}
          url={coverImageUrl}
          isUploading={isCoverUploading}
          fieldName="coverImage"
          error={errors.coverImage}
          description="The main banner displayed at the top of your blog post. Use a high-quality image that represents your content."
          dimensions="1600 × 900 px"
          onFileSelect={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file, setCoverPreview, setCoverImageUrl, setIsCoverUploading, "coverImage", "Cover image");
          }}
          onRemove={() => removeImage(coverPreview, setCoverPreview, setCoverImageUrl, "coverImage")}
        />

        {/* OG Image - 1200 x 630 px */}
        <ImageUploadField
          label="OG Image"
          icon={Globe}
          preview={ogPreview}
          url={ogImageUrl}
          isUploading={isOgUploading}
          fieldName="ogImage"
          error={errors.ogImage}
          description="Social media preview image used when sharing on Facebook, Twitter, LinkedIn, and other platforms."
          dimensions="1200 × 630 px"
          onFileSelect={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file, setOgPreview, setOgImageUrl, setIsOgUploading, "ogImage", "OG image");
          }}
          onRemove={() => removeImage(ogPreview, setOgPreview, setOgImageUrl, "ogImage")}
        />

        {/* Blog Content Editor */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <FileText className="h-4 w-4 text-muted-foreground" />
            Blog Content <span className="text-destructive">*</span>
          </label>
          <BlogEditor 
            value={{ blocks: [] }} 
            onChange={handleEditorChange} 
          />
          {(errors.content || (!hasContent && contentValidated)) && (
            <p className="text-sm font-medium text-destructive">
              {errors.content?.message || "Blog content is required"}
            </p>
          )}
          {!hasContent && (
            <p className="text-xs text-muted-foreground">
              Start writing content in the editor above
            </p>
          )}
        </div>

        {/* MANUAL TABLE OF CONTENTS */}
        <TableOfContentsManager
          items={tableOfContents}
          onAdd={handleAddTOC}
          onRemove={handleRemoveTOC}
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={!isFormReady}
          className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin h-4 w-4" />
              Creating...
            </span>
          ) : (
            "Create Blog"
          )}
        </button>
      </form>
    </>
  );
};