import { Skeleton } from "@/components/ui/skeleton";

export default function TestimonialsSectionSkeleton() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center">
          <Skeleton className="h-4 w-40 rounded-full mb-4" />
          <Skeleton className="h-12 w-[320px] rounded-xl mb-5" />
          <Skeleton className="h-5 w-[480px] max-w-full rounded-lg" />
        </div>

        {/* First Row */}
        <div className="mt-14 flex gap-6 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[340px] rounded-3xl border p-6 space-y-5"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-14 w-14 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>

              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[75%]" />
            </div>
          ))}
        </div>

        {/* Second Row */}
        <div className="mt-6 flex gap-6 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[340px] rounded-3xl border p-6 space-y-5"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-14 w-14 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>

              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[88%]" />
              <Skeleton className="h-4 w-[70%]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}