import { Skeleton } from "@/components/ui/skeleton";

export default function CallToActionSkeleton() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
      <div className="rounded-3xl border border-border/60 p-8 md:p-12">
        {/* Heading */}
        <div className="flex flex-col items-center">
          <Skeleton className="h-10 w-80 max-w-full rounded-xl" />
          <Skeleton className="mt-5 h-5 w-[520px] max-w-full rounded-lg" />
          <Skeleton className="mt-2 h-5 w-[420px] max-w-full rounded-lg" />
        </div>

        {/* Input + Button */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Skeleton className="h-12 w-full max-w-md rounded-xl" />
          <Skeleton className="h-12 w-40 rounded-xl" />
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Skeleton className="h-4 w-48 rounded-md" />

          <div className="flex -space-x-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-7 w-7 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}