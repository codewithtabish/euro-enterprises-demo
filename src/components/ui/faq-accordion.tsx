"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import FaqHeader from "../general/(landing)/faq-header";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export interface FaqAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: FaqItem[];
  title?: string;
}


const DEFAULT_ITEMS: FaqItem[] = [
  {
    question: "How do I book a rental car?",
    answer:
      "Booking is quick and simple. Browse our available vehicles, choose your preferred pickup and return dates, and submit your reservation. Our team will confirm your booking shortly."
  },
  {
    question: "What documents are required to rent a vehicle?",
    answer:
      "You'll need a valid driver's license, a government-issued ID or passport, and any additional documents requested based on your booking or location."
  },
  {
    question: "Is there a minimum age requirement?",
    answer:
      "Yes. Drivers must generally be at least 21 years old with a valid driver's license. Some premium or luxury vehicles may require a higher minimum age."
  },
  {
    question: "Can I extend my rental period?",
    answer:
      "Absolutely. Contact our support team before your scheduled return time. We'll extend your rental if the vehicle is available."
  },
  {
    question: "Are your vehicles insured?",
    answer:
      "Yes. All of our rental vehicles include standard insurance coverage. Additional protection plans may also be available depending on your rental package."
  },
  {
    question: "What happens if I return the car late?",
    answer:
      "Late returns may result in additional rental charges. If you expect a delay, simply contact our team as soon as possible so we can assist you."
  },
  {
    question: "Can I cancel my reservation?",
    answer:
      "Yes. Reservations can be cancelled according to our cancellation policy. Please contact our customer support for assistance with changes or cancellations."
  },
  {
    question: "Do you offer airport pickup and drop-off?",
    answer:
      "Yes. We provide convenient airport pickup and drop-off services for selected locations. Simply mention your flight details during booking."
  },
  {
    question: "Do you provide a chauffeur service?",
    answer:
      "Yes. In addition to self-drive rentals, we also offer professional chauffeur services for business trips, weddings, airport transfers, and special events."
  },
  {
    question: "How can I contact Euro Enterprises?",
    answer:
      "You can reach us through WhatsApp, phone, or our online contact form. Our support team is ready to help you with bookings, inquiries, and roadside assistance."
  }
];

export function FaqAccordion({
  items = DEFAULT_ITEMS,
  title = "Vengeance UI FAQs",
  className,
  ...props
}: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto py-8 relative font-sans my-10", className)} {...props}>
      <FaqHeader/>
      {title && (
        <h2 className="text-center font-bold text-2xl md:text-3xl mb-10 text-neutral-500 dark:text-neutral-400">
          {title}
        </h2>
      )}
      
      <ul className="w-full mx-auto list-none p-0 flex flex-col">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <li
              key={index}
              className={cn(
                "w-full relative transition-all duration-300 ease-in",
                "border-b-2 border-neutral-100 dark:border-neutral-800",
                "last:border-b-0",
                isActive ? "border-b border-neutral-200 dark:border-neutral-700" : ""
              )}
            >
              <button
                className={cn(
                  "flex flex-row items-center justify-start w-full min-h-[60px] py-4 relative m-0 px-4 pl-14 cursor-pointer",
                  "border-l-[6px] md:border-l-[10px] transition-colors duration-200 text-left outline-none text-base md:text-lg",
                  isActive 
                    ? "border-l-neutral-900 dark:border-l-neutral-100 bg-neutral-100/50 dark:bg-neutral-800/30 text-neutral-900 dark:text-neutral-100 font-semibold" 
                    : "border-l-neutral-300 dark:border-l-neutral-700 bg-transparent text-neutral-600 dark:text-neutral-400 hover:border-l-neutral-500 dark:hover:border-l-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
                )}
                onClick={() => toggleItem(index)}
                aria-expanded={isActive}
              >
                {/* Plus/Minus Icon */}
                <span 
                  className={cn(
                    "absolute left-4 md:left-5 top-1/2 -translate-y-1/2 transition-all duration-200 leading-none",
                    isActive ? "text-[32px] md:text-[40px] font-normal text-neutral-900 dark:text-neutral-100" : "text-[24px] md:text-[30px] font-normal text-neutral-400 dark:text-neutral-500"
                  )}
                >
                  {isActive ? "-" : "+"}
                </span>
                
                <span className="pr-8">{item.question}</span>
                
                {/* Chevron */}
                <span 
                  className={cn(
                    "absolute right-6 block w-2 h-2 border-t-[3px] border-r-[3px] transition-transform duration-200 ease-in-out",
                    isActive ? "rotate-[-44deg] border-neutral-900 dark:border-neutral-100" : "rotate-[133deg] border-neutral-400 dark:border-neutral-500"
                  )}
                />
              </button>

              <div 
                className={cn(
                  "grid transition-all duration-300 ease-in-out w-full",
                  "border-l-[6px] md:border-l-[10px]",
                  isActive ? "grid-rows-[1fr] border-l-neutral-900 dark:border-l-neutral-100 bg-neutral-100/50 dark:bg-neutral-800/30" : "grid-rows-[0fr] border-l-neutral-300 dark:border-l-neutral-700 bg-transparent"
                )}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-row items-start justify-start w-full px-4 pl-14 pb-6 pt-2 text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-300">
                    <span className="opacity-90">{item.answer}</span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FaqAccordion;



// 
