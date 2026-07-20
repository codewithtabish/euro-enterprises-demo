import dynamic from "next/dynamic";
import ServicesSectionSkeleton from "./services-section-skeleton";

export const ServicesSectionLazy = dynamic(
  () => import("./services-section"),
  {
    loading: () => <ServicesSectionSkeleton />,
  }
);