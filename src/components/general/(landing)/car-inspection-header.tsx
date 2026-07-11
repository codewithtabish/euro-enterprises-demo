"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

export default function CarInspectionHeader() {
  return (
    <div className="mb-14 text-center">
      {/* Top Label */}
      <div className="mb-4 inline-flex items-center gap-3">
        <div className="h-px w-10 bg-amber-500" />

        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-amber-500" />

          <span className="text-sm font-semibold tracking-[3px] text-amber-600 uppercase dark:text-amber-400">
            EURO ENTERPRISES
          </span>
        </div>

        <div className="h-px w-10 bg-amber-500" />
      </div>

      {/* Main Heading */}
      <h2 className="relative inline-block text-5xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-6xl">
        Car Inspection Services

        <div className="absolute -bottom-4 left-1/2 h-[3px] w-36 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
      </h2>

      {/* Description */}
      <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Every vehicle at <span className="font-semibold">Euro Enterprises</span>{" "}
        undergoes a comprehensive multi-point inspection by certified
        technicians before reaching our customers. From engine diagnostics and
        brake safety checks to exterior quality assessments and digital reports,
        we ensure every car meets the highest standards of safety, reliability,
        and performance.
      </p>

      {/* Stats */}
      <div className="mt-10 flex flex-wrap justify-center gap-8">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-amber-500">100+</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Inspection Points
          </p>
        </div>

        <div className="hidden h-12 w-px bg-zinc-200 dark:bg-zinc-800 md:block" />

        <div className="text-center">
          <h3 className="text-3xl font-bold text-amber-500">Certified</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Expert Technicians
          </p>
        </div>

        <div className="hidden h-12 w-px bg-zinc-200 dark:bg-zinc-800 md:block" />

        <div className="text-center">
          <h3 className="text-3xl font-bold text-amber-500">100%</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Quality Assured
          </p>
        </div>
      </div>
    </div>
  );
}