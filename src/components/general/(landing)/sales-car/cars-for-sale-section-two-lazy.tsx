import dynamic from "next/dynamic";
import CarsForSaleSectionTwoSkeleton from "./cars-for-sale-section-two-skeleton";

export const CarsForSaleSectionTwoLazy = dynamic(
  () => import("./car-sale-section-two"),
  {
    loading: () => <CarsForSaleSectionTwoSkeleton />,
  }
);