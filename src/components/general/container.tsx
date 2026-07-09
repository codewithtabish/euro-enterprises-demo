// components/general/container.tsx

import { cn } from "@/lib/utils";
import GradientDotMesh from "../pixel-perfect/gradient-dot-mesh";

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
  "mx-auto w-full max-w-full px-4 sm:px-6 md:max-w-3xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[1440px] 2xl:px-8",
  className
)}
    >
            {/* <GradientDotMesh /> */}
      
      {children}
    </div>
  );
}