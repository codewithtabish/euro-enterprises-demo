import { Skeleton } from "@/components/ui/skeleton";

const FeaturedCarsSkeleton = () => {
  return (
    <section className="pt-10 md:pt-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-14">
          <Skeleton className="h-5 w-44 rounded-full" />
          <Skeleton className="h-12 w-[420px] max-w-full rounded-xl" />
          <Skeleton className="h-5 w-[560px] max-w-full rounded-lg" />
        </div>

        {/* Coverflow */}
        <div className="relative flex h-[80vh] items-center justify-center overflow-hidden">

          {/* Left */}
          <Skeleton className="absolute left-[12%] h-[330px] w-[220px] rounded-xl rotate-[-18deg] opacity-50" />

          <Skeleton className="absolute left-[26%] h-[350px] w-[235px] rounded-xl rotate-[-10deg] opacity-70" />

          {/* Center */}
          <Skeleton className="z-10 h-[390px] w-[250px] rounded-xl shadow-2xl" />

          {/* Right */}
          <Skeleton className="absolute right-[26%] h-[350px] w-[235px] rounded-xl rotate-[10deg] opacity-70" />

          <Skeleton className="absolute right-[12%] h-[330px] w-[220px] rounded-xl rotate-[18deg] opacity-50" />

        </div>
      </div>
    </section>
  );
};

export default FeaturedCarsSkeleton;