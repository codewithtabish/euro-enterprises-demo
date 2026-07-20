import dynamic from "next/dynamic";
import TestimonialsSectionSkeleton from "./testimonials-section-skeleton";

export const TestimonialsSectionLazy = dynamic(
  () => import("./testimonials-02"),
  {
    loading: () => <TestimonialsSectionSkeleton />,
  }
);