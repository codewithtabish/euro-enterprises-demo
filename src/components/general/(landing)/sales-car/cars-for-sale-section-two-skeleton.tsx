import { Skeleton } from "@/components/ui/skeleton";

const CarsForSaleSectionTwoSkeleton = () => {
  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 space-y-4">
          <Skeleton className="h-8 w-40 rounded-full" />
          <Skeleton className="h-12 w-80 rounded-xl" />
          <Skeleton className="h-5 w-[550px] max-w-full rounded-lg" />
        </div>

        {/* Mobile */}
        <div className="grid gap-5 md:hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-72 w-full rounded-2xl"
            />
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden md:flex justify-center gap-4">

          {/* Small */}
          <Skeleton className="h-[420px] w-40 rounded-2xl" />

          {/* Small */}
          <Skeleton className="h-[420px] w-40 rounded-2xl" />

          {/* Expanded */}
          <Skeleton className="h-[420px] flex-1 rounded-2xl" />

          {/* Small */}
          <Skeleton className="h-[420px] w-40 rounded-2xl" />

          {/* Small */}
          <Skeleton className="h-[420px] w-40 rounded-2xl" />

          {/* Small */}
          <Skeleton className="h-[420px] w-40 rounded-2xl" />

        </div>

        {/* Button */}
        <div className="flex justify-center mt-12">
          <Skeleton className="h-12 w-60 rounded-xl" />
        </div>

      </div>
    </section>
  );
};

export default CarsForSaleSectionTwoSkeleton;