import { Skeleton } from "@/components/ui/skeleton";

export default function FaqAccordionSkeleton() {
  return (
    <section className="w-full max-w-3xl mx-auto py-8 my-10 px-4">
      {/* Header */}
      <div className="flex flex-col items-center mb-12">
        <Skeleton className="h-4 w-44 mb-4 rounded-full" />
        <Skeleton className="h-12 w-72 rounded-xl mb-4" />
        <Skeleton className="h-5 w-[420px] max-w-full rounded-lg" />
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border px-5 py-6 space-y-4"
          >
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-[75%]" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>

            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[70%]" />
          </div>
        ))}
      </div>
    </section>
  );
}