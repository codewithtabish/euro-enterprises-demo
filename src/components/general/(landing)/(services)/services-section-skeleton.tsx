import { Skeleton } from "@/components/ui/skeleton";

const ServicesSectionSkeleton = () => {
  return (
    <section className="py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Skeleton className="h-5 w-40 rounded-full" />
          <Skeleton className="h-12 w-96 max-w-full rounded-xl" />
          <Skeleton className="h-5 w-[520px] max-w-full rounded-lg" />
        </div>

        {/* Mobile */}
        <div className="grid grid-cols-1 gap-6 lg:hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border p-8 space-y-6"
            >
              <Skeleton className="h-12 w-12 rounded-xl" />
              <Skeleton className="h-8 w-52 rounded-lg" />
              <Skeleton className="h-5 w-64 rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-11/12 rounded-lg" />
              <Skeleton className="h-4 w-3/4 rounded-lg" />
            </div>
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12">

          {/* Left */}
          <div className="lg:col-span-5 space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border-b pb-6 space-y-3">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-7 w-52 rounded-lg" />
                    <Skeleton className="h-4 w-40 rounded-lg" />
                  </div>
                </div>

                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-5/6 rounded-lg" />
              </div>
            ))}
          </div>

          {/* Right Image */}
          <div className="lg:col-span-7">
            <Skeleton className="aspect-[16/10] w-full rounded-3xl" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSectionSkeleton;