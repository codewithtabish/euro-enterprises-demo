// components/general/container.tsx

import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
     className={cn(
  "mx-auto w-full max-w-full  sm:px-6 md:max-w-3xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[1440px] 2xl:px-8",
  className
)}
    >
            {/* <GradientDotMesh /> */}
      
      {children}
    </div>
  );
}