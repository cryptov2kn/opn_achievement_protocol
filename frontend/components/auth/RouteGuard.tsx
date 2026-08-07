"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter, usePathname } from "next/navigation";

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected } = useAccount();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Chưa connect → chỉ cho ở Landing
    if (!isConnected && pathname !== "/") {
      router.replace("/");
    }

    // Đã connect → nếu đang ở Landing thì sang Dashboard
    if (isConnected && pathname === "/") {
      router.replace("/dashboard");
    }
  }, [isConnected, pathname, router]);

  return <>{children}</>;
}
