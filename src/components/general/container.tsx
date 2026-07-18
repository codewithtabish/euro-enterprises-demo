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
        // Mobile: full width with safe padding
        "mx-auto w-full px-4",
        
        // Small screens
        "sm:px-6",
        
        // Medium: comfortable width
        "md:px-8",
        
        // Large: 95% width — removes side gaps
        "lg:w-[98%] lg:px-10",
        
        // Extra large: 95% width
        "xl:w-[95%] xl:px-12",
        
        // 2XL: 95% width
        "2xl:w-[95%] 2xl:px-16",
        
        className
      )}
    >
      {children}
    </div>
  );
}