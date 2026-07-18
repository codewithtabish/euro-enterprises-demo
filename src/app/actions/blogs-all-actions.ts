"use server";

import prisma from "@/lib/prisma-client";
import { unstable_cache } from "next/cache";

// ============================================
// TYPES
// ============================================
type BlogListItem = {
  id: string;
  title: string;
  slug: string;
  bannerImage: string;
  bannerImageAlt: string | null;
  featured: boolean;
  status: string;
  publishedAt: Date | null;
  createdAt: Date;
  tableOfContents: any;
};

// ============================================
// CACHE TAGS
// ============================================
const BLOG_CACHE_TAG = "blogs";
const FEATURED_CACHE_TAG = "featured-blogs";

// ============================================
// GET FEATURED BLOGS (cached)
// ============================================
const getFeaturedBlogsCached = unstable_cache(
  async (): Promise<BlogListItem[]> => {
    console.log("🏃 [CACHE MISS] Fetching featured blogs from DB");

    const blogs = await prisma.blog.findMany({
      where: {
        featured: true,
        status: "PUBLISHED",
      },
      orderBy: {
        publishedAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        bannerImage: true,
        bannerImageAlt: true,
        featured: true,
        status: true,
        publishedAt: true,
        createdAt: true,
        tableOfContents: true,
        shortDescription:true
          
        
      },
      
    });

    return blogs;
  },
 ["featured-blogs"],
   {
    revalidate: false,
    tags: [FEATURED_CACHE_TAG],
  }
);

export async function getFeaturedBlogsAction() {
  try {
    const blogs = await getFeaturedBlogsCached();
    console.log("✅ Featured blogs returned:", blogs.length);

    return {
      success: true,
      data: blogs,
      count: blogs.length,
    };
  } catch (error) {
    console.error("❌ Get featured blogs error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get featured blogs",
      data: [],
      count: 0,
    };
  }
}

// ============================================
// GET ALL BLOGS (cached)
// ============================================
const getAllBlogsCached = unstable_cache(
  async (): Promise<BlogListItem[]> => {
    console.log("🏃 [CACHE MISS] Fetching all blogs from DB");

    const blogs = await prisma.blog.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: {
        publishedAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        bannerImage: true,
        bannerImageAlt: true,
        featured: true,
        
        status: true,
        publishedAt: true,
        createdAt: true,
        tableOfContents: true,
        shortDescription:true,
      },
    });

    return blogs;
  },
  ["all-blogs"],
  {
    revalidate: false,
    tags: [BLOG_CACHE_TAG],
  }
);

export async function getAllBlogsAction() {
  try {
    const blogs = await getAllBlogsCached();
    console.log("✅ All blogs returned:", blogs.length);

    return {
      success: true,
      data: blogs,
      count: blogs.length,
    };
  } catch (error) {
    console.error("❌ Get all blogs error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get all blogs",
      data: [],
      count: 0,
    };
  }
}

// ============================================
// GET SINGLE BLOG BY SLUG (cached)
// ============================================
const getBlogBySlugCached = unstable_cache(
  async (slug: string) => {
    console.log("🏃 [CACHE MISS] Fetching blog by slug:", slug);

    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: {
        seo: true,
      },
    });

    return blog;
  },
  ["blog-by-slug"],
  {
    revalidate: false,
    tags: [BLOG_CACHE_TAG],
  }
);

export async function getBlogBySlugAction(slug: string) {
  try {
    const blog = await getBlogBySlugCached(slug);

    if (!blog) {
      return {
        success: false,
        error: "Blog not found",
        data: null,
      };
    }

    return {
      success: true,
      data: blog,
    };
  } catch (error) {
    console.error("❌ Get blog by slug error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get blog",
      data: null,
    };
  }
}

// ============================================
// REVALIDATE CACHE (call after create/update/delete)
// ============================================
export async function revalidateBlogCache() {
  try {
    const { revalidateTag } = await import("next/cache");

    // Next.js 15+ requires second argument: cache profile
    // Using "default" profile - works with standard cache
    revalidateTag(BLOG_CACHE_TAG, "default");
    revalidateTag(FEATURED_CACHE_TAG, "default");

    console.log("🔄 Blog cache revalidated");

    return { success: true, message: "Cache revalidated" };
  } catch (error) {
    console.error("❌ Revalidate cache error:", error);
    return { success: false, error: "Failed to revalidate cache" };
  }
}