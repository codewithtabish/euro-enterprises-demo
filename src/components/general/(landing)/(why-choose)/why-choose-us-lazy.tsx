"use client";

import dynamic from "next/dynamic";
import WhyChooseUsSkeleton from "./why-choose-us-skeleton";

const WhyChooseUsLazy = dynamic(
  () => import("./why-choose-us"),
  {
    loading: () => <WhyChooseUsSkeleton />,
  }
);

export default WhyChooseUsLazy;