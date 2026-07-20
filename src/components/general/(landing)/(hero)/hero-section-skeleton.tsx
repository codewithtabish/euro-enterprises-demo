import { Skeleton } from "@/components/ui/skeleton";

const HeroSectionSkeleton = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-20 md:pb-28">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 -z-10" />

      <div className="container mx-auto px-6">
        {/* ========================= */}
        {/* Mobile & Tablet Skeleton */}
        {/* ========================= */}
        <div className="block lg:hidden">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">

            {/* Heading */}
            <div className="space-y-4">
              <Skeleton className="mx-auto h-10 w-72 rounded-xl" />
              <Skeleton className="mx-auto h-10 w-80 rounded-xl" />
              <Skeleton className="mx-auto h-10 w-56 rounded-xl" />
            </div>

            {/* Description */}
            <div className="mt-8 space-y-3">
              <Skeleton className="mx-auto h-5 w-80 max-w-full rounded-lg" />
              <Skeleton className="mx-auto h-5 w-64 rounded-lg" />
            </div>

            {/* Button */}
            <Skeleton className="mt-10 h-14 w-56 rounded-2xl" />

            {/* Trust */}
            <div className="mt-12 flex flex-col items-center gap-5">
              <div className="flex -space-x-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-12 w-12 rounded-full border-2 border-background"
                  />
                ))}
              </div>

              <Skeleton className="h-4 w-36 rounded-lg" />
              <Skeleton className="h-4 w-56 rounded-lg" />
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* Desktop Skeleton */}
        {/* ========================= */}
        <div className="hidden lg:block">
          <Skeleton className="relative h-[80vh] w-full rounded-3xl" />

          {/* Overlay Content */}
          <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-10">

            {/* Bottom Left */}
            <div className="space-y-3">
              <Skeleton className="h-3 w-32 rounded-lg bg-white/20" />
              <Skeleton className="h-9 w-64 rounded-lg bg-white/20" />
            </div>

            {/* Bottom Right Buttons */}
            <div className="flex gap-3">
              <Skeleton className="h-10 w-10 rounded-full bg-white/20" />
              <Skeleton className="h-10 w-10 rounded-full bg-white/20" />
            </div>

            {/* Top Left Dots */}
            <div className="absolute left-10 top-10 flex gap-2">
              <Skeleton className="h-1 w-8 rounded-full bg-white/20" />
              <Skeleton className="h-1 w-3 rounded-full bg-white/20" />
              <Skeleton className="h-1 w-3 rounded-full bg-white/20" />
              <Skeleton className="h-1 w-3 rounded-full bg-white/20" />
              <Skeleton className="h-1 w-3 rounded-full bg-white/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionSkeleton;