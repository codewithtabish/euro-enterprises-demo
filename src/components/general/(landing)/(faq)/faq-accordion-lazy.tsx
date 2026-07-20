import dynamic from "next/dynamic";
import FaqAccordionSkeleton from "./faq-accordion-skeleton";

export const FaqAccordionLazy = dynamic(
  () => import("./faq-accordion"),
  {
    loading: () => <FaqAccordionSkeleton />,
  }
);