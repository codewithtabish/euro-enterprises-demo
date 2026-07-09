"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import GradientDotMesh from "@/components/pixel-perfect/gradient-dot-mesh";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      {/* Gradient Dot Background */}
      <GradientDotMesh />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-black dark:bg-white rounded-2xl flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-3xl">E</span>
              </div>
              <div>
                <span className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">EURO</span>
                <span className="text-3xl font-light text-zinc-700 dark:text-zinc-400">ENTERPRISES</span>
              </div>
            </div>

            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md">
              Redefining luxury transportation with unparalleled elegance, 
              safety, and personalized service.
            </p>

            <div className="mt-8 flex gap-6 text-zinc-500 dark:text-zinc-400">
              <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Instagram</a>
              <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Facebook</a>
              <a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">LinkedIn</a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-lg mb-6 text-zinc-900 dark:text-white">Company</h4>
            <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
              <li><Link href="/about" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link href="/fleet" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Our Fleet</Link></li>
              <li><Link href="/services" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Services</Link></li>
              <li><Link href="/careers" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold text-lg mb-6 text-zinc-900 dark:text-white">Support</h4>
            <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
              <li><Link href="/contact" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">FAQs</Link></li>
              <li><Link href="/booking" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Book Now</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold text-lg mb-6 text-zinc-900 dark:text-white">Legal</h4>
            <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
              <li><Link href="/privacy" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
          <p>© 2026 Euro Enterprises. All rights reserved.</p>
          
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms</Link>
          </div>

<p className="text-xs">Karachi, Pakistan</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;