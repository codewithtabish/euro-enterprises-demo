"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Send, CheckCircle2, ArrowRight, Loader2, Mail, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { sendContactEmail } from "@/app/actions/send-email";

// ─── Zod Validation Schema ──────────────────────────────────────
const contactSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters, spaces, hyphens and apostrophes"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters, spaces, hyphens and apostrophes"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

type FieldErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
};

export default function ContactFormComp() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateField = (field: keyof ContactFormData, value: string) => {
    const fieldSchema = contactSchema.shape[field];
    const result = fieldSchema.safeParse(value);

    if (!result.success) {
      // SAFE error extraction - handle all Zod error formats
      const errorMessage = result.error?.issues?.[0]?.message 
        // || result.error?.errors?.[0]?.message 
        || "Invalid input";

      setErrors((prev) => ({ ...prev, [field]: errorMessage }));
      return false;
    }

    setErrors((prev) => ({ ...prev, [field]: undefined }));
    return true;
  };

  const handleBlur = (field: keyof ContactFormData) => {
    setFocusedField(null);
    validateField(field, formData[field]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: FieldErrors = {};

      // SAFE error extraction for form submission
      // ZodError has `issues`; avoid using non-existent `errors` property
      const issues = result.error?.issues || [];

      issues.forEach((issue) => {
        const field = issue.path[0] as keyof FieldErrors;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });

      setErrors(fieldErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await sendContactEmail({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      if (response.success) {
        setIsSubmitted(true);
        toast.success("Message sent! We'll get back to you within 2 hours.");
      } else {
        toast.error(response.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const getInputClass = (fieldName: string) => {
    const baseClass = `bg-background/50 text-foreground placeholder:text-muted-foreground/50 
      h-12 rounded-xl transition-all duration-300`;

    if (errors[fieldName as keyof FieldErrors]) {
      return `${baseClass} border-red-500/60 focus:border-red-500 focus:ring-red-500/20`;
    }
    return `${baseClass} border-border/60 focus:border-primary/50 focus:ring-primary/20`;
  };

  return (
    <Card className="border-border/60 bg-card/50 backdrop-blur-xl overflow-hidden">
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
              Fill out the form and we&apos;ll respond within 2 hours
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
              className="space-y-5"
              noValidate
            >
              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-foreground/80 text-sm font-medium flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                    First Name
                  </Label>
                  <motion.div
                    animate={{ scale: focusedField === "firstName" ? 1.01 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      onFocus={() => setFocusedField("firstName")}
                      onBlur={() => handleBlur("firstName")}
                      className={getInputClass("firstName")}
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    />
                  </motion.div>
                  <AnimatePresence>
                    {errors.firstName && (
                      <motion.p
                        id="firstName-error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-xs text-red-500 font-medium"
                      >
                        {errors.firstName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-foreground/80 text-sm font-medium flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                    Last Name
                  </Label>
                  <motion.div
                    animate={{ scale: focusedField === "lastName" ? 1.01 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      onFocus={() => setFocusedField("lastName")}
                      onBlur={() => handleBlur("lastName")}
                      className={getInputClass("lastName")}
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? "lastName-error" : undefined}
                    />
                  </motion.div>
                  <AnimatePresence>
                    {errors.lastName && (
                      <motion.p
                        id="lastName-error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-xs text-red-500 font-medium"
                      >
                        {errors.lastName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground/80 text-sm font-medium flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                  Email Address
                </Label>
                <motion.div
                  animate={{ scale: focusedField === "email" ? 1.01 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => handleBlur("email")}
                    className={getInputClass("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                </motion.div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      id="email-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-xs text-red-500 font-medium"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="message" className="text-foreground/80 text-sm font-medium flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                    Your Message
                  </Label>
                  <span className={`text-xs ${formData.message.length > 4500 ? 'text-red-400' : 'text-muted-foreground'}`}>
                    {formData.message.length}/5000
                  </span>
                </div>
                <motion.div
                  animate={{ scale: focusedField === "message" ? 1.005 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your dream car, service needs, or any questions you have..."
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => handleBlur("message")}
                    rows={5}
                    className={`bg-background/50 text-foreground placeholder:text-muted-foreground/50 
                      rounded-xl resize-none transition-all duration-300
                      ${errors.message 
                        ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-border/60 focus:border-primary/50 focus:ring-primary/20'
                      }`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                </motion.div>
                <AnimatePresence>
                  {errors.message && (
                    <motion.p
                      id="message-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-xs text-red-500 font-medium"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="pt-2"
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
                      <Mail className="w-5 h-5" />
                      Send Message
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}