import { Skeleton } from "@/components/ui/skeleton";

export default function WhyChooseUsSkeleton() {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-center mb-14 space-y-4">
          <Skeleton className="h-6 w-40 rounded-full" />
          <Skeleton className="h-12 w-96 max-w-full rounded-xl" />
          <Skeleton className="h-5 w-[650px] max-w-full rounded-xl" />
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border p-5"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-56" />
                  <Skeleton className="h-4 w-32" />
                </div>

                <Skeleton className="h-9 w-9 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 rounded-3xl border border-border p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center space-y-3">
                <Skeleton className="h-10 w-20 mx-auto" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center space-y-4">
          <Skeleton className="h-4 w-52" />
          <Skeleton className="h-14 w-64 rounded-2xl" />
        </div>

      </div>
    </section>
  );
}