"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { syncUserAction } from "@/app/actions/user-actions";

const UserSync = () => {
  const { isLoaded, isSignedIn } = useUser();
  const hasSynced = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || hasSynced.current) return;

    hasSynced.current = true;

    void syncUserAction();
  }, [isLoaded, isSignedIn]);

  return null;
};

export default UserSync;