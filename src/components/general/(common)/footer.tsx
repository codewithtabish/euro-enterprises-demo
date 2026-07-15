"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Download, FileText, QrCode } from "lucide-react";

const Footer = () => {
  return (
    <footer className={'relative overflow-hidden border-t border-border bg-background'}>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">

          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="EURO ENTERPRISES"
                width={386}
                height={386}
                style={{ height: "48px", width: "auto" }}
                className="object-contain"
                priority
              />
            </div>

            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Redefining luxury transportation with unparalleled elegance, 
              safety, and personalized service.
            </p>

            <div className="flex gap-6 text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="hover:text-primary transition-colors">Facebook</a>
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            </div>
          </div>

          {/* Navigation Links - Company */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-lg mb-6 text-foreground">Company</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/fleet" className="hover:text-primary transition-colors">Our Fleet</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-lg mb-6 text-foreground">Support</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/booking" className="hover:text-primary transition-colors">Book Now</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-lg mb-6 text-foreground">Legal</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Resources - NEW COLUMN */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-lg mb-6 text-foreground">Resources</h4>
            <ul className="space-y-4 text-muted-foreground">
              {/* Download Proposal */}
              <li>
                <a 
                  href="/docs/proposal.pdf" 
  download="proposal.pdf"
                  className="inline-flex items-center gap-2 hover:text-primary transition-colors group"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Proposal</span>
                  <Download className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <a
  href="https://drive.google.com/uc?export=download&id=1p_PNvt0Sxe_KbB9zEVHwMpf8QwpRnHee"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 hover:text-primary transition-colors group"
>
  Download Proposal Online
</a>



              {/* QR Code Section */}
              <li className="pt-2">
                <div className="inline-flex flex-col items-start gap-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <QrCode className="w-3.5 h-3.5" />
                    Scan to Visit
                  </span>

                 
                  <span className="text-[10px] text-muted-foreground/60">
                    Scan with your phone camera
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 Euro Enterprises. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>

          <p className="text-xs">Karachi, Pakistan</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;