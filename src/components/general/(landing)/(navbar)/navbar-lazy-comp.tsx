"use client";

import dynamic from "next/dynamic";
import NavbarSkeleton from "./navbar-skeleton";

export const APPNavBarLazy = dynamic(() => import("./navbar"), {
  loading: () => <NavbarSkeleton />,
  ssr: false,
});