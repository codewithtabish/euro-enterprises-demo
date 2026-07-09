"use client";

import React, { useState } from "react";
import { Car, Users, Calendar, Shield, Clock, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ServicesHeader from "./services-header";

interface ServiceItem {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  longDesc: string;
  image: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 1,
    title: "Premium Fleet",
    icon: <Car className="w-8 h-8" />,
    description: "World-Class Luxury Vehicles",
    longDesc: "Handpicked collection of Mercedes S-Class, Rolls-Royce, Bentley, Ferrari, and Range Rover — impeccably maintained.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=90",
  },
  {
    id: 2,
    title: "Executive Chauffeur",
    icon: <Users className="w-8 h-8" />,
    description: "Professional Private Drivers",
    longDesc: "Discreet, highly trained chauffeurs delivering 5-star service with deep local knowledge.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=90",
  },
  {
    id: 3,
    title: "Wedding & Events",
    icon: <Calendar className="w-8 h-8" />,
    description: "Unforgettable Celebrations",
    longDesc: "Make your special day extraordinary with elegant processions and luxury transportation.",
    image: "https://images.unsplash.com/photo-1519741497674-611027288377?w=800&q=90",
  },
  {
    id: 4,
    title: "VIP Protection",
    icon: <Shield className="w-8 h-8" />,
    description: "Secure Luxury Transport",
    longDesc: "Armored vehicles and professional security for high-profile clients and dignitaries.",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=90",
  },
];

export default function ServicesSection() {
  const [activeImage, setActiveImage] = useState(SERVICES_DATA[0].image);
  const [activeId, setActiveId] = useState(1);

  return (
    <section className="py-20 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <ServicesHeader />

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Accordion Section */}
          <div className="w-full lg:w-5/12">
            <Accordion
              type="single"
              collapsible
            //   @ts-ignore
              defaultValue="item-1"
              className="w-full"
            >
              {SERVICES_DATA.map((service) => (
                <AccordionItem
                  key={service.id}
                  value={`item-${service.id}`}
                  className="border-b border-zinc-200 dark:border-zinc-800"
                >
                  <AccordionTrigger
                    onClick={() => {
                      setActiveImage(service.image);
                      setActiveId(service.id);
                    }}
                    className="hover:no-underline py-6 group"
                  >
                    <div className="flex items-center gap-5 w-full">
                      <div className="text-amber-600 dark:text-amber-400 transition-transform group-hover:scale-110">
                        {service.icon}
                      </div>
                      <div className="text-left">
                        <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                          {service.title}
                        </h3>
                        <p className="text-amber-600 dark:text-amber-400 text-sm mt-1">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pb-8 text-zinc-600 dark:text-zinc-400 text-[15.5px] leading-relaxed">
                    {service.longDesc}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Image Preview */}
          <div className="hidden lg:block w-full lg:w-7/12 relative">
            <div className="sticky top-24 rounded-3xl overflow-hidden shadow-2xl aspect-[16/10] bg-zinc-900">
              {SERVICES_DATA.map((service) => (
                <img
                  key={service.id}
                  src={service.image}
                  alt={service.title}
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
                    activeImage === service.image ? "opacity-100" : "opacity-0"
                  )}
                />
              ))}

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              
              {/* Active Label */}
              <div className="absolute bottom-8 left-8 text-white">
                <div className="uppercase tracking-widest text-xs text-amber-400 mb-1">
                  {SERVICES_DATA.find(s => s.id === activeId)?.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}