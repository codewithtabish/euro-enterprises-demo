"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight,
  Search,
  X,
  Car,
  AlertCircle,
  Sparkles,
  Calendar,
  ArrowUp,
  ArrowDown,
  LayoutGrid,
  List,
  Gauge,
  Fuel,
  Settings2,
  Bookmark,
  Eye,
  Zap,
  Shield,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";

/* ─────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────── */

export interface SaleCarSEO {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string | null;
  noIndex: boolean;
  noFollow: boolean;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImage: string | null;
  schemaType: string;
}

export interface CarImage {
  id: string;
  createdAt: Date;
  url: string;
  alt: string | null;
  carId: string;
}

export interface CarData {
  id: string;
  slug: string;
  coverImage: string;
  brand: string;
  model: string;
  year: number;
  title: string;
  price: number;
  currency: string;
  isAvailable: boolean;
  fuelType?: string;
  transmission?: string;
  mileage?: number | null;
  color?: string;
  engine?: string;
  registration?: string;
  description?: unknown;
  images?: CarImage[];
  seo?: SaleCarSEO;
  views?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SaleCarsResult {
  success: boolean;
  data?: CarData[];
  count?: number;
  error?: string;
}

type ViewMode = "grid" | "list";

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────────── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.95,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const searchBarVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: 0.15, ease: "easeOut" },
  },
};

/* ─────────────────────────────────────────────
   UTILITY
   ───────────────────────────────────────────── */

function getCleanDescription(car: CarData): string | null {
  if (car.seo?.metaDescription && car.seo.metaDescription.length > 10) {
    return car.seo.metaDescription;
  }
  if (car.registration || car.engine) {
    const parts: string[] = [];
    if (car.registration) parts.push(`Registered ${car.registration}`);
    if (car.engine) parts.push(car.engine);
    if (parts.length) return parts.join(" · ");
  }
  if (car.mileage || car.fuelType) {
    const parts: string[] = [];
    if (car.mileage) parts.push(`${car.mileage.toLocaleString()} km`);
    if (car.fuelType) parts.push(car.fuelType);
    if (parts.length) return parts.join(" · ");
  }
  return null;
}

function formatPrice(price: number, currency: string): string {
  return `${currency} ${price.toLocaleString()}`;
}

/* ─────────────────────────────────────────────
   ERROR STATE
   ───────────────────────────────────────────── */

function ErrorState({ error }: { error?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="py-20 lg:py-28"
    >
      <div className="mx-auto w-[min(1200px,92%)]">
        <Card className="border-destructive/15 bg-destructive/[0.02]">
          <CardContent className="flex min-h-[360px] flex-col items-center justify-center gap-5 px-10 text-center">
            <div className="rounded-full bg-destructive/10 p-5">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-destructive">
                Failed to load cars
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                {error || "Please try again later."}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="mt-2 rounded-full px-6 py-2.5"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   EMPTY STATE
   ───────────────────────────────────────────── */

function EmptyState({
  searchQuery,
  onClear,
}: {
  searchQuery?: string;
  onClear?: () => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="py-20 lg:py-28"
    >
      <div className="mx-auto w-[min(1200px,92%)]">
        <Card className="border-dashed border-muted-foreground/20 bg-muted/20">
          <CardContent className="flex min-h-[360px] flex-col items-center justify-center gap-5 p-10 text-center">
            <div className="rounded-full bg-muted p-6">
              <Car className="h-12 w-12 text-muted-foreground/40" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                {searchQuery ? "No matches found" : "No cars available"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                {searchQuery
                  ? `No cars match "${searchQuery}". Try a different search.`
                  : "Check back later for new listings."}
              </p>
            </div>
            {searchQuery && onClear && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClear}
                className="mt-2 rounded-full px-5"
              >
                <X className="mr-1.5 h-3.5 w-3.5" />
                Clear search
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   GRID CAR CARD
   ───────────────────────────────────────────── */

function GridCarCard({ car, index }: { car: CarData; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const description = getCleanDescription(car);

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/cars/sales/${car.slug}`} className="block h-full">
        <Card className="group relative flex h-full flex-col pt-0 overflow-hidden border-border/40 bg-card transition-all duration-500 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/[0.07] dark:hover:shadow-primary/[0.12] hover:-translate-y-1 rounded-2xl">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src={car.coverImage}
              alt={`${car.brand} ${car.model}`}
              fill
              className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 4}
            />

            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: isHovered ? 0.85 : 0.3 }}
              transition={{ duration: 0.4 }}
            />

            <AnimatePresence>
              {!car.isAvailable && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md"
                >
                  <Badge
                    variant="destructive"
                    className="px-6 py-2.5 text-sm font-bold shadow-2xl tracking-wider"
                  >
                    SOLD
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Badges */}
            <div className="absolute left-3 top-3 flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-black/50 text-white backdrop-blur-xl border-0 text-[11px] font-bold px-3 py-1 rounded-lg"
              >
                {car.year}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-primary/90 text-primary-foreground backdrop-blur-xl border-0 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider"
              >
                {car.brand}
              </Badge>
            </div>

            {car.views !== undefined && car.views > 0 && (
              <div className="absolute right-3 top-3">
                <Badge
                  variant="secondary"
                  className="bg-black/40 text-white/90 backdrop-blur-xl border-0 text-[10px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1"
                >
                  <Eye className="h-3 w-3" />
                  {car.views > 999
                    ? `${(car.views / 1000).toFixed(1)}k`
                    : car.views}
                </Badge>
              </div>
            )}

            {/* Price */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: isHovered ? -4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-background/95 text-foreground backdrop-blur-xl border-0 shadow-2xl text-base font-bold px-4 py-2 rounded-xl"
                >
                  {formatPrice(car.price, car.currency)}
                </Badge>
              </motion.div>

              <AnimatePresence>
                {isHovered && car.isAvailable && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-1.5"
                  >
                    {car.fuelType && (
                      <Badge className="bg-white/20 text-white backdrop-blur-xl border-0 text-[10px] font-medium px-2 py-1 rounded-lg">
                        <Fuel className="h-2.5 w-2.5 mr-1" />
                        {car.fuelType}
                      </Badge>
                    )}
                    {car.transmission && (
                      <Badge className="bg-white/20 text-white backdrop-blur-xl border-0 text-[10px] font-medium px-2 py-1 rounded-lg">
                        <Settings2 className="h-2.5 w-2.5 mr-1" />
                        {car.transmission}
                      </Badge>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Content */}
          <CardContent className="flex flex-1 flex-col p-5">
            <div className="flex-1 space-y-3">
              <h3 className="text-[15px] font-bold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
                {car.title}
              </h3>

              {description && (
                <p className="text-[12px] leading-relaxed text-muted-foreground/80 line-clamp-2">
                  {description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {car.mileage !== null && car.mileage !== undefined && (
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground/70 bg-muted/60 px-2 py-1 rounded-md">
                    <Gauge className="h-3 w-3 text-primary/70" />
                    {car.mileage.toLocaleString()} km
                  </div>
                )}
                {car.color && (
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground/70 bg-muted/60 px-2 py-1 rounded-md">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full border border-border/50"
                      style={{ backgroundColor: car.color.toLowerCase() }}
                    />
                    {car.color}
                  </div>
                )}
                {car.engine && (
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground/70 bg-muted/60 px-2 py-1 rounded-md">
                    <Zap className="h-3 w-3 text-primary/70" />
                    {car.engine}
                  </div>
                )}
                {car.registration && (
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground/70 bg-muted/60 px-2 py-1 rounded-md">
                    <Shield className="h-3 w-3 text-primary/70" />
                    {car.registration}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border/20 flex items-center justify-between">
              <span className="text-xs text-muted-foreground/60 font-medium">
                {car.model}
              </span>
              {car.isAvailable ? (
                <Badge
                  variant="outline"
                  className="text-[10px] font-semibold border-emerald-500/30 text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full"
                >
                  Available
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-[10px] font-semibold border-red-500/30 text-red-600 bg-red-500/10 px-2.5 py-0.5 rounded-full"
                >
                  Sold
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   LIST CAR CARD
   ───────────────────────────────────────────── */

function ListCarCard({ car, index }: { car: CarData; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const description = getCleanDescription(car);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/save/${car.slug}`);
  };

  const specs = [
    car.fuelType && {
      icon: <Fuel className="h-3.5 w-3.5" />,
      label: car.fuelType,
    },
    car.transmission && {
      icon: <Settings2 className="h-3.5 w-3.5" />,
      label: car.transmission,
    },
    car.mileage !== null &&
      car.mileage !== undefined && {
        icon: <Gauge className="h-3.5 w-3.5" />,
        label: `${car.mileage.toLocaleString()} km`,
      },
    car.color && {
      icon: (
        <span
          className="inline-block h-3.5 w-3.5 rounded-full border border-border/60"
          style={{ backgroundColor: car.color.toLowerCase() }}
        />
      ),
      label: car.color,
    },
    car.engine && {
      icon: <Zap className="h-3.5 w-3.5" />,
      label: car.engine,
    },
    car.registration && {
      icon: <Shield className="h-3.5 w-3.5" />,
      label: `Reg: ${car.registration}`,
    },
  ].filter(Boolean) as { icon: React.ReactNode; label: string }[];

  return (
    <motion.div
      layout
      variants={listItemVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/cars/sales/${car.slug}`} className="block">
        <Card className="group relative flex flex-col sm:flex-row pt-0 overflow-hidden border-border/40 bg-card transition-all duration-500 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/[0.07] dark:hover:shadow-primary/[0.12] rounded-2xl">
          {/* Image */}
          <div className="relative w-full sm:w-72 lg:w-80 aspect-[16/10] sm:aspect-auto sm:min-h-[200px] shrink-0 overflow-hidden bg-muted">
            <Image
              src={car.coverImage}
              alt={`${car.brand} ${car.model}`}
              fill
              className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, 320px"
              priority={index < 4}
            />

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.6 : 0 }}
              transition={{ duration: 0.4 }}
            />

            <AnimatePresence>
              {!car.isAvailable && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md"
                >
                  <Badge
                    variant="destructive"
                    className="px-6 py-2.5 text-sm font-bold shadow-2xl tracking-wider"
                  >
                    SOLD
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute left-3 top-3 flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-black/50 text-white backdrop-blur-xl border-0 text-[11px] font-bold px-3 py-1 rounded-lg"
              >
                {car.year}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-primary/90 text-primary-foreground backdrop-blur-xl border-0 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider"
              >
                {car.brand}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <CardContent className="flex flex-1 flex-col justify-between p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0 space-y-2">
                <h3 className="text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {car.title}
                </h3>

                {description && (
                  <p className="text-[13px] leading-relaxed text-muted-foreground/75 line-clamp-2">
                    {description}
                  </p>
                )}

                <p className="text-sm text-muted-foreground/60 font-medium">
                  {car.model} · {car.year}
                </p>

                {specs.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {specs.map((spec, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="gap-1.5 bg-muted/50 px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground hover:bg-muted/50 border-border/30 rounded-lg"
                      >
                        {spec.icon}
                        {spec.label}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="hidden sm:flex flex-col items-end gap-3 shrink-0">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-0 text-lg font-bold px-4 py-2 rounded-xl"
                >
                  {formatPrice(car.price, car.currency)}
                </Badge>

                <div className="flex items-center gap-2">
                  {car.isAvailable ? (
                    <Badge
                      variant="outline"
                      className="text-[10px] font-semibold border-emerald-500/30 text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full"
                    >
                      Available
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-[10px] font-semibold border-red-500/30 text-red-600 bg-red-500/10 px-2.5 py-1 rounded-full"
                    >
                      Sold
                    </Badge>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleSave}
                    className="h-9 w-9 rounded-full p-0 hover:bg-muted"
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between pt-4 border-t border-border/20">
              <div className="sm:hidden">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-0 text-sm font-bold px-3 py-1.5 rounded-xl"
                >
                  {formatPrice(car.price, car.currency)}
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                {car.views !== undefined && car.views > 0 && (
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground/50">
                    <Eye className="h-3 w-3" />
                    {car.views > 999
                      ? `${(car.views / 1000).toFixed(1)}k`
                      : car.views}{" "}
                    views
                  </span>
                )}
                <Button
                  size="sm"
                  className="hidden sm:flex gap-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border-0 transition-all duration-300 text-xs font-semibold px-5 py-2.5"
                >
                  View Details
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SEARCH & FILTER BAR
   ───────────────────────────────────────────── */

function SearchFilterBar({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  totalCars,
  filteredCount,
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  totalCars: number;
  filteredCount: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleClear = useCallback(() => {
    setSearchQuery("");
    inputRef.current?.focus();
  }, [setSearchQuery]);

  const handleSortChange = useCallback(
    (value: string | null) => {
      if (value) setSortBy(value);
    },
    [setSortBy],
  );

  return (
    <motion.div
      variants={searchBarVariants}
      initial="hidden"
      animate="show"
      className="mb-8 space-y-4"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <motion.div
          className="relative flex-1 max-w-2xl"
          animate={{ scale: isFocused ? 1.005 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className={`absolute -inset-0.5 rounded-xl transition-all duration-300 pointer-events-none ${
              isFocused
                ? "bg-primary/5 shadow-lg shadow-primary/8 ring-1 ring-primary/20"
                : "bg-muted/40 shadow-sm ring-1 ring-border/50"
            }`}
          />
          <div className="relative flex items-center">
            <Search
              className={`absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-300 ${
                isFocused ? "text-primary" : "text-muted-foreground/40"
              }`}
            />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search by brand, model, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="relative h-12 pl-10 pr-10 rounded-xl border-0 bg-transparent text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm shadow-none"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.15 }}
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted-foreground/40 hover:text-foreground hover:bg-muted/80 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden md:inline text-sm text-muted-foreground/50 font-medium">
            Sort
          </span>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="h-12 w-[180px] rounded-xl border-border/50 bg-card shadow-sm focus:ring-1 focus:ring-primary/20 focus:ring-offset-0 text-sm font-medium">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border/50">
              <SelectItem value="newest" className="rounded-lg text-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  Newest first
                </div>
              </SelectItem>
              <SelectItem value="oldest" className="rounded-lg text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  Oldest first
                </div>
              </SelectItem>
              <SelectItem value="price-low" className="rounded-lg text-sm">
                <div className="flex items-center gap-2">
                  <ArrowUp className="h-3.5 w-3.5" />
                  Price: Low to High
                </div>
              </SelectItem>
              <SelectItem value="price-high" className="rounded-lg text-sm">
                <div className="flex items-center gap-2">
                  <ArrowDown className="h-3.5 w-3.5" />
                  Price: High to Low
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Separator
            orientation="vertical"
            className="h-7 hidden sm:block mx-1"
          />

          <div className="flex items-center rounded-xl border border-border/50 bg-card p-0.5 shadow-sm">
            <Toggle
              pressed={viewMode === "grid"}
              onPressedChange={() => setViewMode("grid")}
              aria-label="Grid view"
              className="h-9 w-9 rounded-lg data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              <LayoutGrid className="h-4 w-4" />
            </Toggle>
            <Toggle
              pressed={viewMode === "list"}
              onPressedChange={() => setViewMode("list")}
              aria-label="List view"
              className="h-9 w-9 rounded-lg data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              <List className="h-4 w-4" />
            </Toggle>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
        <Badge
          variant="outline"
          className="rounded-full px-3.5 py-1 text-[11px] font-semibold bg-primary/5 border-primary/20 text-primary"
        >
          {filteredCount} of {totalCars} vehicles
        </Badge>
        {searchQuery && (
          <span className="text-muted-foreground/50 text-xs">
            Searching for{" "}
            <span className="font-medium text-foreground bg-muted px-2 py-0.5 rounded-md">
              &quot;{searchQuery}&quot;
            </span>
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */

interface SalesCarListProps {
  result: SaleCarsResult;
}

export function SalesCarList({ result }: SalesCarListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const cars = useMemo(() => result.data ?? [], [result.data]);
  const totalCount = result.count ?? cars.length;

  const filteredCars = useMemo(() => {
    let filtered = [...cars];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (car) =>
          car.title.toLowerCase().includes(q) ||
          car.brand.toLowerCase().includes(q) ||
          car.model.toLowerCase().includes(q) ||
          car.year.toString().includes(q) ||
          (car.seo?.metaDescription?.toLowerCase().includes(q) ?? false),
      );
    }

    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => b.year - a.year);
        break;
      case "oldest":
        filtered.sort((a, b) => a.year - b.year);
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    return filtered;
  }, [cars, searchQuery, sortBy]);

  if (!result.success) {
    return <ErrorState error={result.error} />;
  }

  if (cars.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="py-10 lg:py-16">
      <div className="mx-auto w-[min(1400px,92%)]">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="show"
          className="mb-10 text-center"
        >
          <Badge
            variant="secondary"
            className="mb-4 rounded-full bg-primary/8 px-5 py-2 text-sm font-semibold text-primary hover:bg-primary/8 border-0"
          >
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            {totalCount} Premium Vehicles
          </Badge>

          <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl xl:text-5xl">
            Cars for Sale
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-base text-muted-foreground/70">
            Hand-picked, inspected, and ready to drive. Find your perfect match.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <SearchFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalCars={totalCount}
          filteredCount={filteredCars.length}
        />

        {/* Grid View */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" && (
            <motion.div
              key="grid-view"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredCars.map((car, index) => (
                <GridCarCard key={`grid-${car.id}`} car={car} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* List View */}
        <AnimatePresence mode="wait">
          {viewMode === "list" && (
            <motion.div
              key="list-view"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="flex flex-col gap-4"
            >
              {filteredCars.map((car, index) => (
                <ListCarCard key={`list-${car.id}`} car={car} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty */}
        {filteredCars.length === 0 && searchQuery && (
          <EmptyState
            searchQuery={searchQuery}
            onClear={() => setSearchQuery("")}
          />
        )}

        {/* View All */}
        {totalCount > 8 && filteredCars.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-14 text-center"
          >
            <Button
              variant="outline"
              size="lg"
              className="group rounded-full border-2 px-10 py-6 text-sm font-semibold transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/20"
            >
              View All {totalCount} Cars
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   LOADING SKELETON
   ───────────────────────────────────────────── */

export function SalesCarListSkeleton() {
  return (
    <section className="py-10 lg:py-16">
      <div className="mx-auto w-[min(1400px,92%)]">
        <div className="mb-10 text-center space-y-3">
          <Skeleton className="mx-auto h-8 w-40 rounded-full" />
          <Skeleton className="mx-auto h-12 w-64 rounded-xl" />
          <Skeleton className="mx-auto h-5 w-96 rounded-lg" />
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex gap-3">
            <Skeleton className="h-12 flex-1 max-w-2xl rounded-xl" />
            <Skeleton className="h-12 w-[280px] rounded-xl" />
          </div>
          <Skeleton className="h-5 w-32 rounded-full" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card
              key={`skeleton-${i}`}
              className="overflow-hidden border-border/40 rounded-2xl"
            >
              <Skeleton className="aspect-4/3 w-full" />
              <CardContent className="space-y-3 p-5">
                <Skeleton className="h-3 w-16 rounded-lg" />
                <Skeleton className="h-14 w-full rounded-xl" />
                <Skeleton className="h-4 w-28 rounded-lg" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
