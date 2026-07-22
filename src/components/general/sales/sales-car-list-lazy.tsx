import dynamic from "next/dynamic";
import { SalesCarSkeleton } from "./sales-car-skeleton";

export const SalesCarListLazy = dynamic(
  () =>
    import("./sales-car-list").then((mod) => ({ default: mod.SalesCarList })),
  {
    loading: () => <SalesCarSkeleton count={8} />,
    // ssr: false, // Set to true if you want server-side rendering of the chunk
  },
);
