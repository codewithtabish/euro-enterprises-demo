"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  animate?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { icon: 24, text: "text-sm" },
  md: { icon: 32, text: "text-base" },
  lg: { icon: 40, text: "text-xl" },
  xl: { icon: 52, text: "text-2xl" },
};

export default function NavBarLogo({
  size = "md",
  showText = true,
  animate = true,
  className = "",
}: LogoProps) {
  const { icon: iconSize, text: textSize } = sizeMap[size];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const hoverVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  const brandName = "EURO ENTERPRISES";
  const letters = brandName.split("");

  // Define special styling for specific letters
  // Italic: E, U, R, O (first 4 letters)
  // Superscript: E, S (last letters of each word)
  const getLetterStyle = (letter: string, index: number) => {
    const styles: string[] = [];
    
    // Italic for first 4 letters (E, U, R, O)
    if (index < 4) {
      styles.push("italic");
    }
    
    // Superscript effect for last letters of each word
    if (index === 3 || index === 16) { // O in EURO, S in ENTERPRISES
      styles.push("align-super text-[0.7em] inline-block -translate-y-1");
    }
    
    return styles.join(" ");
  };

  return (
    <Link href="/" className={`inline-block ${className}`}>
      <motion.div
        className="flex items-center gap-2 sm:gap-2.5 cursor-pointer"
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={hoverVariants}
      >
        {/* Animated Icon - Responsive sizing */}
        <motion.div
          variants={animate ? iconVariants : undefined}
          initial={animate ? "hidden" : undefined}
          animate={animate ? "visible" : undefined}
          className="relative shrink-0"
          style={{
            width: iconSize,
            height: iconSize,
          }}
        >
          {/* Mobile override for smaller screens */}
          <div className="w-6 h-6 sm:w-full sm:h-full">
            <svg
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Outer Circle */}
              <circle
                cx="256"
                cy="256"
                r="220"
                fill="#1E293B"
                stroke="#3B82F6"
                strokeWidth="24"
              />
              {/* Inner Ring */}
              <circle
                cx="256"
                cy="256"
                r="190"
                stroke="#3B82F6"
                strokeWidth="6"
                opacity="0.4"
              />
              {/* Center Hub */}
              <circle
                cx="256"
                cy="256"
                r="90"
                fill="#0F172A"
                stroke="#3B82F6"
                strokeWidth="12"
              />
              {/* E Letter */}
              <motion.path
                d="M211 211V301M211 211H291M211 256H251M211 301H291"
                stroke="white"
                strokeWidth="40"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
              />
              {/* Car Arc */}
              <path
                d="M150 320 Q256 380 362 320"
                stroke="#3B82F6"
                strokeWidth="50"
                strokeLinecap="round"
                fill="none"
              />
              {/* Wheels */}
              <circle
                cx="180"
                cy="335"
                r="18"
                fill="#0F172A"
                stroke="white"
                strokeWidth="8"
              />
              <circle cx="180" cy="335" r="7" fill="white" />
              <circle
                cx="332"
                cy="335"
                r="18"
                fill="#0F172A"
                stroke="white"
                strokeWidth="8"
              />
              <circle cx="332" cy="335" r="7" fill="white" />
              {/* Speed Lines */}
              <motion.path
                d="M120 200 L90 200 M110 170 L70 170 M100 140 L50 140"
                stroke="#3B82F6"
                strokeWidth="18"
                strokeLinecap="round"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.6, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              />
              {/* Star */}
              <polygon
                points="256,175 271,155 261,165 256,155 251,165 241,155"
                fill="#F59E0B"
                stroke="white"
                strokeWidth="6"
              />
            </svg>
          </div>
        </motion.div>

        {/* Animated Text - No wrap, responsive sizing */}
        {showText && (
          <motion.div
            className={`flex font-bold tracking-tight whitespace-nowrap ${textSize}`}
            variants={animate ? containerVariants : undefined}
            initial={animate ? "hidden" : undefined}
            animate={animate ? "visible" : undefined}
          >
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                variants={animate ? letterVariants : undefined}
                className={`
                  ${letter === " " ? "w-1.5 sm:w-2" : ""}
                  ${i < 4 ? "text-[#1E293B] dark:text-white" : "text-[#3B82F6]"}
                  ${letter !== " " ? getLetterStyle(letter, i) : ""}
                `}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>
        )}
      </motion.div>
    </Link>
  );
}