import dynamic from "next/dynamic";
import HeroSectionSkeleton from "./hero-section-skeleton";

export const HeroSectionLazy = dynamic(
  () => import("./hero-section"),
  {
    loading: () => <HeroSectionSkeleton />,
  }
);