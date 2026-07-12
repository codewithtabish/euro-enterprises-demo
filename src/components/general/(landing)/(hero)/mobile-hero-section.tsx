'use client';

import { Instrument_Serif } from "next/font/google";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Image from 'next/image';

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

function HeroSectionMobile({ avatarList }: HeroSectionProps) {
  return (
    <section className="pt-20 pb-16 md:pb-20"> {/* Top padding to avoid header overlap */}
      <div className="relative w-full">
        {/* Subtle & Beautiful Gradient Background */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-white via-zinc-50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 -z-10" /> */}

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-10">
            
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="space-y-5"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight tracking-tighter">
                Drive with confidence.<br />
                <span className={`${instrumentSerif.className} text-primary/90`}>
                  Rent smart. Inspect better.
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Premium car rentals and professional vehicle inspections across Europe.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              <Button 
                size="lg" 
                className="relative text-base font-medium rounded-full h-14 px-10 group overflow-hidden shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" />
                </span>
              </Button>
            </motion.div>

            {/* Avatar List + Trust */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="flex flex-col items-center gap-5"
            >
              <div className="flex -space-x-4">
                {avatarList.slice(0, 6).map((avatar, index) => (
                  <div
                    key={index}
                    className="w-11 h-11 rounded-full overflow-hidden border-[3px] border-background shadow-md ring-1 ring-border/50"
                  >
                    <Image
                      src={avatar.image}
                      alt={`Happy driver ${index + 1}`}
                      width={44}
                      height={44}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-amber-500">★</span>
                  ))}
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  Trusted by 12,000+ satisfied drivers
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSectionMobile;