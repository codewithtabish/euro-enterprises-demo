"use client";
import React from "react";

export default function TeamHeader() {
  return (
    <div className="text-center mb-0 md:mb-16">
      <div className="inline-flex items-center gap-2 mb-4">
        <div className="h-px w-8 bg-amber-500" />
        <span className="text-amber-600 dark:text-amber-400 font-medium tracking-[3px] text-sm">
          EURO ENTERPRISES
        </span>
        <div className="h-px w-8 bg-amber-500" />
      </div>
      
      <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white relative inline-block">
        Our Dream Team
        {/* Elegant Underline */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-[3px] w-28 bg-linear-to-r from-transparent via-amber-500 to-transparent" />
      </h2>

      <p className="mt-6 text-zinc-600 dark:text-zinc-400 max-w-md mx-auto text-lg">
        The passionate people driving Euro Enterprises forward
      </p>
    </div>
  );
}