import { Skeleton } from "@/components/ui/skeleton";

export default function CarInspectionSkeleton() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center space-y-4 mb-14">
          <Skeleton className="h-6 w-40 rounded-full" />
          <Skeleton className="h-12 w-96 max-w-full rounded-xl" />
          <Skeleton className="h-5 w-[600px] max-w-full rounded-xl" />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[22rem] gap-6">

          <Skeleton className="rounded-3xl lg:row-span-2 h-[22rem] lg:h-full" />

          <Skeleton className="rounded-3xl lg:row-span-3 h-[22rem] lg:h-full" />

          <Skeleton className="rounded-3xl h-[22rem]" />

          <Skeleton className="rounded-3xl h-[22rem]" />

          <Skeleton className="rounded-3xl lg:row-span-2 h-[22rem] lg:h-full" />

        </div>
      </div>
    </section>
  );
}