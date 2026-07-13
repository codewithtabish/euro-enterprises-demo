'use client';

import { Instrument_Serif } from "next/font/google";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Image from 'next/image';
import { SignInButton, Show } from "@clerk/nextjs";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});

export type AvatarList = {
  image: string;
};

type HeroSectionProps = {
  avatarList: AvatarList[];
};

export default function HeroSection({ avatarList }: HeroSectionProps) {
  return (
    <section className="pt-20 pb-20 md:pb-28 relative overflow-hidden">
      {/* Beautiful Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto gap-12">

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] tracking-tighter">
              Drive with confidence.<br />
              <span className={`${instrumentSerif.className} text-primary`}>
                Rent smart. Inspect better.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Premium car rentals and professional vehicle inspections across Europe.
            </p>
          </motion.div>

          {/* CTA Button - Triggers Clerk Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <Show when="signed-out">
              <SignInButton mode="modal" 
              >
                <Button 
                  size="lg" 
                  className="relative text-lg font-semibold rounded-2xl h-16 px-12 group overflow-hidden shadow-xl shadow-primary/20 hover:shadow-2xl transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Rent and sale car
                    <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300 h-6 w-6" />
                  </span>
                </Button>
              </SignInButton>
            </Show>

            <Show when="signed-in">
              <Button 
                size="lg" 
                className="relative text-lg font-semibold rounded-2xl h-16 px-12 group overflow-hidden shadow-xl shadow-primary/20 hover:shadow-2xl transition-all duration-300"
                onClick={() => window.location.href = '/cars/rental'}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Browse Cars
                  <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300 h-6 w-6" />
                </span>
              </Button>
            </Show>
          </motion.div>

          {/* Trust Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex -space-x-4">
              {avatarList.slice(0, 6).map((avatar, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-full overflow-hidden border-[3px] border-background shadow-lg ring-1 ring-border/60"
                >
                  <Image
                    src={avatar.image}
                    alt={`Happy driver ${index + 1}`}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-1 text-center">
              <div className="flex gap-1 text-2xl">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-amber-500">★</span>
                ))}
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Trusted by <span className="font-semibold text-foreground">12,000+</span> satisfied drivers
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}