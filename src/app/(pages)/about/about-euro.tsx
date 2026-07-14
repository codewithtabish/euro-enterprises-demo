"use client";

import React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe,
  Cog,
  Shield,
  Gauge,
  Users,
  Award,
  Car,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Clock,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// ─── Feature Data ─────────────────────────────────────────────────
const features = [
  {
    title: "Nationwide Reach",
    description:
      "Serving customers across all 50 states with certified delivery and our trusted partner network of 200+ dealerships.",
    icon: Globe,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    title: "Zero-Hassle Buying",
    description:
      "From online browsing to doorstep delivery — handle everything digitally. No dealership pressure, no hidden fees, no surprises.",
    icon: Cog,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
  },
  {
    title: "Certified Protection",
    description:
      "Every vehicle passes our rigorous 200-point inspection. Full CARFAX history, warranty included, and 7-day money-back guarantee.",
    icon: Shield,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
  },
];

// ─── Content Sections (Our Vision / Our Story) ────────────────────
const contentSections = [
  {
    title: "Our Vision",
    content: `For years, buying a premium vehicle has been a frustrating experience — pushy salespeople, hidden fees, and hours wasted at dealerships. We knew there had to be a better way.

What if you could find your dream car from the comfort of your home? What if every vehicle came with complete transparency — full history, inspection reports, and fair pricing upfront?

With Euro Enterprises, you can. Our platform lets you browse, compare, finance, and purchase — all without stepping into a dealership. Every car is hand-picked, thoroughly inspected, and delivered to your door.

We believe that everyone deserves a stress-free car buying experience, regardless of budget or technical knowledge.`,
  },
  {
    title: "Our Story",
    content: `Euro Enterprises was founded by a team of automotive enthusiasts and tech engineers who were tired of the traditional car buying experience. We spent over a decade building digital tools for the auto industry before deciding to revolutionize the process ourselves.

We started by curating vehicles for our own network, and now thousands of happy drivers trust us for their automotive needs. From first-time buyers to seasoned collectors, we treat every customer like family.

Our team is made up of master technicians, former dealership veterans, and passionate car lovers who inspect every vehicle as if it were their own. We are dedicated to helping you find the perfect car.`,
  },
];

// ─── Brand Partners ──────────────────────────────────────────────
const partners = [
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Porsche",
  "Lexus",
  "Range Rover",
  "Tesla",
];

// ─── Animated Counter ─────────────────────────────────────────────
function AnimatedCounter({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-black text-foreground">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-widest mt-1.5">
        {label}
      </div>
    </motion.div>
  );
}

// ─── Main About Component ─────────────────────────────────────────
export default function AboutEuro() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]">
        <div
          style={{
            backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">
        {/* ═══════════════════════════════════════════════════════════
            HERO / BRAND STORY CARD
        ═══════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden"
        >
          {/* Decorative Image - Next.js Image */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.04] pointer-events-none hidden lg:block">
            <Image
              src="/features/one.jpg"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="relative z-10 p-8 md:p-14 lg:p-16">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground">
                Company Introduction
              </span>
            </motion.div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-balance leading-[0.95] mb-8">
              <span className="text-foreground">Built for drivers,</span>
              <br />
              <span className="text-primary">by car lovers.</span>
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed mb-12 max-w-2xl">
              We started as a small team of mechanics and engineers tired of
              the dealership runaround. Today, we&apos;re redefining how people
              buy premium vehicles — with transparency, trust, and zero
              pressure.
            </p>

            {/* Partner Tags */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-6 border-t border-border/30">
              <span className="text-xs text-muted-foreground font-medium mr-2">
                Trusted Partners:
              </span>
              {partners.map((item) => (
                <span
                  key={item}
                  className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════
            STATS + VISUAL SECTION
        ═══════════════════════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div>
              <Badge
                variant="outline"
                className="mb-4 px-3 py-1 text-xs border-primary/20 bg-primary/5 text-primary"
              >
                <TrendingUp className="w-3 h-3 mr-1.5" />
                Our Growth
              </Badge>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-balance text-foreground">
                Infrastructure that scales with your ambition.
              </h3>
            </div>

            <p className="text-muted-foreground text-pretty leading-relaxed">
              Whether you&apos;re a first-time buyer looking for reliability or a
              collector hunting for a rare gem, our platform is designed to grow
              with you. No hidden fees, no pushy sales — just great cars at fair
              prices.
            </p>

            {/* Animated Stats */}
            <div className="flex gap-10 md:gap-14 pt-4">
              <AnimatedCounter value={99} suffix="%" label="Uptime SLA" />
              <AnimatedCounter value={15} suffix="K+" label="Cars Sold" />
              <AnimatedCounter value={98} suffix="%" label="Happy Clients" />
            </div>
          </motion.div>

          {/* Right: Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] rounded-3xl bg-muted/50 border border-border/40 p-8 flex flex-col justify-end overflow-hidden group"
          >
            {/* Background Image - Next.js */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
              <Image
                src="/features/two.jpg"
                alt=""
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4 relative z-10">
              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-muted-foreground/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={isInView ? { x: "0%" } : {}}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                  className="h-full bg-primary rounded-full"
                />
              </div>

              {/* Status */}
              <div className="font-mono text-xs text-muted-foreground flex justify-between uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  System Health
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Optimal
                </span>
              </div>

              {/* Bar Chart */}
              <div className="grid grid-cols-6 gap-2 h-32 items-end">
                {[85, 60, 95, 70, 88, 75].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${h}%` } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.08 }}
                    className="bg-primary/70 rounded-t-md group-hover:bg-primary transition-colors duration-300"
                  />
                ))}
              </div>

              {/* Mini Labels */}
              <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-wider font-mono">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            FEATURE GRID
        ═══════════════════════════════════════════════════════════ */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className={`p-8 rounded-3xl border ${feature.border} ${feature.bg} backdrop-blur-sm
                  hover:shadow-lg transition-all duration-300 group`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-background/80 border ${feature.border}
                    flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════════
            VISION & STORY CONTENT SECTIONS
        ═══════════════════════════════════════════════════════════ */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto">
          {contentSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
              className="space-y-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  {index === 0 ? (
                    <Sparkles className="w-4 h-4 text-primary" />
                  ) : (
                    <Users className="w-4 h-4 text-primary" />
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {section.title}
                </h2>
              </div>
              <Separator className="bg-border/50" />
              <p className="whitespace-pre-line text-base leading-7 text-muted-foreground text-pretty">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════
            BOTTOM CTA
        ═══════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
          <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center">
            <Badge
              variant="outline"
              className="mb-5 px-4 py-1.5 text-sm border-primary/20 bg-primary/5 text-primary"
            >
              <MapPin className="w-3.5 h-3.5 mr-1.5" />
              Visit Us
            </Badge>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Find Your Perfect Car?
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Browse our curated inventory of 500+ hand-picked vehicles. Every car
              inspected, every price fair, every experience exceptional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="px-8 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/20"
              >
                <Car className="w-5 h-5 mr-2" />
                Browse Inventory
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 h-12 border-border/60 hover:bg-accent font-semibold rounded-xl"
              >
                <Award className="w-5 h-5 mr-2" />
                Learn About Certification
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}