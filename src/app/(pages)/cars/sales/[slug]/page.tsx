import { getSaleCarBySlugAction } from "@/app/actions/get_sales_car";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  SaleCarDetailData,
  SalesCarDetail,
} from "@/components/general/sales/sales-car-detail";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getSaleCarBySlugAction(slug);

  if (!result.success || !result.data) {
    return { title: "Car Not Found" };
  }

  const car = result.data;
  const seo = car.seo;

  return {
    title: seo?.metaTitle || `${car.year} ${car.brand} ${car.model} for Sale`,
    description:
      seo?.metaDescription ||
      `Buy ${car.year} ${car.brand} ${car.model}. Price: ${car.currency} ${car.price.toLocaleString()}.`,
    openGraph: {
      title:
        seo?.ogTitle ||
        seo?.metaTitle ||
        `${car.year} ${car.brand} ${car.model}`,
      description: seo?.ogDescription || seo?.metaDescription,
      images: seo?.ogImage ? [seo.ogImage] : [car.coverImage],
    },
  };
}

export default async function SalesCarSinglePage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getSaleCarBySlugAction(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  // Map Prisma result to client-safe type
  const car: SaleCarDetailData = {
    ...result.data,
    fuelType: result.data.fuelType ?? null,
    transmission: result.data.transmission ?? null,
    mileage: result.data.mileage ?? null,
    color: result.data.color ?? null,
    engine: result.data.engine ?? null,
    registration: result.data.registration ?? null,
    seo: result.data.seo,
    images: result.data.images || [],
  };

  return <SalesCarDetail car={car} />;
}
