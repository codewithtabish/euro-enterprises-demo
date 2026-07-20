// src/app/api/webhooks/clerk/route.ts

import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma-client";

export async function POST(req: Request) {
  console.log("========================================");
  console.log("🔔 WEBHOOK POST HIT at:", new Date().toISOString());
  
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("❌ MISSING CLERK_WEBHOOK_SIGNING_SECRET");
    return new Response("Missing CLERK_WEBHOOK_SIGNING_SECRET", { status: 500 });
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  console.log("📨 Svix headers:", { svixId, svixTimestamp, svixSignature: svixSignature?.slice(0, 20) + "..." });

  if (!svixId || !svixTimestamp || !svixSignature) {
    console.log("❌ Missing Svix headers");
    return new Response("Missing Svix headers", { status: 400 });
  }

  const payload = await req.text();
  console.log("📦 Payload length:", payload.length);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
    console.log("✅ Webhook verified, event type:", evt.type);
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return new Response("Invalid webhook", { status: 400 });
  }

  const eventType = evt.type;
  console.log("🎯 Handling event:", eventType);

  try {
    switch (eventType) {
      case "user.created":
      case "user.updated": {
        const data = evt.data;
        console.log("👤 User data:", JSON.stringify(data, null, 2));

        const email =
          data.email_addresses?.find(
            (email) => email.id === data.primary_email_address_id
          )?.email_address ??
          data.email_addresses?.[0]?.email_address ??
          "";

        const phone =
          data.phone_numbers?.find(
            (phone) => phone.id === data.primary_phone_number_id
          )?.phone_number ??
          data.phone_numbers?.[0]?.phone_number ??
          null;

        console.log("📧 Email:", email);
        console.log("📱 Phone:", phone);

        const result = await prisma.user.upsert({
          where: {
            clerkId: data.id,
          },
          update: {
            firstName: data.first_name,
            lastName: data.last_name,
            fullName:
              `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim() ||
              null,
            email,
            phone,
            avatar: data.image_url,
            lastLoginAt: new Date(),
          },
          create: {
            clerkId: data.id,
            firstName: data.first_name,
            lastName: data.last_name,
            fullName:
              `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim() ||
              null,
            email,
            phone,
            avatar: data.image_url,
            role: "USER",
            lastLoginAt: new Date(),
          },
        });

        console.log("✅ Prisma upsert result:", result);
        break;
      }

      case "user.deleted": {
        const data = evt.data;
        console.log("🗑️ Deleting user:", data.id);

        if (data.id) {
          const result = await prisma.user.deleteMany({
            where: {
              clerkId: data.id,
            },
          });
          console.log("✅ Deleted count:", result.count);
        }
        break;
      }

      default:
        console.log("⚠️ Unhandled event type:", eventType);
        break;
    }

    console.log("✅ Webhook processed successfully");
    return Response.json({ success: true });
  } catch (error) {
    console.error("❌❌❌ CLERK WEBHOOK ERROR:", error);
    console.error("Error stack:", (error as Error).stack);
    return new Response("Webhook Error: " + (error as Error).message, {
      status: 500,
    });
  }
}