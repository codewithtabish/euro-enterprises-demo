import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma-client";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
  console.log(WEBHOOK_SECRET)

  if (!WEBHOOK_SECRET) {
    throw new Error("Missing CLERK_WEBHOOK_SIGNING_SECRET");
  }

  // Get the headers
  const headerPayload = await headers();

  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing Svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.text();

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);

    return new Response("Invalid webhook", {
      status: 400,
    });
  }

  const eventType = evt.type;

  try {
    switch (eventType) {
      case "user.created":
      case "user.updated": {
        const data = evt.data;

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

        await prisma.user.upsert({
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

        break;
      }

      case "user.deleted": {
        const data = evt.data;

        if (data.id) {
          await prisma.user.deleteMany({
            where: {
              clerkId: data.id,
            },
          });
        }

        break;
      }

      default:
        break;
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("❌ Clerk Webhook Error:", error);

    return new Response("Webhook Error", {
      status: 500,
    });
  }
}