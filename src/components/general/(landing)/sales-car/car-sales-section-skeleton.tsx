import { Skeleton } from "@/components/ui/skeleton";

const CarSalesSectionSkeleton = () => {
  return (
    <section className="py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-14">
          <Skeleton className="h-5 w-44 rounded-full" />
          <Skeleton className="h-12 w-[420px] max-w-full rounded-xl" />
          <Skeleton className="h-5 w-[560px] max-w-full rounded-lg" />
        </div>

        {/* Mobile */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-[280px] rounded-2xl"
            />
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex h-[80vh] items-center justify-center">
          <div className="flex h-[70%] w-[min(1050px,92%)] gap-2.5">

            {/* Small */}
            <Skeleton className="w-16 rounded-2xl" />

            {/* Small */}
            <Skeleton className="w-16 rounded-2xl" />

            {/* Expanded */}
            <Skeleton className="flex-1 rounded-2xl" />

            {/* Small */}
            <Skeleton className="w-16 rounded-2xl" />

            {/* Small */}
            <Skeleton className="w-16 rounded-2xl" />

            {/* Small */}
            <Skeleton className="w-16 rounded-2xl" />

            {/* Small */}
            <Skeleton className="w-16 rounded-2xl" />

          </div>
        </div>

      </div>
    </section>
  );
};

export default CarSalesSectionSkeleton;