"use client";

import React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  BadgeCheck,
  Gauge,
  Fuel,
  Calendar,
  ChevronRight,
  Tag,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ─── Car Data ───────────────────────────────────────────────────────
interface Car {
  id: string;
  url: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  year: string;
  mileage: string;
  fuel: string;
  transmission: string;
  tags: string[];
  badge?: string;
  badgeColor?: string;
}

const cars: Car[] = [
  {
    id: "1",
    url: "/features/one.jpg",
    title: "BMW M4 Competition",
    subtitle: "Coupe • Twin-Turbo Inline-6",
    price: "$78,500",
    originalPrice: "$85,000",
    year: "2024",
    mileage: "12,400",
    fuel: "Gasoline",
    transmission: "Auto",
    tags: ["Certified", "Performance", "Low Miles"],
    badge: "Hot Deal",
    badgeColor: "bg-rose-500",
  },
  {
    id: "2",
    url: "/features/two.jpg",
    title: "Mercedes-AMG G63",
    subtitle: "SUV • V8 Biturbo",
    price: "$195,000",
    year: "2023",
    mileage: "8,200",
    fuel: "Gasoline",
    transmission: "Auto",
    tags: ["Luxury", "4x4", "Rare"],
    badge: "Just Listed",
    badgeColor: "bg-blue-500",
  },
  {
    id: "3",
    url: "/features/three.jpg",
    title: "Porsche 911 Carrera S",
    subtitle: "Cabriolet • Flat-6",
    price: "$142,000",
    originalPrice: "$155,000",
    year: "2024",
    mileage: "5,800",
    fuel: "Gasoline",
    transmission: "PDK",
    tags: ["Convertible", "Sport", "Like New"],
    badge: "Price Drop",
    badgeColor: "bg-emerald-500",
  },
  {
    id: "4",
    url: "/features/four.jpg",
    title: "Audi RS e-tron GT",
    subtitle: "Sedan • Dual Motor AWD",
    price: "$125,000",
    year: "2024",
    mileage: "3,100",
    fuel: "Electric",
    transmission: "Auto",
    tags: ["EV", "Instant Torque", "Tech"],
    badge: "Eco Choice",
    badgeColor: "bg-cyan-500",
  },
  {
    id: "5",
    url: "/features/five.jpg",
    title: "Range Rover Sport SV",
    subtitle: "SUV • V8 Supercharged",
    price: "$165,000",
    year: "2023",
    mileage: "15,600",
    fuel: "Gasoline",
    transmission: "Auto",
    tags: ["Premium", "Off-Road", "Comfort"],
    badge: "Best Seller",
    badgeColor: "bg-amber-500",
  },
  {
    id: "6",
    url: "/features/six.jpg",
    title: "Lexus LC 500",
    subtitle: "Coupe • V8 Naturally Aspirated",
    price: "$98,000",
    originalPrice: "$105,000",
    year: "2024",
    mileage: "7,200",
    fuel: "Gasoline",
    transmission: "Auto",
    tags: ["Reliable", "V8 Sound", "Stunning"],
  },
];

// ─── Car Card Component ───────────────────────────────────────────
function CarCard({ car, index }: { car: Car; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group/article relative rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(.5,.85,.25,1.15)]
        md:not-[&:hover]:group-hover:w-[18%]
        md:hover:w-[40%]
        md:[&:not(:focus-within):not(:hover)]:group-focus-within:w-[18%]
        md:focus-within:w-[40%]
        w-full
        border border-border/40 hover:border-border/80
        bg-card/30 backdrop-blur-sm
        focus-within:ring-2 focus-within:ring-primary/30
        hover:shadow-xl hover:shadow-primary/5"
    >
      {/* Image Container */}
      <div className="relative h-64 md:h-[420px] w-full overflow-hidden">
        <Image
          src={car.url}
          alt={car.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(.5,.85,.25,1.15)] group-hover/article:scale-110 group-focus-within/article:scale-110"
          priority={index < 3}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 md:opacity-40 group-hover/article:opacity-80 group-focus-within/article:opacity-80 transition-opacity duration-500" />

      


      
      </div>
    </motion.article>
  );
}

// ─── Main CarsForSale Component ─────────────────────────────────────
export default function CarsForSaleSectionTwo() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]">
        <div
          style={{
            backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 md:mb-14"
        >
          <Badge
            variant="outline"
            className="mb-5 px-4 py-1.5 text-sm border-primary/20 bg-primary/5 text-primary"
          >
            <Gauge className="w-3.5 h-3.5 mr-1.5" />
            Featured Inventory
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-foreground">Cars For </span>
            <span className="text-primary">Sale</span>
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Hand-picked premium vehicles, each inspected to our impossible standards.
            Hover over any card to explore details.
          </p>
        </motion.div>

        {/* Accordion Grid */}
        <div className="group flex max-md:flex-col justify-center gap-3 md:gap-4 w-full">
          {cars.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-10 md:mt-14"
        >
          <Button
            size="lg"
            className="px-8 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/20"
          >
            View All 500+ Vehicles
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}