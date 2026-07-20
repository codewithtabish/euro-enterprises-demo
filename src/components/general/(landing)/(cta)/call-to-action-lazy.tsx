import dynamic from "next/dynamic";
import CallToActionSkeleton from "./call-to-action-skeleton";

export const CallToActionLazy = dynamic(
  () => import("./cta").then((mod) => ({
    default: mod.CallToAction,
  })),
  {
    loading: () => <CallToActionSkeleton />,
  }
);