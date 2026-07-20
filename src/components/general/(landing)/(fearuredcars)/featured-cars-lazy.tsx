import dynamic from "next/dynamic";
import FeaturedCarsSkeleton from "./featured-cars-skeleton";

export const FeaturedCarsLazy = dynamic(
  () => import("./featured-cars-section"),
  {
    loading: () => <FeaturedCarsSkeleton />,
  }
);