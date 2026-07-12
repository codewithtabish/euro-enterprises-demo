"use client";

import type { TestimonialType } from "@/components/general/(landing)/(testmonial)/testimonial-list";
import { TestimonialList } from "@/components/general/(landing)/(testmonial)/testimonial-list";

export default function TestimonialsSection() {
  return (
    <div className="max-w-screen overflow-x-clip py-16">
      <div className="container mx-auto px-4">
        <div className="border-x border-line py-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-amber-500" />
              <span className="text-amber-600 dark:text-amber-400 font-medium tracking-[3px] text-sm">
                EURO ENTERPRISES
              </span>
              <div className="h-px w-8 bg-amber-500" />
            </div>

            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white relative inline-block">
              What Our Clients Say
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-[3px] w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            </h2>

            <p className="mt-6 text-zinc-600 dark:text-zinc-400 max-w-md mx-auto text-lg">
              Real experiences from our valued clients who chose luxury with Euro Enterprises
            </p>
          </div>

          {/* Testimonials */}
          <div className="screen-line-top screen-line-bottom before:z-11 after:z-11 [&_.rfm-initial-child-container]:items-stretch! [&_.rfm-marquee]:items-stretch! mt-8">
            <TestimonialList data={TESTIMONIALS_1} />
            <div className="screen-line-top screen-line-bottom flex h-4" />
            <TestimonialList data={TESTIMONIALS_2} direction="right" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Updated Testimonials with unique IDs
const TESTIMONIALS_1: TestimonialType[] = [
  {
    id: "t1",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    authorName: "Ahmed Khan",
    authorTagline: "CEO, Khan Group",
    url: "#",
    quote: "The Mercedes S-Class I rented was impeccable. The entire process was seamless and truly luxurious.",
  },
  {
    id: "t2",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    authorName: "Sana Malik",
    authorTagline: "Fashion Designer",
    url: "#",
    quote: "Best car rental experience in Karachi. The Range Rover was spotless and service was 5-star.",
  },
  {
    id: "t3",
    authorAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
    authorName: "Bilal Rehman",
    authorTagline: "Business Executive",
    url: "#",
    quote: "Rented a Porsche for my anniversary. My wife is still talking about it. Highly recommended!",
  },
];

const TESTIMONIALS_2: TestimonialType[] = [
  {
    id: "t4",
    authorAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    authorName: "Faisal Nawaz",
    authorTagline: "Entrepreneur",
    url: "#",
    quote: "From booking to delivery, everything was perfect. The Vantablack Rolls Royce made my event unforgettable.",
  },
  {
    id: "t5",
    authorAvatar: "https://randomuser.me/api/portraits/women/52.jpg",
    authorName: "Mariam Hassan",
    authorTagline: "Travel Influencer",
    url: "#",
    quote: "The attention to detail is unmatched. I felt like royalty the entire trip.",
  },
  {
    id: "t6",
    authorAvatar: "https://randomuser.me/api/portraits/men/19.jpg",
    authorName: "Zain Abdullah",
    authorTagline: "Tech Founder",
    url: "#",
    quote: "Best luxury car rental in Pakistan. Will definitely rent again.",
  },
];