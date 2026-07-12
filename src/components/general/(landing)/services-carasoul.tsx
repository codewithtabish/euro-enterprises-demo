"use client";

import React from "react";
import { 
  Car, Users, Calendar, Shield, Clock, Award 
} from "lucide-react";
import { cn } from "@/lib/utils";
import ServicesHeader from "./services-header";

type Service = {
  title: string;
  tag: string;
  description: string;
  longDesc: string;
  icon: React.ReactNode;
};

const SERVICES = [
  {
    title: "Premium Fleet",
    tag: "01",
    description: "World-Class Luxury Vehicles",
    longDesc: "Mercedes S-Class, Rolls-Royce, Bentley, Range Rover, BMW 7 Series and more — meticulously maintained fleet.",
    icon: <Car className="w-11 h-11" />,
  },
  {
    title: "Executive Chauffeur",
    tag: "02",
    description: "Professional Private Drivers",
    longDesc: "Highly trained, punctual and discreet chauffeurs with excellent local knowledge and 5-star service.",
    icon: <Users className="w-11 h-11" />,
  },
  {
    title: "Wedding & Events",
    tag: "03",
    description: "Unforgettable Special Moments",
    longDesc: "Elegant wedding processions, corporate events, red carpet arrivals, private parties and celebrations.",
    icon: <Calendar className="w-11 h-11" />,
  },
  {
    title: "VIP Protection",
    tag: "04",
    description: "Secure Luxury Transport",
    longDesc: "Armored vehicles with professional security escort for high-profile clients and dignitaries.",
    icon: <Shield className="w-11 h-11" />,
  },
  {
    title: "Hourly Rental",
    tag: "05",
    description: "Flexible Luxury Transport",
    longDesc: "Perfect for business meetings, city tours, shopping trips, airport transfers and special occasions.",
    icon: <Clock className="w-11 h-11" />,
  },
  {
    title: "Concierge Experience",
    tag: "06",
    description: "White Glove Service",
    longDesc: "Complete luxury lifestyle management including hotel bookings, restaurant reservations and bespoke experiences.",
    icon: <Award className="w-11 h-11" />,
  },
];

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="26"
    height="26"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18.5 12L5 12" />
    <path d="M13 18C13 18 19 13.5 19 12C19 10.5 13 6 13 6" />
  </svg>
);

export default function ServicesGrid() {
  return (
    <div className="w-full py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <ServicesHeader/>

        {/* Notch SVG Definition */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <clipPath id="service-notch" clipPathUnits="objectBoundingBox">
              <path d="M0.1,0 H0.9 A0.1,0.1 0 0 1 1,0.1 V0.7 A0.1,0.1 0 0 1 0.9,0.8 H0.8 A0.1,0.1 0 0 0 0.7,0.9 V0.9 A0.1,0.1 0 0 1 0.6,1 H0.1 A0.1,0.1 0 0 1 0,0.9 V0.1 A0.1,0.1 0 0 1 0.1,0 Z" />
            </clipPath>
          </defs>
        </svg>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <div key={i} className="relative group">
              <div
                className={cn(
                  "relative md:h-[360px] h-[280px] flex flex-col justify-center items-center p-4 text-left overflow-hidden rounded-3xl",
                  "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
                  "transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                )}
                style={{ clipPath: "url(#service-notch)" }}
              >
                {/* Top Content */}
                <div className="flex-1">
                  <div className="text-center flex flex-col items-center">
                    {/* Title */}
                    <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3 md:mb-4 text-balance">
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 mb-4 md:mb-6 font-medium text-balance">
                      {service.description}
                    </p>

                    {/* Long Description */}
                    <p className="text-sm sm:text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-[260px] text-balance">
                      {service.longDesc}
                    </p>
                  </div>
                </div>

                {/* Bottom Right Arrow */}
                <div className="absolute bottom-9 md:block hidden right-9 h-10 w-28 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 group-hover:border-amber-500/30 transition-colors">
                  <Arrow />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}