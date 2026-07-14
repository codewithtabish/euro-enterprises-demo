"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import {
  Plus,
  ChevronRight,
  BadgeCheck,
  Gauge,
  Wrench,
  Shield,
  Car,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import WhyChooseUsHeader from "./choose-us-header";

// ─── Feature Data ─────────────────────────────────────────────────
interface Feature {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  details: string[];
  icon: React.ElementType;
  image: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  accentLight: string;
  stat: { value: string; label: string };
}

const features: Feature[] = [
  {
    id: "certified",
    title: "Certified Pre-Owned Program",
    shortTitle: "Certified Pre-Owned",
    description:
      "Every vehicle undergoes a rigorous 200-point inspection by our master technicians. We don\'t just sell cars — we deliver peace of mind with full transparency.",
    details: [
      "200-point comprehensive mechanical & cosmetic inspection",
      "Full vehicle history report with accident check",
      "12-month / 12,000-mile limited warranty included",
      "7-day money-back guarantee, no questions asked",
      "Free CARFAX report with every certified vehicle",
    ],
    icon: BadgeCheck,
    image: "/features/one.jpg",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    accentBg: "bg-emerald-50 dark:bg-emerald-950/30",
    accentBorder: "border-emerald-200 dark:border-emerald-800",
    accentLight: "bg-emerald-500/10",
    stat: { value: "200+", label: "Point Inspection" },
  },
  {
    id: "performance",
    title: "Performance Tuning & Upgrades",
    shortTitle: "Performance Tuning",
    description:
      "Unlock your vehicle\'s true potential with our in-house performance center. From ECU remapping to suspension upgrades, we make your car drive like it was meant to.",
    details: [
      "Custom ECU tuning by certified performance engineers",
      "Dyno-tested horsepower & torque gains verified",
      "Premium exhaust, intake, and turbo upgrades",
      "Track-ready suspension and brake packages",
      "Performance software with lifetime updates",
    ],
    icon: Gauge,
    image: "/images/performance-1.jpg",
    accentColor: "text-amber-600 dark:text-amber-400",
    accentBg: "bg-amber-50 dark:bg-amber-950/30",
    accentBorder: "border-amber-200 dark:border-amber-800",
    accentLight: "bg-amber-500/10",
    stat: { value: "35%", label: "Avg. Power Gain" },
  },
  {
    id: "service",
    title: "24/7 Concierge Service Center",
    shortTitle: "Concierge Service",
    description:
      "Our state-of-the-art service center never sleeps. With factory-trained technicians and genuine OEM parts, your vehicle receives white-glove treatment around the clock.",
    details: [
      "24/7 roadside assistance with 30-min response time",
      "Factory-trained master technicians for all brands",
      "Genuine OEM parts with 2-year warranty",
      "Complimentary loaner vehicle during service",
      "Real-time service updates via mobile app",
    ],
    icon: Wrench,
    image: "/images/service-1.jpg",
    accentColor: "text-blue-600 dark:text-blue-400",
    accentBg: "bg-blue-50 dark:bg-blue-950/30",
    accentBorder: "border-blue-200 dark:border-blue-800",
    accentLight: "bg-blue-500/10",
    stat: { value: "30min", label: "Response Time" },
  },
  {
    id: "financing",
    title: "Flexible Financing Solutions",
    shortTitle: "Smart Financing",
    description:
      "We partner with 40+ lenders to secure the best rates for every credit profile. Our finance team works until we find a payment plan that fits your life perfectly.",
    details: [
      "Rates as low as 2.49% APR for qualified buyers",
      "Zero down payment options available",
      "Bad credit? No credit? We have programs for you",
      "Pre-approval in 60 seconds without hurting credit",
      "Lease-to-own and balloon payment structures",
    ],
    icon: Shield,
    image: "/images/finance-1.jpg",
    accentColor: "text-rose-600 dark:text-rose-400",
    accentBg: "bg-rose-50 dark:bg-rose-950/30",
    accentBorder: "border-rose-200 dark:border-rose-800",
    accentLight: "bg-rose-500/10",
    stat: { value: "2.49%", label: "Starting APR" },
  },
  {
    id: "inventory",
    title: "Curated Premium Inventory",
    shortTitle: "Curated Inventory",
    description:
      "We hand-pick every vehicle in our showroom. No auctions, no lemons — only meticulously maintained luxury and performance vehicles that meet our impossible standards.",
    details: [
      "Hand-selected inventory from single-owner vehicles",
      "No rental, salvage, or flood-damaged cars ever",
      "Full detail and ceramic coating before delivery",
      "Virtual showroom with 360° interior/exterior views",
      "Nationwide shipping to your doorstep",
    ],
    icon: Car,
    image: "/images/inventory-1.jpg",
    accentColor: "text-cyan-600 dark:text-cyan-400",
    accentBg: "bg-cyan-50 dark:bg-cyan-950/30",
    accentBorder: "border-cyan-200 dark:border-cyan-800",
    accentLight: "bg-cyan-500/10",
    stat: { value: "500+", label: "Hand-Picked Cars" },
  },
  {
    id: "experience",
    title: "The Euro Experience",
    shortTitle: "Euro Experience",
    description:
      "From the moment you walk in, you\'re family. Private lounges, complimentary espresso, and a no-pressure environment where your needs always come first.",
    details: [
      "Private client lounges with premium amenities",
      "Complimentary gourmet coffee & refreshments",
      "No-pressure, consultative buying experience",
      "Personal vehicle shopper assigned to you",
      "VIP events, track days, and owner meetups",
    ],
    icon: HeartHandshake,
    image: "/images/experience-1.jpg",
    accentColor: "text-violet-600 dark:text-violet-400",
    accentBg: "bg-violet-50 dark:bg-violet-950/30",
    accentBorder: "border-violet-200 dark:border-violet-800",
    accentLight: "bg-violet-500/10",
    stat: { value: "4.9★", label: "Customer Rating" },
  },
];

// ─── Animated Counter ───────────────────────────────────────────────
function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-foreground">
        {value}
      </div>
      <div className="text-xs md:text-sm text-muted-foreground mt-1">{label}</div>
    </motion.div>
  );
}

// ─── Feature Item Component ─────────────────────────────────────────
function FeatureItem({
  feature,
  isOpen,
  onToggle,
  index,
}: {
  feature: Feature;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-50px" });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
        className={`
          w-full text-left rounded-2xl border transition-all duration-500 ease-out
          ${isOpen
            ? `${feature.accentBg} ${feature.accentBorder} shadow-lg`
            : "bg-card/50 border-border/60 hover:border-border hover:bg-accent/30"
          }
        `}
      >
        {/* Collapsed / Header Row */}
        <div className="flex items-center gap-4 p-4 md:p-5">
          {/* Icon Circle */}
          <motion.div
            animate={{
              rotate: isOpen ? 180 : 0,
              backgroundColor: isOpen ? "rgba(59,130,246,0.1)" : "rgba(0,0,0,0.03)",
            }}
            transition={{ duration: 0.4 }}
            className={`
              w-11 h-11 md:w-12 md:h-12 rounded-full border flex items-center justify-center shrink-0
              ${isOpen ? feature.accentBorder : "border-border/60 dark:border-border/40"}
              dark:bg-white/5
            `}
          >
            <Icon className={`w-5 h-5 md:w-5.5 md:h-5.5 ${isOpen ? feature.accentColor : "text-muted-foreground"}`} />
          </motion.div>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <h3 className={`text-base md:text-lg font-semibold truncate transition-colors duration-300 ${
              isOpen ? "text-foreground" : "text-foreground/90"
            }`}>
              {feature.shortTitle}
            </h3>
            {!isOpen && (
              <p className="text-xs text-muted-foreground truncate mt-0.5 hidden sm:block">
                Click to explore
              </p>
            )}
          </div>

          {/* Expand/Collapse Icon */}
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`
              w-8 h-8 md:w-9 md:h-9 rounded-full border flex items-center justify-center shrink-0
              ${isOpen
                ? `${feature.accentBg} ${feature.accentBorder} ${feature.accentColor}`
                : "bg-muted/50 border-border/60 text-muted-foreground"
              }
            `}
          >
            <Plus className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.35, delay: 0.1 }
              }}
              className="overflow-hidden"
            >
              <div className="px-4 md:px-5 pb-5 md:pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  {/* Left: Text Content */}
                  <div className="space-y-5">
                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      className="text-muted-foreground text-sm md:text-base leading-relaxed"
                    >
                      <span className={`font-bold ${feature.accentColor}`}>
                        {feature.title.split(" ")[0]} {feature.title.split(" ")[1]}
                      </span>
                      {". "}
                      {feature.description.split(". ").slice(1).join(". ")}
                    </motion.p>

                    {/* Stats Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25, duration: 0.4 }}
                      className={`
                        inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border
                        ${feature.accentBg} ${feature.accentBorder}
                      `}
                    >
                      <span className={`text-xl md:text-2xl font-bold ${feature.accentColor}`}>
                        {feature.stat.value}
                      </span>
                      <span className="text-xs md:text-sm text-muted-foreground border-l border-border/50 pl-3">
                        {feature.stat.label}
                      </span>
                    </motion.div>

                    {/* Details List */}
                    <motion.ul
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="space-y-2.5"
                    >
                      {feature.details.map((detail, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.35 + i * 0.06, duration: 0.35 }}
                          className="flex items-start gap-3"
                        >
                          <div className={`
                            w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5
                            ${feature.accentLight}
                            border ${feature.accentBorder}
                          `}>
                            <ChevronRight className={`w-3 h-3 ${feature.accentColor}`} />
                          </div>
                          <span className="text-sm text-foreground/80 leading-relaxed">{detail}</span>
                        </motion.li>
                      ))}
                    </motion.ul>

                    {/* CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                    >
                      <button className={`
                        group inline-flex items-center gap-2 text-sm font-semibold
                        ${feature.accentColor} hover:opacity-80 transition-opacity
                      `}>
                        Learn more about {feature.shortTitle.toLowerCase()}
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  </div>

                  {/* Right: Visual Panel */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <div className={`
                      relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[220px] md:min-h-[280px] rounded-2xl overflow-hidden
                      ${feature.accentBg} border ${feature.accentBorder}
                    `}>
                      {/* Abstract Car Visual */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{
                            y: [0, -8, 0],
                            rotate: [0, 1, 0, -1, 0]
                          }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                          className="relative"
                        >
                          {/* Car Silhouette SVG */}
                          <svg
                            viewBox="0 0 400 200"
                            className="w-48 h-24 md:w-64 md:h-32 opacity-20 dark:opacity-15"
                            fill="currentColor"
                          >
                            <path
                              d="M40 140 Q40 100 80 90 L120 85 Q140 60 200 55 Q260 50 300 70 L340 80 Q380 85 380 120 L380 140 Q380 160 360 160 L40 160 Q20 160 20 140 Z"
                              className="text-foreground"
                            />
                            <circle cx="90" cy="160" r="25" className="text-background" />
                            <circle cx="90" cy="160" r="12" className="text-muted-foreground" />
                            <circle cx="310" cy="160" r="25" className="text-background" />
                            <circle cx="310" cy="160" r="12" className="text-muted-foreground" />
                          </svg>
                        </motion.div>
                      </div>

                      {/* Overlay Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                          className={`
                            w-16 h-16 md:w-20 md:h-20 rounded-2xl
                            ${feature.accentBg} ${feature.accentBorder}
                            border flex items-center justify-center mb-3 backdrop-blur-sm
                          `}
                        >
                          <Icon className={`w-8 h-8 md:w-10 md:h-10 ${feature.accentColor}`} />
                        </motion.div>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-foreground/50 text-sm font-medium"
                        >
                          {feature.shortTitle}
                        </motion.p>
                      </div>

                      {/* Corner Accent */}
                      <div className={`
                        absolute top-0 right-0 w-24 h-24 opacity-10
                        ${feature.accentLight}
                      `} />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

// ─── Main WhyChooseUs Component ───────────────────────────────────
export default function WhyChooseUsTwo() {
  const [openFeature, setOpenFeature] = useState<string | null>("certified");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const toggleFeature = (id: string) => {
    setOpenFeature(openFeature === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Subtle background pattern — adapts to theme */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]">
        <div
          style={{
            backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>


      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <WhyChooseUsHeader/>
      

        {/* Features List */}
        <div className="space-y-3 md:space-y-4">
          {features.map((feature, index) => (
            <FeatureItem
              key={feature.id}
              feature={feature}
              isOpen={openFeature === feature.id}
              onToggle={() => toggleFeature(feature.id)}
              index={index}
            />
          ))}
        </div>

        {/* Bottom Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-20"
        >
          <div className="relative rounded-3xl border border-border/60 bg-card/40 backdrop-blur-sm p-8 md:p-12">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              <AnimatedCounter value="15K+" label="Happy Customers" />
              <AnimatedCounter value="500+" label="Vehicles Sold" />
              <AnimatedCounter value="98%" label="Satisfaction Rate" />
              <AnimatedCounter value="24/7" label="Support Available" />
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-muted-foreground text-sm mb-4">
            Ready to experience the Euro difference?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90
              text-primary-foreground font-semibold rounded-2xl
              shadow-lg shadow-primary/20 transition-all duration-300"
          >
            <Car className="w-5 h-5" />
            Browse Our Showroom
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}