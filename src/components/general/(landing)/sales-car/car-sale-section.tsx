"use client";

/**
 * Featured Rental Cars - Vertical Accordion Style
 */

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import CarsForSaleHeader from "./sales-header";
const FEATURED_CARS = [
  { 
    id: 1, 
    title: "Midnight Drive", 
    subtitle: "Stealth Black Edition",
src: "/features/one.jpg"   },
  { 
    id: 2, 
    title: "Glasshouse", 
    subtitle: "Panoramic Luxury",
src: "/features/two.jpg"   },
  { 
    id: 3, 
    title: "Low Tide", 
    subtitle: "Coastal Cruiser",
src: "/features/three.jpg"   },
  { 
    id: 4, 
    title: "Neon Fields", 
    subtitle: "Cyber Edition",
src: "/features/four.jpg"   },
  { 
    id: 5, 
    title: "Palerose", 
    subtitle: "Elegant Rose Gold",
src: "/features/five.jpg"   },
  { 
    id: 6, 
    title: "Static Bloom", 
    subtitle: "Modern Classic",
src: "/features/six.jpg"   },
  { 
    id: 7, 
    title: "Vantablack", 
    subtitle: "Absolute Matte Black",
src: "/features/seven.jpg"   },
  { 
    id: 8, 
    title: "Golden Hour", 
    subtitle: "Premium Grand Tourer",
src: "/features/eight.jpg"   },
  { 
    id: 9, 
    title: "Undertow", 
    subtitle: "Deep Ocean Blue",
src: "/features/nine.jpg"   },
  
];

const CarSalesSection = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % FEATURED_CARS.length),
      3000
    );
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div className="lg:py-20  py-10">
<CarsForSaleHeader/>
    <div
      className="flex h-[80vh] w-full select-none items-center justify-center"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="flex h-[70%] w-[min(1050px,92%)] gap-2.5">
        {FEATURED_CARS.map((car, i) => {
          const isActive = i === active;

          return (
            <motion.div
              key={car.id}
              initial={false}
              animate={{ flexGrow: isActive ? 7 : 1 }}
              transition={{ type: "spring", stiffness: 170, damping: 26 }}
              onClick={() => setActive(i)}
              className="relative min-w-0 basis-0 cursor-pointer overflow-hidden rounded-2xl bg-neutral-900"
            >
              {/* Using your own static images with Next.js Image */}
              <Image
                src={car.src}
                alt={car.title}
                fill
                className="object-cover"
                priority={i < 2}
                sizes="(max-width: 768px) 100vw, 700px"
                quality={90}
              />

              <motion.div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                initial={false}
                animate={{ opacity: isActive ? 1 : 0.55 }}
              />

              {/* Sideways label while collapsed */}
              <motion.p
                initial={false}
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium uppercase tracking-[0.25em] text-white/85"
                style={{ writingMode: "vertical-rl" }}
              >
                {car.title}
              </motion.p>

              {/* Full caption when expanded */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 14,
                }}
                transition={{ duration: 0.4, delay: isActive ? 0.18 : 0 }}
                className="pointer-events-none absolute bottom-5 left-6 text-white"
              >
                <h3 className="text-2xl font-semibold tracking-tight">
                  {car.title}
                </h3>
                <p className="mt-0.5 text-xs text-white/70">{car.subtitle}</p>
              </motion.div>

              <p className="pointer-events-none absolute right-4 top-4 text-[10px] font-medium text-white/60">
                0{i + 1}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default CarSalesSection;