"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface KineticTextLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  color?: string;
}

export function KineticTextLoader({ 
  text = "EURO ENTERPRISES", 
  size = "sm",
  className,
  color,
  ...props 
}: KineticTextLoaderProps) {
  const letters = text.split("");

  const sizeClasses = {
    sm: "scale-1",
    md: "scale-75 md:scale-90",
    lg: "scale-90 md:scale-100",
    xl: "scale-110 md:scale-125",
  };

  return (
    <div 
      className={cn(
        "relative flex items-center justify-center font-light select-none",
        className
      )} 
      {...props}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');

        @keyframes ktl-dotMove {
          0%, 100% { transform: rotate(180deg) translate(-85px, -12px) rotate(-180deg); }
          50% { transform: rotate(0deg) translate(-86px, 12px) rotate(0deg); }
        }

        @keyframes ktl-letterStretch {
          0%, 100% { transform: scale(1, 0.4); transform-origin: 100% 75%; }
          8%, 28% { transform: scale(1, 1.45); transform-origin: 100% 67%; }
          37% { transform: scale(1, 0.9); transform-origin: 100% 75%; }
          46% { transform: scale(1, 1.05); transform-origin: 100% 75%; }
          50%, 97% { transform: scale(1); transform-origin: 100% 75%; }
        }

        @keyframes ktl-l-bounce {
          0%, 45%, 70%, 100% { transform: scaleY(1.12); }
          49% { transform: scaleY(0.28); }
          50% { transform: scaleY(0.15); }
          53% { transform: scaleY(0.65); }
          60% { transform: scaleY(1.28); }
          68% { transform: scaleY(1.05); }
        }
      `}</style>

      <div className={cn("relative", sizeClasses[size])}>
        {/* Animated Dot */}
        <div 
          className="absolute z-10 top-[42px] left-[88px] w-[7px] h-[7px] rounded-full bg-neutral-900 dark:bg-neutral-100"
          style={{ 
            animation: "ktl-dotMove 1.8s cubic-bezier(0.25,0.25,0.75,0.75) infinite",
            backgroundColor: color 
          }}
        />

        <p 
          className="relative m-0 whitespace-nowrap text-[3.8rem] tracking-[6px] font-light text-neutral-900 dark:text-neutral-100"
          style={{ color: color }}
          aria-label={text}
        >
          {letters.map((char, index) => {
            const isFirstL = index === 0 && char.toUpperCase() === 'E';
            const isI = char.toLowerCase() === 'i' || char.toLowerCase() === 'ı';

            if (isFirstL) {
              return (
                <span 
                  key={index} 
                  className="inline-block relative origin-[100%_70%]"
                  style={{ 
                    animation: "ktl-l-bounce 1.8s cubic-bezier(0.25,0.25,0.75,0.75) infinite",
                    color: color
                  }}
                >
                  {char}
                </span>
              );
            }

            if (isI) {
              return (
                <span 
                  key={index} 
                  className="inline-block relative origin-[100%_70%]"
                  style={{ 
                    animation: "ktl-letterStretch 1.8s cubic-bezier(0.25,0.23,0.73,0.75) infinite",
                    color: color
                  }}
                >
                  {char}
                </span>
              );
            }

            return (
              <span 
                key={index} 
                className="inline-block relative"
              >
                {char}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}

export default KineticTextLoader;