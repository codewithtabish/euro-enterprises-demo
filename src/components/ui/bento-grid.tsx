import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoGrid = ({
  children,
  className,
  ...props
}: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => {
  return (
    <div
      className={cn(
        "group relative col-span-3 overflow-hidden rounded-3xl border border-white/10 bg-background/15",
        "transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl",
        className
      )}
      {...props}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {background}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15 transition-all duration-500 group-hover:from-black/90 group-hover:via-black/40 group-hover:to-transparent" />

      {/* Content */}
      <div className="relative z-20 flex h-full flex-col justify-end p-8">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
          <Icon className="h-7 w-7 text-white" />
        </div>

        <h3 className="text-2xl font-bold text-white">
          {name}
        </h3>

        <p className="mt-3 max-w-md text-sm leading-7 text-white/85">
          {description}
        </p>

        <div className="mt-6">
          <Button
            size="sm"
            className="rounded-full bg-white px-5 text-black hover:bg-white/90"
            render={<a href={href} />}
            nativeButton={false}
          >
            {cta}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 transition-all duration-500 group-hover:ring-primary/40" />
    </div>
  );
};

export { BentoCard, BentoGrid };