import { FuelType, Transmission } from "@/generated/prisma/enums";
import { z } from "zod";

export const imageSchema = z.object({
  url: z.string().url("Invalid image URL"),
  alt: z.string().max(200).optional().default(""),
});

export const carSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(120),
  slug: z.string().min(3).max(120).optional().or(z.literal("")),
  coverImage: z
    .string()
    .url("Invalid cover image URL")
    .min(1, "Cover image is required"),
  brand: z.string().min(1, "Brand is required").max(50),
  model: z.string().min(1, "Model is required").max(50),
  year: z.coerce
    .number()
    .min(1900, "Year must be 1900 or later")
    .max(new Date().getFullYear() + 1, "Year cannot be in the future"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  currency: z.string().default("PKR"),
  mileage: z.coerce.number().min(0).optional().nullable(),
  fuelType: z.nativeEnum(FuelType).optional().nullable(),
  transmission: z.nativeEnum(Transmission).optional().nullable(),
  engine: z.string().max(50).optional().nullable(),
  color: z.string().max(30).optional().nullable(),
  registration: z.string().max(50).optional().nullable(),
  description: z
    .object({
      blocks: z.array(z.any()).min(1, "Description cannot be empty"),
    })
    .refine((data) => data.blocks.length > 0, {
      message: "Description is required",
    }),
  images: z
    .array(imageSchema)
    .min(1, "At least 1 image is required")
    .max(10, "Max 10 images allowed"),
  isAvailable: z.boolean().default(true),
  ogImage: z
    .string()
    .url("Invalid OG image URL")
    .min(1, "OG image is required"),
});

export type CarFormData = z.infer<typeof carSchema>;
export type ImageData = z.infer<typeof imageSchema>;
