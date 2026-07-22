import { getAllSaleCarsAction } from "@/app/actions/get_sales_car";
import {
  type CarData,
  type SaleCarsResult,
  type SaleCarSEO,
  type CarImage,
} from "@/components/general/sales/sales-car-list";
import { SalesCarListLazy } from "@/components/general/sales/sales-car-list-lazy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cars for Sale",
  description: "Premium vehicles for sale.",
};

// ─────────────────────────────────────────
// Raw types from Prisma (what server action returns)
// ─────────────────────────────────────────

type FuelType = "PETROL" | "DIESEL" | "HYBRID" | "ELECTRIC";
type Transmission = "AUTOMATIC" | "MANUAL";

interface RawCarImage {
  id: string;
  createdAt: Date;
  url: string;
  alt: string | null;
  carId: string;
}

interface RawSaleCarSEO {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string | null;
  noIndex: boolean;
  noFollow: boolean;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImage: string | null;
  schemaType: string;
}

interface RawSaleCar {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  mileage: number | null;
  fuelType: FuelType | null;
  transmission: Transmission | null;
  engine: string | null;
  color: string | null;
  registration: string | null;
  description: unknown;
  images: RawCarImage[];
  seo: RawSaleCarSEO | null;
  isAvailable: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

interface RawSuccessResult {
  success: true;
  data: RawSaleCar[];
  count: number;
}

interface RawErrorResult {
  success: false;
  error: string;
}

type RawResult = RawSuccessResult | RawErrorResult;

// ─────────────────────────────────────────
// Helper: Map raw Prisma data to client-safe CarData
// ─────────────────────────────────────────

function mapSEO(raw: RawSaleCarSEO | null): SaleCarSEO | undefined {
  if (!raw) return undefined;
  return {
    metaTitle: raw.metaTitle,
    metaDescription: raw.metaDescription,
    canonicalUrl: raw.canonicalUrl,
    noIndex: raw.noIndex,
    noFollow: raw.noFollow,
    ogTitle: raw.ogTitle,
    ogDescription: raw.ogDescription,
    ogImage: raw.ogImage,
    twitterTitle: raw.twitterTitle,
    twitterDescription: raw.twitterDescription,
    twitterImage: raw.twitterImage,
    schemaType: raw.schemaType,
  };
}

function mapImages(raw: RawCarImage[]): CarImage[] {
  return raw.map((img) => ({
    id: img.id,
    createdAt: img.createdAt,
    url: img.url,
    alt: img.alt,
    carId: img.carId,
  }));
}

function mapCar(raw: RawSaleCar): CarData {
  return {
    id: raw.id,
    slug: raw.slug,
    coverImage: raw.coverImage,
    brand: raw.brand,
    model: raw.model,
    year: raw.year,
    title: raw.title,
    price: raw.price,
    currency: raw.currency,
    isAvailable: raw.isAvailable,
    // Convert null → undefined for optional fields
    fuelType: raw.fuelType ?? undefined,
    transmission: raw.transmission ?? undefined,
    mileage: raw.mileage ?? undefined,
    color: raw.color ?? undefined,
    engine: raw.engine ?? undefined,
    registration: raw.registration ?? undefined,
    description: raw.description,
    images: mapImages(raw.images),
    seo: mapSEO(raw.seo),
    views: raw.views,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

// ─────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────

export default async function CarSalesPage() {
  const rawResult = (await getAllSaleCarsAction()) as RawResult;

  const result: SaleCarsResult = rawResult.success
    ? {
        success: true,
        count: rawResult.count,
        data: rawResult.data.map(mapCar),
      }
    : {
        success: false,
        error: rawResult.error,
      };

  return (
    <main className="min-h-screen bg-background">
      {/* Props pass through SalesCarListLazy → SalesCarList automatically */}
      <SalesCarListLazy result={result} />
      {/* <SalesCarList result={result} /> */}
    </main>
  );
}
