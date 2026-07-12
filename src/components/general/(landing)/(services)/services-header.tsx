"use client";

import React from "react";

export default function ServicesHeader() {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 mb-4">
        <div className="h-px w-8 bg-primary" />
        <span className="text-primary font-medium tracking-[3px] text-sm">
          EURO ENTERPRISES
        </span>
        <div className="h-px w-8 bg-primary" />
      </div>

      <h2 className="relative inline-block text-5xl md:text-6xl font-bold tracking-tighter ">
        Our Signature Services

        {/* Elegant Underline */}
        <div className="absolute -bottom-3 left-1/2 h-[3px] w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </h2>
    </div>
  );
}