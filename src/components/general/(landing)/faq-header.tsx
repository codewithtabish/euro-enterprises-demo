"use client";

import React from "react";

export default function FaqHeader() {
  return (
    <div className="text-center mb-14 md:mb-16">
      <div className="inline-flex items-center gap-2 mb-4">
        <div className="h-px w-8 bg-amber-500" />
        <span className="text-amber-600 dark:text-amber-400 font-medium tracking-[3px] text-sm uppercase">
          EURO ENTERPRISES
        </span>
        <div className="h-px w-8 bg-amber-500" />
      </div>

      <h2 className="relative inline-block text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">
        Frequently Asked Questions

        <div className="absolute -bottom-3 left-1/2 h-[3px] w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Everything you need to know about renting a vehicle with Euro
        Enterprises. From booking to returns, we&apos;ve got you covered.
      </p>
    </div>
  );
}