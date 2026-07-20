import dynamic from "next/dynamic";

export const UserSyncLazy = dynamic(() => import("./user-sync"));