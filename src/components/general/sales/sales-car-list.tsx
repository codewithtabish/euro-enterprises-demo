"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Eye,
  Heart,
  ArrowRight,
  Search,
  SlidersHorizontal,
  X,
  Car,
  AlertCircle,
  Sparkles,
  Calendar,
  ArrowUp,
  ArrowDown,
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

/* ─────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────── */

interface CarData {
  id: string;
  slug: string;
  coverImage: string;
  brand: string;
  model: string;
  year: number;
  title: string;
  price: number;
  currency: string;
  views: number;
  isAvailable: boolean;
  _count?: { bookmarks?: number };
}

interface SaleCarsResult {
  success: boolean;
  data?: CarData[];
  count?: number;
  error?: string;
}

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS (Fixed ease type)
   ───────────────────────────────────────────── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -15,
    scale: 0.95,
    transition: { duration: 0.25, ease: "easeIn" },
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
  hidden: { opacity: 0, y: -10, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: 0.2, ease: "easeOut" },
  },
};

/* ─────────────────────────────────────────────
   ERROR STATE
   ───────────────────────────────────────────── */

function ErrorState({ error }: { error?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20 lg:py-32"
    >
      <div className="mx-auto w-[min(1200px,92%)]">
        <Card className="border-destructive/20 overflow-hidden">
          <CardContent className="flex min-h-[400px] flex-col items-center justify-center gap-5 p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1,
              }}
              className="rounded-full bg-destructive/10 p-5"
            >
              <AlertCircle className="h-10 w-10 text-destructive" />
            </motion.div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-destructive">
                Failed to load cars
              </h3>
              <p className="text-sm text-muted-foreground">
                {error || "Please try again later."}
              </p>
            </div>
            <Button
              variant="outline"
              size="default"
              onClick={() => window.location.reload()}
              className="mt-2 rounded-full px-6"
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20 lg:py-32"
    >
      <div className="mx-auto w-[min(1200px,92%)]">
        <Card className="border-dashed border-muted-foreground/20">
          <CardContent className="flex min-h-[400px] flex-col items-center justify-center gap-5 p-12 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="rounded-full bg-muted p-6"
            >
              <Car className="h-12 w-12 text-muted-foreground/60" />
            </motion.div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                {searchQuery ? "No matches found" : "No cars available"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                {searchQuery
                  ? `No cars match "${searchQuery}". Try a different search term.`
                  : "Check back later for new listings."}
              </p>
            </div>
            {searchQuery && onClear && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClear}
                className="mt-1 rounded-full"
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
   CAR CARD
   ───────────────────────────────────────────── */

function CarCard({ car, index }: { car: CarData; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

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
      <Link href={`/cars-for-sale/${car.slug}`} className="block h-full">
        <Card className="group relative flex h-full flex-col overflow-hidden border-border/40 bg-card transition-all duration-500 hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/[0.07] pt-0 dark:hover:shadow-primary/[0.12] hover:-translate-y-1">
          {/* ── Image ── */}
          <div className="relative aspect-4/3 overflow-hidden bg-muted">
            <Image
              src={car.coverImage}
              alt={`${car.brand} ${car.model}`}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 4}
            />

            {/* Gradient overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.35 }}
            />

            {/* Sold Badge */}
            <AnimatePresence>
              {!car.isAvailable && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                >
                  <Badge
                    variant="destructive"
                    className="px-6 py-2.5 text-sm font-bold shadow-2xl tracking-wide"
                  >
                    SOLD
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Year Badge - Top Left */}
            <motion.div
              className="absolute left-3 top-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <Badge
                variant="secondary"
                className="bg-black/50 text-white backdrop-blur-xl border-0 hover:bg-black/50 text-xs font-semibold px-3 py-1"
              >
                {car.year}
              </Badge>
            </motion.div>

            {/* Price Badge - Bottom Right */}
            <motion.div
              className="absolute bottom-3 right-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + index * 0.05 }}
            >
              <Badge
                variant="secondary"
                className="bg-background/95 text-foreground backdrop-blur-xl border-0 shadow-xl hover:bg-background/95 text-sm font-bold px-4 py-2"
              >
                {car.currency} {car.price.toLocaleString()}
              </Badge>
            </motion.div>

            {/* Hover CTA Button */}
            <AnimatePresence>
              {isHovered && car.isAvailable && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Button
                    size="default"
                    className="gap-2.5 rounded-full bg-background/95 text-foreground shadow-2xl backdrop-blur-xl border border-border/20 hover:bg-background px-6 py-3 text-sm font-semibold"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Content ── */}
          <CardContent className="flex flex-1 flex-col justify-between px-2">
            <div>
              <motion.p
                className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                {car.brand}
              </motion.p>
              <h3 className="mt-1.5 text-lg font-bold leading-snug text-foreground truncate">
                {car.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground font-medium">
                {car.model}
              </p>
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
  totalCars,
  filteredCount,
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
  totalCars: number;
  filteredCount: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Auto-focus on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleClear = useCallback(() => {
    setSearchQuery("");
    inputRef.current?.focus();
  }, [setSearchQuery]);

  return (
    <motion.div
      variants={searchBarVariants}
      initial="hidden"
      animate="show"
      className="mb-10 space-y-5"
    >
      {/* ── Main Search Row ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input - Takes most space */}
        <motion.div
          className="relative flex-1 max-w-2xl"
          animate={{
            scale: isFocused ? 1.01 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <div
            className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
              isFocused
                ? "bg-primary/5 shadow-lg shadow-primary/10"
                : "bg-transparent"
            }`}
          />
          <div className="relative flex items-center">
            <Search
              className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors duration-300 ${
                isFocused ? "text-primary" : "text-muted-foreground/50"
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
              className="h-14 pl-12 pr-12 rounded-2xl border-border/50 bg-card text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0 focus-visible:border-primary/30 text-base shadow-sm transition-all duration-300"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.15 }}
                  onClick={handleClear}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted-foreground/60 hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Filter Dropdown - Right Side */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="font-medium">Sort</span>
          </div>
          <Select
            value={sortBy}
            //   @ts-ignore
            onValueChange={setSortBy}
          >
            <SelectTrigger className="h-14 w-[200px] rounded-2xl border-border/50 bg-card shadow-sm focus:ring-2 focus:ring-primary/20 focus:ring-offset-0 text-sm font-medium">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border/50">
              <SelectItem value="newest" className="rounded-lg">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  Newest first
                </div>
              </SelectItem>
              <SelectItem value="oldest" className="rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  Oldest first
                </div>
              </SelectItem>
              <SelectItem value="price-low" className="rounded-lg">
                <div className="flex items-center gap-2">
                  <ArrowUp className="h-3.5 w-3.5" />
                  Price: Low to High
                </div>
              </SelectItem>
              <SelectItem value="price-high" className="rounded-lg">
                <div className="flex items-center gap-2">
                  <ArrowDown className="h-3.5 w-3.5" />
                  Price: High to Low
                </div>
              </SelectItem>
              <SelectItem value="views" className="rounded-lg">
                <div className="flex items-center gap-2">
                  <Eye className="h-3.5 w-3.5" />
                  Most viewed
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Results Bar ── */}
      <motion.div
        className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
        layout
      >
        <Badge
          variant="outline"
          className="rounded-full px-3.5 py-1 text-xs font-semibold bg-primary/5 border-primary/20 text-primary"
        >
          {filteredCount} of {totalCars} cars
        </Badge>
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <span className="text-border">|</span>
            <span>
              Searching for{" "}
              <span className="font-semibold text-foreground bg-muted px-2 py-0.5 rounded-md">
                &quot;{searchQuery}&quot;
              </span>
            </span>
            <button
              onClick={handleClear}
              className="ml-1 text-muted-foreground/60 hover:text-destructive transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT (Fixed: hooks always called)
   ───────────────────────────────────────────── */

interface SalesCarListProps {
  result: SaleCarsResult;
}

export function SalesCarList({ result }: SalesCarListProps) {
  // ALL HOOKS must be called unconditionally at the top
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Extract data (safe even if result is bad)
  const cars = result.data ?? [];
  const totalCount = result.count ?? cars.length;

  // Filter + Sort - always called, works on empty array if error
  const filteredCars = useMemo(() => {
    let filtered = [...cars];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (car) =>
          car.title.toLowerCase().includes(q) ||
          car.brand.toLowerCase().includes(q) ||
          car.model.toLowerCase().includes(q) ||
          car.year.toString().includes(q),
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
      case "views":
        filtered.sort((a, b) => b.views - a.views);
        break;
    }

    return filtered;
  }, [cars, searchQuery, sortBy]);

  // NOW check for error (after all hooks)
  if (!result.success) {
    return <ErrorState error={result.error} />;
  }

  // Check empty state (after all hooks)
  if (cars.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto w-[min(1400px,92%)]">
        {/* ── Header ── */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="show"
          className="mb-12 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Badge
              variant="secondary"
              className="mb-5 rounded-full bg-primary/10 px-5 py-2 text-sm font-semibold text-primary hover:bg-primary/10 border-0"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              {totalCount} Vehicles Available
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl xl:text-6xl"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            Cars for Sale
          </motion.h1>

          <motion.p
            className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            Premium vehicles, inspected and verified.
          </motion.p>
        </motion.div>

        {/* ── Search & Filter Bar ── */}
        <SearchFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalCars={totalCount}
          filteredCount={filteredCars.length}
        />

        {/* ── Grid ── */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredCars.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Empty after filter ── */}
        {filteredCars.length === 0 && searchQuery && (
          <EmptyState
            searchQuery={searchQuery}
            onClear={() => setSearchQuery("")}
          />
        )}

        {/* ── View All ── */}
        {totalCount > 8 && filteredCars.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14 text-center"
          >
            <Button
              variant="outline"
              size="lg"
              className="group rounded-full border-2 px-10 py-6 text-sm font-semibold transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/20"
            >
              View All {totalCount} Cars
              <ArrowRight className="ml-2.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
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
    <section className="py-12 lg:py-20">
      <div className="mx-auto w-[min(1400px,92%)]">
        {/* Header Skeleton */}
        <div className="mb-12 text-center space-y-4">
          <Skeleton className="mx-auto h-8 w-40 rounded-full" />
          <Skeleton className="mx-auto h-14 w-72 rounded-xl" />
          <Skeleton className="mx-auto h-6 w-96 rounded-lg" />
        </div>

        {/* Search Bar Skeleton */}
        <div className="mb-10 space-y-5">
          <div className="flex gap-4">
            <Skeleton className="h-14 flex-1 max-w-2xl rounded-2xl" />
            <Skeleton className="h-14 w-[200px] rounded-2xl" />
          </div>
          <Skeleton className="h-6 w-32 rounded-full" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden border-border/40">
              <Skeleton className="aspect-4/3 w-full" />
              <CardContent className="space-y-3.5 p-5">
                <Skeleton className="h-3.5 w-16 rounded-md" />
                <Skeleton className="h-7 w-full rounded-lg" />
                <Skeleton className="h-4 w-28 rounded-md" />
                <div className="pt-2">
                  <Skeleton className="h-4 w-full rounded-md" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
