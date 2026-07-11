"use client";

import Image from "next/image";
import {
  Car,
  Wrench,
  ScanSearch,
  ShieldCheck,
  FileText,
  Cog,
} from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: ScanSearch,
    name: "Computer Diagnostics",
    description:
      "Advanced ECU scanning detects hidden faults before they become expensive repairs.",
    href: "#",
    cta: "Learn More",
    className: "lg:col-span-2 lg:row-span-1",
    background: (
      <Image
        src="/images/inspection/diagnostics.jpg"
        alt="Computer Diagnostics"
        fill
        className="object-cover opacity-60 transition-all duration-500 group-hover:scale-105"
      />
    ),
  },
  {
    Icon: Wrench,
    name: "Engine Inspection",
    description:
      "Complete inspection of engine performance, leaks, cooling system, belts, and fluids.",
    href: "#",
    cta: "Learn More",
    className: "lg:col-span-1 lg:row-span-1",
    background: (
      <Image
        src="/images/inspection/engine.jpg"
        alt="Engine Inspection"
        fill
        className="object-cover opacity-60 transition-all duration-500 group-hover:scale-105"
      />
    ),
  },
  {
    Icon: ShieldCheck,
    name: "Brake & Safety",
    description:
      "Detailed brake pads, discs, ABS, steering, and suspension safety inspection.",
    href: "#",
    cta: "Learn More",
    className: "lg:col-span-1 lg:row-span-1",
    background: (
      <Image
        src="/images/inspection/brakes.jpg"
        alt="Brake Inspection"
        fill
        className="object-cover opacity-60 transition-all duration-500 group-hover:scale-105"
      />
    ),
  },
  {
    Icon: Car,
    name: "Interior & Exterior",
    description:
      "Professional inspection of cabin, paint, lights, body panels, and overall condition.",
    href: "#",
    cta: "Learn More",
    className: "lg:col-span-1 lg:row-span-1",
    background: (
      <Image
        src="/images/inspection/interior.jpg"
        alt="Interior Inspection"
        fill
        className="object-cover opacity-60 transition-all duration-500 group-hover:scale-105"
      />
    ),
  },
  {
    Icon: Cog,
    name: "Suspension & Tires",
    description:
      "Wheel alignment, suspension components, tire wear, and road handling analysis.",
    href: "#",
    cta: "Learn More",
    className: "lg:col-span-1 lg:row-span-1",
    background: (
      <Image
        src="/images/inspection/suspension.jpg"
        alt="Suspension"
        fill
        className="object-cover opacity-60 transition-all duration-500 group-hover:scale-105"
      />
    ),
  },
  {
    Icon: FileText,
    name: "Digital Inspection Report",
    description:
      "Receive a detailed report with photos, recommendations, and repair priorities.",
    href: "#",
    cta: "View Sample",
    className: "lg:col-span-2 lg:row-span-1",
    background: (
      <Image
        src="/images/inspection/report.jpg"
        alt="Inspection Report"
        fill
        className="object-cover opacity-60 transition-all duration-500 group-hover:scale-105"
      />
    ),
  },
];

export default function CarInspectionSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Premium Vehicle Inspection
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight lg:text-5xl">
            Comprehensive Car Inspection Services
          </h2>

          <p className="mt-6 text-muted-foreground text-lg">
            Our certified technicians perform a complete multi-point inspection
            using modern diagnostic equipment to ensure your vehicle is safe,
            reliable, and road-ready.
          </p>
        </div>

        <BentoGrid className="auto-rows-[22rem]">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}