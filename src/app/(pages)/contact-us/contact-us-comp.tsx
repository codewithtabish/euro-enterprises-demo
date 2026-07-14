"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Car, 
  Wrench, 
  Shield, 
  ArrowRight,
  MessageSquare,
  ChevronRight,
  Star,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// ─── Contact Info Data ───────────────────────────────────────────
const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Showroom",
    detail: "1234 Auto Boulevard, Motor City, MC 56789",
    sub: "Open for test drives & consultations",
    color: "from-blue-500/20 to-blue-600/5",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Phone,
    title: "Call Us Anytime",
    detail: "+1 (555) 234-5678",
    sub: "24/7 roadside assistance available",
    color: "from-emerald-500/20 to-emerald-600/5",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Mail,
    title: "Email Support",
    detail: "hello@euroenterprises.com",
    sub: "We reply within 2 hours",
    color: "from-amber-500/20 to-amber-600/5",
    borderColor: "border-amber-500/30",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: Clock,
    title: "Business Hours",
    detail: "Mon – Sat: 9:00 AM – 8:00 PM",
    sub: "Sunday: 11:00 AM – 5:00 PM",
    color: "from-rose-500/20 to-rose-600/5",
    borderColor: "border-rose-500/30",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
];

const services = [
  { icon: Car, label: "New & Used Sales", desc: "Premium vehicles" },
  { icon: Wrench, label: "Service Center", desc: "Expert repairs" },
  { icon: Shield, label: "Financing", desc: "Flexible plans" },
  { icon: Star, label: "Trade-Ins", desc: "Best value" },
];

const inquiryTypes = [
  "Vehicle Purchase",
  "Service Appointment",
  "Financing Inquiry",
  "Trade-In Evaluation",
  "General Question",
  "Parts & Accessories",
  "Warranty Claim",
  "Feedback",
];

// ─── Animated Section Wrapper ────────────────────────────────────
function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Floating Particles Background ───────────────────────────────
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-100">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/5 dark:bg-blue-500/10"
          style={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

// ─── Main Contact Page ─────────────────────────────────────────────
export default function ContactUsComp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (field: string, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value ?? "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call with purposeful delay for trust
    await new Promise((resolve) => setTimeout(resolve, 1800));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message sent! We'll get back to you within 2 hours.");
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      inquiryType: "",
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ambient Background — theme adaptive */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background dark:from-blue-900/10 dark:via-background dark:to-background" />
      <FloatingParticles />

      {/* Subtle Grid Pattern */}
      <div 
        className="fixed inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10">
        {/* ═══════════════════════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════════════════════ */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge 
                variant="outline" 
                className="mb-6 px-4 py-1.5 text-sm border-primary/20 bg-primary/5 text-primary backdrop-blur-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                Get in Touch
              </Badge>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
                  Let's Start Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Journey Together
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Whether you're hunting for your dream car, need expert service, 
                or just want to chat about options — we're here, ready to help.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CONTACT CARDS GRID
        ═══════════════════════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {contactInfo.map((item, index) => (
                <AnimatedSection key={item.title} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Card className={`
                      group relative overflow-hidden border ${item.borderColor} 
                      bg-card/50 backdrop-blur-xl
                      hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500
                    `}>
                      <CardContent className="p-6 md:p-8">
                        <div className={`
                          w-12 h-12 rounded-xl bg-background/80 border ${item.borderColor}
                          flex items-center justify-center mb-5
                          group-hover:scale-110 transition-transform duration-300
                        `}>
                          <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-foreground/80 font-medium mb-1">
                          {item.detail}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.sub}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            MAIN CONTENT: FORM + MAP + INFO
        ═══════════════════════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

              {/* ─── LEFT: Contact Form ─── */}
              <div className="lg:col-span-3">
                <AnimatedSection>
                  <Card className="border-border/60 bg-card/50 backdrop-blur-xl overflow-hidden">
                    {/* Form Header */}
                    <div className="px-6 py-6 md:px-8 md:py-8 border-b border-border/40">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <Send className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold text-foreground">
                            Send us a Message
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Fill out the form and we'll respond within 2 hours
                          </p>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6 md:p-8">
                      <AnimatePresence mode="wait">
                        {isSubmitted ? (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center py-12"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                              className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6"
                            >
                              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                            </motion.div>
                            <h3 className="text-2xl font-bold text-foreground mb-3">
                              Message Sent Successfully!
                            </h3>
                            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                              Thanks for reaching out. Our team will review your inquiry 
                              and get back to you within 2 hours during business hours.
                            </p>
                            <Button
                              onClick={resetForm}
                              variant="outline"
                              className="border-border hover:bg-accent hover:text-foreground"
                            >
                              Send Another Message
                            </Button>
                          </motion.div>
                        ) : (
                          <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                          >
                            {/* Name Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                              <div className="space-y-2.5">
                                <Label htmlFor="firstName" className="text-foreground/80 text-sm font-medium">
                                  First Name
                                </Label>
                                <motion.div
                                  animate={{ 
                                    scale: focusedField === "firstName" ? 1.01 : 1,
                                  }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Input
                                    id="firstName"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={(e) => handleChange("firstName", e.target.value)}
                                    onFocus={() => setFocusedField("firstName")}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    className="bg-background/50 border-border/60 text-foreground placeholder:text-muted-foreground/50 
                                      focus:border-primary/50 focus:ring-primary/20 h-12 rounded-xl
                                      transition-all duration-300"
                                  />
                                </motion.div>
                              </div>
                              <div className="space-y-2.5">
                                <Label htmlFor="lastName" className="text-foreground/80 text-sm font-medium">
                                  Last Name
                                </Label>
                                <motion.div
                                  animate={{ 
                                    scale: focusedField === "lastName" ? 1.01 : 1,
                                  }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Input
                                    id="lastName"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={(e) => handleChange("lastName", e.target.value)}
                                    onFocus={() => setFocusedField("lastName")}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    className="bg-background/50 border-border/60 text-foreground placeholder:text-muted-foreground/50 
                                      focus:border-primary/50 focus:ring-primary/20 h-12 rounded-xl
                                      transition-all duration-300"
                                  />
                                </motion.div>
                              </div>
                            </div>

                            {/* Email & Phone Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                              <div className="space-y-2.5">
                                <Label htmlFor="email" className="text-foreground/80 text-sm font-medium">
                                  Email Address
                                </Label>
                                <motion.div
                                  animate={{ 
                                    scale: focusedField === "email" ? 1.01 : 1,
                                  }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    onFocus={() => setFocusedField("email")}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    className="bg-background/50 border-border/60 text-foreground placeholder:text-muted-foreground/50 
                                      focus:border-primary/50 focus:ring-primary/20 h-12 rounded-xl
                                      transition-all duration-300"
                                  />
                                </motion.div>
                              </div>
                              <div className="space-y-2.5">
                                <Label htmlFor="phone" className="text-foreground/80 text-sm font-medium">
                                  Phone Number
                                </Label>
                                <motion.div
                                  animate={{ 
                                    scale: focusedField === "phone" ? 1.01 : 1,
                                  }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    value={formData.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    onFocus={() => setFocusedField("phone")}
                                    onBlur={() => setFocusedField(null)}
                                    className="bg-background/50 border-border/60 text-foreground placeholder:text-muted-foreground/50 
                                      focus:border-primary/50 focus:ring-primary/20 h-12 rounded-xl
                                      transition-all duration-300"
                                  />
                                </motion.div>
                              </div>
                            </div>

                            {/* Inquiry Type */}
                            <div className="space-y-2.5">
                              <Label className="text-foreground/80 text-sm font-medium">
                                Inquiry Type
                              </Label>
                              <Select 
                                value={formData.inquiryType} 
                                onValueChange={(value) => handleChange("inquiryType", value)}
                              >
                                <SelectTrigger className="bg-background/50 border-border/60 text-foreground h-12 rounded-xl 
                                  focus:ring-primary/20 focus:border-primary/50">
                                  <SelectValue placeholder="Select what you need help with" />
                                </SelectTrigger>
                                <SelectContent className="bg-popover border-border text-foreground">
                                  {inquiryTypes.map((type) => (
                                    <SelectItem 
                                      key={type} 
                                      value={type}
                                      className="focus:bg-primary/10 focus:text-foreground"
                                    >
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Message */}
                            <div className="space-y-2.5">
                              <Label htmlFor="message" className="text-foreground/80 text-sm font-medium">
                                Your Message
                              </Label>
                              <motion.div
                                animate={{ 
                                  scale: focusedField === "message" ? 1.005 : 1,
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <Textarea
                                  id="message"
                                  placeholder="Tell us about your dream car, service needs, or any questions you have..."
                                  value={formData.message}
                                  onChange={(e) => handleChange("message", e.target.value)}
                                  onFocus={() => setFocusedField("message")}
                                  onBlur={() => setFocusedField(null)}
                                  required
                                  rows={5}
                                  className="bg-background/50 border-border/60 text-foreground placeholder:text-muted-foreground/50 
                                    focus:border-primary/50 focus:ring-primary/20 rounded-xl resize-none
                                    transition-all duration-300"
                                />
                              </motion.div>
                            </div>

                            {/* Submit Button */}
                            <motion.div
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-14 bg-primary hover:bg-primary/90
                                  text-primary-foreground font-semibold text-base rounded-xl shadow-lg shadow-primary/25
                                  disabled:opacity-70 disabled:cursor-not-allowed
                                  transition-all duration-300"
                              >
                                {isSubmitting ? (
                                  <span className="flex items-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Sending your message...
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-2">
                                    Send Message
                                    <ArrowRight className="w-5 h-5" />
                                  </span>
                                )}
                              </Button>
                            </motion.div>

                            <p className="text-xs text-center text-muted-foreground">
                              By submitting, you agree to our{" "}
                              <Link href="/privacy" className="text-primary hover:text-primary/80 underline underline-offset-2">
                                Privacy Policy
                              </Link>
                              . We never share your data.
                            </p>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </div>

              {/* ─── RIGHT: Map + Quick Services ─── */}
              <div className="lg:col-span-2 space-y-6">
                {/* Map Card */}
                <AnimatedSection delay={0.2}>
                  <Card className="border-border/60 bg-card/50 backdrop-blur-xl overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative h-64 md:h-80 bg-muted/50 overflow-hidden">
                        {/* Stylized Map Placeholder with Grid */}
                        <div className="absolute inset-0 bg-muted/30">
                          <div 
                            className="absolute inset-0 opacity-30 dark:opacity-20"
                            style={{
                              backgroundImage: `linear-gradient(rgba(59,130,246,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.2) 1px, transparent 1px)`,
                              backgroundSize: "40px 40px",
                            }}
                          />
                          {/* Roads */}
                          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                            <path d="M0 150 Q100 140 200 150 T400 150" stroke="rgba(59,130,246,0.3)" strokeWidth="8" fill="none"/>
                            <path d="M200 0 Q210 100 200 150 T200 300" stroke="rgba(59,130,246,0.3)" strokeWidth="8" fill="none"/>
                            <path d="M50 50 Q150 100 200 150" stroke="rgba(59,130,246,0.15)" strokeWidth="4" fill="none"/>
                            <path d="M350 50 Q250 100 200 150" stroke="rgba(59,130,246,0.15)" strokeWidth="4" fill="none"/>
                          </svg>
                          {/* Location Pin */}
                          <motion.div
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <div className="relative">
                              <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-primary" />
                              </div>
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rotate-45" />
                            </div>
                          </motion.div>
                          {/* Pulse Ring */}
                          <motion.div
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-primary/30"
                            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                        {/* Map Overlay Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                              <MapPin className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">Euro Enterprises HQ</p>
                              <p className="text-xs text-muted-foreground">1234 Auto Boulevard, Motor City</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 md:p-6">
                        <Button 
                          variant="outline" 
                          className="w-full border-border/60 hover:bg-accent hover:text-foreground rounded-xl h-11"
                        >
                          <Link 
                            href="https://maps.google.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <MapPin className="w-4 h-4" />
                            Get Directions
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>

                {/* Quick Services */}
                <AnimatedSection delay={0.3}>
                  <Card className="border-border/60 bg-card/50 backdrop-blur-xl">
                    <CardContent className="p-6 md:p-8">
                      <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-primary" />
                        Our Services
                      </h3>
                      <div className="space-y-3">
                        {services.map((service, index) => (
                          <motion.div
                            key={service.label}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ x: 4 }}
                            className="flex items-center gap-4 p-3 rounded-xl bg-background/50 border border-border/40
                              hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-muted border border-border/60 
                              flex items-center justify-center shrink-0
                              group-hover:border-primary/30 group-hover:bg-primary/10 transition-all">
                              <service.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {service.label}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {service.desc}
                              </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>

                {/* Trust Badge */}
                <AnimatedSection delay={0.4}>
                  <Card className="border-border/60 bg-gradient-to-br from-primary/5 to-background backdrop-blur-xl">
                    <CardContent className="p-6 md:p-8 text-center">
                      <div className="flex justify-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                          </motion.div>
                        ))}
                      </div>
                      <p className="text-foreground font-semibold mb-1">4.9/5 Customer Rating</p>
                      <p className="text-sm text-muted-foreground">Based on 2,400+ reviews from happy drivers</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CTA SECTION
        ═══════════════════════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <Card className="relative overflow-hidden border-border/60 bg-gradient-to-br from-primary/5 via-card/80 to-background backdrop-blur-xl">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

                <CardContent className="relative p-8 md:p-12 lg:p-16 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
                      <Car className="w-3.5 h-3.5 mr-1.5" />
                      Ready to Drive?
                    </Badge>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                      Visit Our Showroom Today
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                      Experience our premium collection in person. Schedule a test drive 
                      and feel the difference of Euro Enterprises quality.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          size="lg"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-14 rounded-xl
                            shadow-lg shadow-primary/25"
                        >
                          <Car className="w-5 h-5 mr-2" />
                          Book Test Drive
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          size="lg"
                          variant="outline"
                          className="border-border hover:bg-accent hover:text-foreground font-semibold px-8 h-14 rounded-xl"
                        >
                          <Link href="/inventory">
                            Browse Inventory
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </Link>
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            FOOTER SPACER
        ═══════════════════════════════════════════════════════════ */}
        <div className="h-8" />
      </div>
    </div>
  );
}