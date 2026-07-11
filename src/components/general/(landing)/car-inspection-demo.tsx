"use client";

import Image from "next/image";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import {
  Search,
  Settings,
  ShieldCheck,
  CarFront,
  FileText,
} from "lucide-react";
import CarInspectionHeader from "./car-inspection-header";

const features = [
  {
    Icon: Search,
    name: "Computer Diagnostics",
    description:
      "Advanced ECU scanning detects hidden issues and provides accurate fault reports.",
    href: "#",
    cta: "Learn More",
    background: (
      <Image
        src="/inspection/diagnostics.jpg"
        alt="Computer Diagnostics"
        fill
        className="absolute inset-0 object-cover opacity-50 transition-transform duration-500 group-hover:scale-105"
      />
    ),
    className:
      "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Settings,
    name: "Engine Inspection",
    description:
      "Complete engine health check including cooling system, oil leaks, belts, and performance.",
    href: "#",
    cta: "Learn More",
    background: (
      <Image
        src="/inspection/engine.jpg"
        alt="Engine Inspection"
        fill
        className="absolute inset-0 object-cover opacity-50 transition-transform duration-500 group-hover:scale-105"
      />
    ),
    className:
      "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: ShieldCheck,
    name: "Brake & Safety",
    description:
      "Inspection of brakes, suspension, steering, tires, and overall vehicle safety.",
    href: "#",
    cta: "Learn More",
    background: (
      <Image
        src="/inspection/brakes.jpg"
        alt="Brake Inspection"
        fill
        className="absolute inset-0 object-cover opacity-50 transition-transform duration-500 group-hover:scale-105"
      />
    ),
    className:
      "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CarFront,
    name: "Exterior Check",
    description:
      "Professional inspection of paint, lights, body panels, mirrors, and glass.",
    href: "#",
    cta: "Learn More",
    background: (
      <Image
        src="/inspection/exterior.jpg"
        alt="Exterior Inspection"
        fill
        className="absolute inset-0 object-cover opacity-50 transition-transform duration-500 group-hover:scale-105"
      />
    ),
    className:
      "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: FileText,
    name: "Digital Inspection Report",
    description:
      "Receive a detailed inspection report with photos, recommendations, and maintenance priorities.",
    href: "#",
    cta: "View Sample",
    background: (
      <Image
        src="/inspection/report.jpg"
        alt="Inspection Report"
        fill
        className="absolute inset-0 object-cover opacity-50 transition-transform duration-500 group-hover:scale-105"
      />
    ),
    className:
      "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4",
  },
];

export function CarInspectionDemoSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <CarInspectionHeader/>
       

        <BentoGrid className="lg:grid-rows-3">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}