"use client";

import { ShieldCheck, SearchCheck, Wrench, BadgeCheck } from "lucide-react";

const services = [
  {
    icon: SearchCheck,
    title: "Comprehensive Vehicle Inspection",
    description:
      "Our certified inspectors perform a complete multi-point inspection, covering the engine, transmission, suspension, brakes, tires, and electrical systems."
  },
  {
    icon: Wrench,
    title: "Mechanical & Diagnostic Checks",
    description:
      "Using advanced diagnostic equipment, we identify hidden mechanical issues before you buy or sell your vehicle."
  },
  {
    icon: ShieldCheck,
    title: "Accident & Damage Assessment",
    description:
      "We inspect the vehicle for previous accidents, repaints, structural repairs, flood damage, and overall body condition."
  },
  {
    icon: BadgeCheck,
    title: "Detailed Inspection Report",
    description:
      "Receive a professional inspection report with photos, expert recommendations, and the overall condition of the vehicle."
  }
];

export default function CarInspectionSection() {
  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6">

        {/* Header */}

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-amber-500" />
            <span className="text-sm tracking-[3px] font-medium uppercase text-amber-500">
              EURO ENTERPRISES
            </span>
            <div className="w-8 h-px bg-amber-500" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Car Inspection Services
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-8">
            Buy your next vehicle with confidence. Our experienced inspectors
            provide detailed reports that help you make informed decisions before
            purchasing or selling any car.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-amber-500/40 hover:shadow-2xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 transition group-hover:bg-amber-500 group-hover:text-white">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mb-3 text-2xl font-semibold text-zinc-900 dark:text-white">
                  {service.title}
                </h3>

                <p className="leading-7 text-zinc-600 dark:text-zinc-400">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}