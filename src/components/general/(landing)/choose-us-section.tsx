"use client";

import {
  ShieldCheck,
  CarFront,
  BadgeDollarSign,
  Headset,
  ClipboardCheck,
  Clock3,
} from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import WhyChooseUsHeader from "./choose-us-header";

const features = [
  {
    name: "Inspection",
    value: "inspection",
    icon: ShieldCheck,
    title: "100+ Point Vehicle Inspection",
    content:
      "Every vehicle is carefully inspected by certified technicians before being added to our fleet. We thoroughly inspect the engine, brakes, suspension, steering, tires, electronics, safety systems, and overall condition to ensure maximum reliability and customer confidence.",
  },
  {
    name: "Fleet",
    value: "fleet",
    icon: CarFront,
    title: "Premium Vehicle Fleet",
    content:
      "Choose from our wide collection of luxury sedans, SUVs, economy cars, and executive vehicles. Every vehicle is professionally cleaned, serviced, and maintained to the highest standards before every rental.",
  },
  {
    name: "Pricing",
    value: "pricing",
    icon: BadgeDollarSign,
    title: "Transparent Pricing",
    content:
      "Enjoy straightforward pricing with no hidden charges. Our flexible rental plans provide exceptional value while maintaining complete transparency from booking to vehicle return.",
  },
  {
    name: "Support",
    value: "support",
    icon: Headset,
    title: "24/7 Customer Support",
    content:
      "Our dedicated support team is always available to assist you before, during, and after your rental. We are committed to providing a smooth and stress-free experience.",
  },
  {
    name: "Quality",
    value: "quality",
    icon: ClipboardCheck,
    title: "Guaranteed Quality",
    content:
      "Every vehicle undergoes professional detailing, sanitization, and final quality checks before delivery, ensuring a clean, comfortable, and dependable driving experience.",
  },
  {
    name: "Booking",
    value: "booking",
    icon: Clock3,
    title: "Fast & Easy Booking",
    content:
      "Reserve your preferred vehicle in just a few minutes through our streamlined booking process. Quick confirmation, simple paperwork, and hassle-free pickup.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <WhyChooseUsHeader />

        <Tabs defaultValue="inspection" className="w-full">
          {/* ==================== MOBILE TABS - CLEAN & AMAZING ==================== */}
          <div className="lg:hidden mb-10">
            <TabsList className="bg-transparent flex w-full gap-3 px-1">
              {features.slice(0, 3).map(({ icon: Icon, name, value }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-3xl transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-xl border border-border/50 data-[state=active]:border-primary/30 hover:bg-muted/50"
                >
                  <div className="h-11 w-11 flex items-center justify-center rounded-2xl bg-card data-[state=active]:bg-primary-foreground/10">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold tracking-tight">{name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <p className="text-center text-xs text-muted-foreground mt-4">
              More features available below ↓
            </p>
          </div>

          {/* ==================== DESKTOP TABS (Vertical) ==================== */}
          <div className="hidden lg:flex gap-12 items-start">
            <TabsList className="bg-muted/70 backdrop-blur-sm flex h-auto flex-col rounded-3xl p-3 shadow-inner w-72 shrink-0">
              {features.map(({ icon: Icon, name, value }) => (
                <Tooltip key={value} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <TabsTrigger
                      value={value}
                      className="group flex h-14 w-full items-center gap-4 rounded-2xl px-5 text-left transition-all hover:bg-background/80 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-xl border-0"
                    >
                      <Icon className="h-6 w-6" />
                      <span className="font-medium">{name}</span>
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="right">{name}</TooltipContent>
                </Tooltip>
              ))}
            </TabsList>

            {/* Desktop Content */}
            <div className="flex-1">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <TabsContent
                    key={feature.value}
                    value={feature.value}
                    className="mt-0 focus-visible:ring-0"
                  >
                    <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-xl shadow-black/5 dark:shadow-none">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                          <Icon className="h-9 w-9 text-primary" />
                        </div>
                        <h3 className="text-3xl font-bold tracking-tight">
                          {feature.title}
                        </h3>
                      </div>

                      <div className="h-1.5 w-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 mb-6" />

                      <p className="text-[17px] leading-relaxed text-muted-foreground">
                        {feature.content}
                      </p>

                      <div className="mt-10 pt-6 border-t border-dashed text-sm font-medium text-muted-foreground flex flex-wrap gap-x-6 gap-y-2">
                        <div>✓ Trusted by thousands</div>
                        <div>✓ Premium quality</div>
                        <div>✓ Professional service</div>
                      </div>
                    </div>
                  </TabsContent>
                );
              })}
            </div>
          </div>

          {/* ==================== MOBILE CONTENT ==================== */}
          <div className="lg:hidden space-y-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <TabsContent
                  key={feature.value}
                  value={feature.value}
                  className="mt-0 focus-visible:ring-0"
                >
                  <div className="rounded-3xl border border-border/60 bg-card p-7 shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight">
                        {feature.title}
                      </h3>
                    </div>

                    <div className="h-1 w-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 mb-6" />

                    <p className="text-[17px] leading-relaxed text-muted-foreground">
                      {feature.content}
                    </p>

                    <div className="mt-8 pt-6 border-t border-dashed text-sm font-medium text-muted-foreground">
                      ✓ Trusted by thousands • ✓ Premium quality • ✓ Professional service
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
      </div>
    </section>
  );
}