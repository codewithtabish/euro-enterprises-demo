"use client";

import React from "react";

export default function FeaturedRentalCarsHeader() {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 mb-4">
        <div className="h-px w-8 bg-primary" />
        <span className="text-primary font-medium tracking-[3px] text-sm">
          EURO ENTERPRISES
        </span>
        <div className="h-px w-8 bg-primary" />
      </div>
      
      <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white relative inline-block">
        Featured Rental Cars
        {/* Elegant Underline */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-[3px] w-28 bg-linear-to-r from-transparent via-primary to-transparent" />
      </h2>

      <p className="mt-6 text-zinc-600 dark:text-zinc-400 max-w-md mx-auto text-lg">
        Handpicked premium vehicles for an unforgettable driving experience
      </p>
    </div>
  );
}