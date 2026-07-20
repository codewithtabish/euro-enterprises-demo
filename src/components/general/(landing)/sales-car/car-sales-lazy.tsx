import dynamic from "next/dynamic";
import CarSalesSectionSkeleton from "./car-sales-section-skeleton";

export const CarSalesSectionLazy = dynamic(
  () => import("./car-sale-section"),
  {
    loading: () => <CarSalesSectionSkeleton />,
  }
);