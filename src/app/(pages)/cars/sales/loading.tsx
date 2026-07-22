import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/* ─────────────────────────────────────────────
   SINGLE GRID SKELETON CARD
   ───────────────────────────────────────────── */

function GridSkeletonCard() {
  return (
    <Card className="overflow-hidden border-border/40 rounded-2xl">
      {/* Image area */}
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <Skeleton className="absolute inset-0" />

        {/* Year badge */}
        <div className="absolute left-3 top-3">
          <Skeleton className="h-6 w-14 rounded-lg" />
        </div>

        {/* Brand badge */}
        <div className="absolute left-[4.5rem] top-3">
          <Skeleton className="h-6 w-16 rounded-lg" />
        </div>

        {/* Price badge */}
        <div className="absolute bottom-3 left-3">
          <Skeleton className="h-8 w-28 rounded-xl" />
        </div>
      </div>

      {/* Content area */}
      <CardContent className="flex flex-1 flex-col p-5 space-y-3">
        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4 rounded-lg" />
        </div>

        {/* Meta description */}
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-full rounded-md" />
          <Skeleton className="h-3 w-2/3 rounded-md" />
        </div>

        {/* Spec pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          <Skeleton className="h-6 w-20 rounded-md" />
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="h-6 w-24 rounded-md" />
        </div>

        {/* Bottom row */}
        <div className="mt-2 pt-3 border-t border-border/10 flex items-center justify-between">
          <Skeleton className="h-3.5 w-20 rounded-md" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   LOADING PAGE — DEFAULT GRID
   ───────────────────────────────────────────── */

export default function Loading() {
  return (
    <section className="py-10 lg:py-16">
      <div className="mx-auto w-[min(1400px,92%)]">
        {/* Header */}
        <div className="mb-10 text-center space-y-3">
          <Skeleton className="mx-auto h-8 w-44 rounded-full" />
          <Skeleton className="mx-auto h-12 w-72 rounded-xl" />
          <Skeleton className="mx-auto h-5 w-md rounded-lg" />
        </div>

        {/* Search bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <Skeleton className="h-12 flex-1 max-w-2xl rounded-xl" />
            <div className="flex items-center gap-2 shrink-0">
              <Skeleton className="h-12 w-[180px] rounded-xl" />
              <Skeleton className="h-7 w-px hidden sm:block" />
              <Skeleton className="h-10 w-20 rounded-xl" />
            </div>
          </div>
          <Skeleton className="h-5 w-36 rounded-full" />
        </div>

        {/* Grid cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <GridSkeletonCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
