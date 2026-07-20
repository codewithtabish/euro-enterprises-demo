"use server";

import prisma from "@/lib/prisma-client";
import { currentUser } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";


// ============================================
// SERVER ACTION: Sync User
// ============================================
export async function syncUserAction() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress;

    if (!email) {
      return {
        success: false,
        error: "Email not found.",
      };
    }

    const phone = clerkUser.phoneNumbers[0]?.phoneNumber || null;

    const user = await prisma.user.upsert({
      where: {
        clerkId: clerkUser.id,
      },
      update: {
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        fullName:
          `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ||
          null,
        email,
        phone,
        avatar: clerkUser.imageUrl,
        lastLoginAt: new Date(),
      },
      create: {
        clerkId: clerkUser.id,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        fullName:
          `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ||
          null,
        email,
        phone,
        avatar: clerkUser.imageUrl,
        lastLoginAt: new Date(),
      },
    });

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error("❌ Sync user error:", error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to sync user.",
    };
  }
}






export async function updateLastSeen() {
  const { userId } = await auth();

  if (!userId) return;

  await prisma.user.update({
    where: {
      clerkId: userId,
    },
    data: {
      lastSeenAt: new Date(),
    },
  });
}