import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FullWidthDivider } from "@/components/full-width-divider";
import { AtSignIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";

export function CallToAction() {
  return (
    <div className="relative mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
      <FullWidthDivider className="-top-px" />

      <div className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-sm px-8 py-10 md:px-12 md:py-14 shadow-xl shadow-black/5 dark:shadow-none text-center">
        <div className="mx-auto max-w-md space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Subscribe to our newsletter
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Get the latest updates, exclusive offers, and premium car rental insights delivered straight to your inbox.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <InputGroup className="w-full max-w-md bg-background border border-border">
            <InputGroupInput
              type="email"
              placeholder="your@email.com"
              className="h-12"
            />
            <InputGroupAddon>
              <AtSignIcon className="h-5 w-5 text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>

          <Button size="lg" className="w-full sm:w-auto px-8 h-12 font-medium">
            Subscribe
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <p>Written by real humans (we swear).</p>
          
          <div className="flex -space-x-2">
            {[
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=72",
              "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?q=80&w=72",
              "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=72",
              "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?q=80&w=72",
            ].map((src, i) => (
              <div key={i} className="relative h-7 w-7 rounded-full ring-2 ring-background overflow-hidden">
                <Image
                  src={src}
                  alt={`Team member ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="28px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <FullWidthDivider className="-bottom-px" />
    </div>
  );
}