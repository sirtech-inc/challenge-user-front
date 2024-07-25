"use client";

import { useStore } from "@/store/user.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  const router = useRouter();

  const { user } = useStore((state) => state);

  useEffect(() => {
    if (user !== null) {
      router.push("/dashboard");
    } else {
      router.push("/auth");
    }
  }, [user, router]);

  return <>{children}</>;
};
