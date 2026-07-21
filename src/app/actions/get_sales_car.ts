"use server";

import prisma from "@/lib/prisma-client";
import { unstable_cache, revalidateTag } from "next/cache";

// ============================================
// CACHE TAGS
// ============================================
const SALE_CAR_CACHE_TAG = "sale-cars";
const SALE_CAR_SLUG_CACHE_TAG = "sale-car-slug";

// Helper to generate a unique tag per slug (NOT exported — internal use only)
const getSaleCarSlugTag = (slug: string) => `sale-car-${slug}`;

// ============================================
// GET ALL SALE CARS (cached)
// ============================================
const getAllSaleCarsCached = unstable_cache(
  async () => {
    console.log("🏃 [CACHE MISS] Fetching all sale cars from DB");

    const cars = await prisma.saleCar.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        images: true,
      },
    });

    return cars;
  },
  ["all-sale-cars"],
  {
    revalidate: false,
    tags: [SALE_CAR_CACHE_TAG],
  },
);

export async function getAllSaleCarsAction() {
  try {
    const cars = await getAllSaleCarsCached();
    console.log("✅ All sale cars returned:", cars.length);

    return {
      success: true,
      data: cars,
      count: cars.length,
    };
  } catch (error) {
    console.error("❌ Get all sale cars error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to get all sale cars",
      data: [],
      count: 0,
    };
  }
}

// ============================================
// GET SINGLE SALE CAR BY SLUG (cached)
// ============================================
export async function getSaleCarBySlugAction(slug: string) {
  try {
    const getCachedCar = unstable_cache(
      async () => {
        console.log("🏃 [CACHE MISS] Fetching sale car by slug:", slug);

        const car = await prisma.saleCar.findUnique({
          where: { slug },
          include: {
            images: true,
            seo: true,
            reviews: {
              where: { approved: true },
              include: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                    avatar: true,
                  },
                },
              },
              orderBy: { createdAt: "desc" },
            },
            _count: {
              select: {
                inquiries: true,
                bookmarks: true,
                reviews: true,
              },
            },
          },
        });

        return car;
      },
      [`sale-car-${slug}`],
      {
        revalidate: false,
        tags: [SALE_CAR_SLUG_CACHE_TAG, getSaleCarSlugTag(slug)],
      },
    );

    const car = await getCachedCar();

    if (!car) {
      return {
        success: false,
        error: "Sale car not found",
        data: null,
      };
    }

    return {
      success: true,
      data: car,
    };
  } catch (error) {
    console.error("❌ Get sale car by slug error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get sale car",
      data: null,
    };
  }
}

// ============================================
// REVALIDATION HELPERS
// ============================================

/**
 * Revalidate all sale cars list cache
 */
export async function revalidateAllSaleCars() {
  revalidateTag(SALE_CAR_CACHE_TAG, "default");
  console.log("🔄 Revalidated all sale cars cache");
}

/**
 * Revalidate a specific sale car by slug
 */
export async function revalidateSaleCarBySlug(slug: string) {
  revalidateTag(getSaleCarSlugTag(slug), "default");
  console.log("🔄 Revalidated sale car cache for slug:", slug);
}

/**
 * Revalidate all sale car caches (both list and all individual cars)
 */
export async function revalidateAllSaleCarCaches() {
  revalidateTag(SALE_CAR_CACHE_TAG, "default");
  revalidateTag(SALE_CAR_SLUG_CACHE_TAG, "default");
  console.log("🔄 Revalidated all sale car caches");
}
