"use server";

import prisma from "@/lib/prisma-client";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// ============================================
// TYPES
// ============================================
type CreateBlogInput = {
  title: string;
  slug: string;
  content: any;
  ogImage: string;
  bannerImage: string;
  featured: boolean;
  tableOfContents?: { id: string; title: string; slug: string }[];
};

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
        return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      }
      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}

// ============================================
// OPENAI: GENERATE SEO & METADATA
// ============================================
async function generateSEOWithAI(title: string, contentText: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert SEO specialist and content marketer. Based on the blog title and content provided, generate professional SEO metadata.

STRICT RULES:
- DO NOT change or modify the title
- DO NOT change or modify the slug
- Generate compelling, click-worthy SEO metadata
- Keep meta descriptions under 160 characters
- Keep meta titles under 60 characters
- Make Open Graph descriptions engaging for social sharing
- Return ONLY a valid JSON object

Return this exact JSON structure:
{
  "metaTitle": "SEO-optimized title under 60 chars (can be same as input title if already good)",
  "metaDescription": "Compelling meta description under 160 chars",
  "ogDescription": "Engaging social media description",
  "twitterDescription": "Twitter-optimized description",
  "keywords": ["relevant", "seo", "keywords", "max", "10"],
  "summary": "2-3 sentence summary of the blog"
}`,
        },
        {
          role: "user",
          content: `Blog Title: ${title}\n\nBlog Content:\n${contentText.slice(0, 3000)}`,
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
        metaDescription: parsed.metaDescription || `Read about ${title}. Discover detailed insights and information.`,
        ogDescription: parsed.ogDescription || `Learn more about ${title}`,
        twitterDescription: parsed.twitterDescription || parsed.ogDescription || `Learn about ${title}`,
        keywords: parsed.keywords || [],
        summary: parsed.summary || "",
      };
    }

    throw new Error("Invalid AI response format");
  } catch (error) {
    console.error("OpenAI SEO generation error:", error);
    return {
      metaTitle: title,
      metaDescription: `Read about ${title}. Discover detailed insights, tips, and comprehensive information in this in-depth guide.`,
      ogDescription: `Explore ${title} - a comprehensive guide with expert insights and practical information.`,
      twitterDescription: `Learn about ${title} - expert insights and comprehensive guide.`,
      keywords: [title.toLowerCase().replace(/\s+/g, "-")],
      summary: `A comprehensive guide about ${title}.`,
    };
  }
}

// ============================================
// SERVER ACTION: Create Blog
// ============================================
export async function createBlogAction(data: CreateBlogInput) {
  try {
    console.log("📥 Creating blog:", data.title, "| TOC items:", data.tableOfContents?.length || 0);

    // Step 1: Check for duplicate slug
    const existingBlog = await prisma.blog.findUnique({
      where: { slug: data.slug },
    });

    if (existingBlog) {
      return {
        success: false,
        error: "A blog with this slug already exists",
      };
    }

    // Step 2: Use TOC from client (manual entries)
    const tableOfContents = data.tableOfContents || [];

    // Step 3: Extract text for AI
    const contentText = extractTextFromContent(data.content);

    // Step 4: Generate SEO metadata with OpenAI
    const seoData = await generateSEOWithAI(data.title, contentText);

    // Step 5: Build canonical URL
    const canonicalUrl = `${BASE_URL}/blogs/${data.slug}`;

    // Step 6: Create Blog + SEO in database
    const blog = await prisma.blog.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        bannerImage: data.bannerImage,
        bannerImageAlt: data.title,
        featured: data.featured,
        status: "PUBLISHED",
        publishedAt: new Date(),
        tableOfContents: tableOfContents,

        seo: {
          create: {
            metaTitle: seoData.metaTitle,
            metaDescription: seoData.metaDescription,
            canonicalUrl: canonicalUrl,
            noIndex: false,
            noFollow: false,
            ogTitle: data.title,
            ogDescription: seoData.ogDescription,
            ogImage: data.ogImage,
            twitterTitle: data.title,
            twitterDescription: seoData.twitterDescription,
            twitterImage: data.ogImage,
            schemaType: "Article",
          },
        },
      },
      include: {
        seo: true,
      },
    });

    console.log("✅ Blog created:", blog.id, "| TOC saved:", (blog.tableOfContents as any[])?.length || 0);

    return {
      success: true,
      data: {
        blog: {
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          featured: blog.featured,
          status: blog.status,
          publishedAt: blog.publishedAt,
          createdAt: blog.createdAt,
        },
        seo: {
          metaTitle: blog.seo?.metaTitle,
          metaDescription: blog.seo?.metaDescription,
          canonicalUrl: blog.seo?.canonicalUrl,
          ogDescription: blog.seo?.ogDescription,
          twitterDescription: blog.seo?.twitterDescription,
        },
        tableOfContents: tableOfContents,
        aiGenerated: {
          keywords: seoData.keywords,
          summary: seoData.summary,
        },
      },
    };
  } catch (error) {
    console.error("❌ Create blog error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create blog",
    };
  }
}