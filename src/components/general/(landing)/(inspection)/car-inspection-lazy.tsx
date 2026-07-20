"use client";

import dynamic from "next/dynamic";
import CarInspectionSkeleton from "./car-inspection-skeleton";

const CarInspectionLazy = dynamic(
  () =>
    import("./car-inspection-section").then(
      (mod) => mod.CarInspectionSection
    ),
  {
    loading: () => <CarInspectionSkeleton />,
  }
);

export default CarInspectionLazy;