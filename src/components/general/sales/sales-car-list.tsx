import { getAllSaleCarsAction } from "@/app/actions/get_sales_car";
import Image from "next/image";
import Link from "next/link";
import {
  Fuel,
  Gauge,
  Settings,
  Calendar,
  Eye,
  Heart,
  ArrowRight,
} from "lucide-react";

export default async function SalesCarList() {
  const result = await getAllSaleCarsAction();

  // Error state
  if (!result.success) {
    return (
      <section className="py-20">
        <div className="mx-auto w-[min(1200px,92%)]">
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-red-200 bg-red-50/50">
            <div className="rounded-full bg-red-100 p-4">
              <Settings className="h-8 w-8 text-red-500" />
            </div>
            <p className="mt-4 text-lg font-semibold text-red-600">
              Failed to load cars
            </p>
            <p className="mt-1 text-sm text-red-400">{result.error}</p>
          </div>
        </div>
      </section>
    );
  }

  const cars = result.data;

  // Empty state
  if (cars.length === 0) {
    return (
      <section className="py-20">
        <div className="mx-auto w-[min(1200px,92%)]">
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-neutral-50">
            <Calendar className="h-12 w-12 text-neutral-300" />
            <p className="mt-4 text-lg font-medium text-neutral-500">
              No cars available
            </p>
            <p className="text-sm text-neutral-400">
              Check back later for new listings
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto w-[min(1400px,92%)]">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            {result.count} Vehicles Available
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900 lg:text-5xl">
            Premium Cars for Sale
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-500">
            Handpicked selection of quality vehicles. Each car inspected and
            verified.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cars.map((car, index) => (
            <Link
              key={car.id}
              href={`/cars-for-sale/${car.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20"
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
                <Image
                  src={car.coverImage}
                  alt={`${car.brand} ${car.model} ${car.year}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 4}
                />

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Sold Badge */}
                {!car.isAvailable && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <span className="rounded-full bg-red-500 px-5 py-2 text-sm font-bold text-white shadow-lg">
                      SOLD
                    </span>
                  </div>
                )}

                {/* Top badges */}
                <div className="absolute left-3 top-3 flex gap-2">
                  <span className="rounded-lg bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                    {car.year}
                  </span>
                  {car.views > 100 && (
                    <span className="flex items-center gap-1 rounded-lg bg-amber-500/90 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                      <Eye className="h-3 w-3" />
                      Hot
                    </span>
                  )}
                </div>

                {/* Price tag - bottom right */}
                <div className="absolute bottom-3 right-3">
                  <span className="rounded-xl bg-white/95 px-4 py-2 text-sm font-bold text-neutral-900 shadow-lg backdrop-blur-md">
                    {car.currency} {car.price.toLocaleString()}
                  </span>
                </div>

                {/* View button on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-xl transition-transform duration-300 group-hover:scale-100 scale-90">
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                {/* Brand & Title */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary/80">
                      {car.brand}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-neutral-900 leading-tight truncate">
                      {car.title}
                    </h3>
                  </div>
                </div>

                {/* Model & Year */}
                <p className="mt-1 text-sm text-neutral-500">
                  {car.model} · {car.year}
                </p>

                {/* Specs row */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {car.fuelType && (
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-700">
                      <Fuel className="h-3 w-3 text-neutral-400" />
                      {car.fuelType}
                    </span>
                  )}
                  {car.transmission && (
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-700">
                      <Settings className="h-3 w-3 text-neutral-400" />
                      {car.transmission}
                    </span>
                  )}
                  {car.mileage !== null && car.mileage !== undefined && (
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-700">
                      <Gauge className="h-3 w-3 text-neutral-400" />
                      {car.mileage.toLocaleString()} km
                    </span>
                  )}
                  {car.color && (
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-700">
                      <span
                        className="h-3 w-3 rounded-full border border-neutral-300"
                        style={{ backgroundColor: car.color.toLowerCase() }}
                      />
                      {car.color}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <Eye className="h-3.5 w-3.5" />
                    {car.views.toLocaleString()} views
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <Heart className="h-3.5 w-3.5" />
                    {/* {car._count?.bookmarks || 0} saves */}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load more / View all button */}
        {result.count > 8 && (
          <div className="mt-12 text-center">
            <button className="inline-flex items-center gap-2 rounded-full border-2 border-neutral-200 bg-white px-8 py-3.5 text-sm font-semibold text-neutral-700 transition-all hover:border-primary hover:bg-primary hover:text-white">
              View All {result.count} Cars
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
