"use client";

import { Award } from "lucide-react";

export default function WhyChooseUsHeader() {
  return (
    <div className="mb-16 text-center">
      <div className="inline-flex items-center gap-2 mb-4">
        <div className="h-px w-8 bg-amber-500" />

        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-amber-500" />

          <span className="text-amber-600 dark:text-amber-400 font-medium tracking-[3px] text-sm uppercase">
            EURO ENTERPRISES
          </span>
        </div>

        <div className="h-px w-8 bg-amber-500" />
      </div>

      <h2 className="relative inline-block text-5xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white">
        Why Choose Us?

        <div className="absolute -bottom-3 left-1/2 h-[3px] w-28 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
        At Euro Enterprises, we combine premium vehicles, professional
        inspections, transparent pricing, and exceptional customer service to
        deliver a rental experience you can trust.
      </p>
    </div>
  );
}