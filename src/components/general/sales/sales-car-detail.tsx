"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  Palette,
  Shield,
  Eye,
  Share2,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
  User,
  CheckCircle2,
  Zap,
  MapPin,
  Clock,
  Check,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { SalesCarPreview } from "./sales-car-previewer";
import { BlogPreviewer } from "@/components/dashboard/blogs/create-blog/blog-previewer";

/* ─────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────── */

interface CarImage {
  id: string;
  url: string;
  alt: string | null;
}

interface SaleCarSEO {
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

export interface SaleCarDetailData {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  mileage: number | null;
  fuelType: string | null;
  transmission: string | null;
  engine: string | null;
  color: string | null;
  registration: string | null;
  description: unknown;
  images: CarImage[];
  seo: SaleCarSEO | null;
  isAvailable: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

/* ─────────────────────────────────────────────
   UTILITY
   ───────────────────────────────────────────── */

function formatPrice(price: number, currency: string): string {
  return `${currency} ${price.toLocaleString()}`;
}

/* ─────────────────────────────────────────────
   IMAGE LIGHTBOX
   ───────────────────────────────────────────── */

function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: {
  images: { url: string; alt: string | null }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].alt || "Car image"}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   INQUIRY MODAL
   ───────────────────────────────────────────── */

function InquiryModal({
  car,
  isOpen,
  onClose,
}: {
  car: SaleCarDetailData;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-2xl border-border/40">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {submitted ? "Inquiry Sent!" : "Interested in this car?"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {car.year} {car.brand} {car.model} —{" "}
            {formatPrice(car.price, car.currency)}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Check className="h-8 w-8 text-emerald-500" />
            </div>
            <p className="text-center text-muted-foreground">
              We&apos;ll contact you soon with more details.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="pl-10 rounded-xl h-11"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="pl-10 rounded-xl h-11"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10 rounded-xl h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="I'm interested in this car. Please contact me with more details."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="min-h-[100px] rounded-xl resize-none"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              Your information is secure and will not be shared.
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 rounded-xl h-11"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-xl gap-2 h-11"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-4 w-4" />
                    Send Inquiry
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ─────────────────────────────────────────────
   SPEC CARD
   ───────────────────────────────────────────── */

function SpecCard({
  icon,
  label,
  value,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
  delay?: number;
}) {
  if (!value) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border/30 hover:border-primary/20 hover:bg-muted/80 transition-all duration-300"
    >
      <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
          {label}
        </p>
        <p className="text-sm font-semibold text-foreground truncate">
          {value}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN DETAIL COMPONENT
   ───────────────────────────────────────────── */

export function SalesCarDetail({ car }: { car: SaleCarDetailData }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const allImages = [
    { url: car.coverImage, alt: `${car.brand} ${car.model} cover` },
    ...car.images.filter((img) => img.url !== car.coverImage),
  ];

  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length,
    );
  }, [allImages.length]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${car.year} ${car.brand} ${car.model}`,
          text: `Check out this ${car.year} ${car.brand} ${car.model} for ${formatPrice(car.price, car.currency)}`,
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <main className="min-h-screen bg-background">
      {/* ── Top Bar ── */}
      <div className="mx-auto w-[min(1400px,92%)] pt-6 pb-4">
        <div className="flex items-center justify-between">
          <Link
            href="/cars/sales"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to listings
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="rounded-full gap-2"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLike}
              className={`rounded-full gap-2 transition-colors ${
                isLiked
                  ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                  : ""
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              <span className="hidden sm:inline">
                {isLiked ? "Saved" : "Save"}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* ── Hero Gallery ── */}
      <section className="mx-auto w-[min(1400px,92%)] mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Main large image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 relative aspect-[16/10] lg:aspect-auto lg:min-h-[480px] rounded-2xl overflow-hidden cursor-pointer group bg-muted"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={allImages[0].url}
              alt={allImages[0].alt || `${car.brand} ${car.model}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {!car.isAvailable && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <Badge
                  variant="destructive"
                  className="px-8 py-3 text-lg font-bold tracking-wider"
                >
                  SOLD
                </Badge>
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Badge className="bg-white/20 backdrop-blur-xl text-white border-0 px-3 py-1.5 text-xs">
                <Eye className="h-3.5 w-3.5 mr-1.5" />
                Click to view gallery
              </Badge>
            </div>
          </motion.div>

          {/* Side thumbnails */}
          <div className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-3">
            {allImages.slice(1, 3).map((img, i) => (
              <motion.div
                key={img.id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[156px] rounded-2xl overflow-hidden cursor-pointer group bg-muted"
                onClick={() => openLightbox(i + 1)}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `${car.brand} ${car.model}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 33vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              </motion.div>
            ))}

            {allImages.length > 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[156px] rounded-2xl overflow-hidden cursor-pointer group bg-muted"
                onClick={() => openLightbox(3)}
              >
                <Image
                  src={allImages[3].url}
                  alt="More images"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 33vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-bold text-sm lg:text-lg">
                    +{allImages.length - 3} more
                  </span>
                </div>
              </motion.div>
            )}

            {/* Fill empty slots if less than 3 side images */}
            {allImages.length <= 3 &&
              Array.from({ length: 3 - (allImages.length - 1) }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="hidden lg:block relative aspect-[4/3] lg:aspect-auto lg:min-h-[156px] rounded-2xl bg-muted/50 border border-dashed border-border/30"
                />
              ))}
          </div>
        </div>
      </section>

      <BlogPreviewer content={car.description} />
    </main>
  );
}
