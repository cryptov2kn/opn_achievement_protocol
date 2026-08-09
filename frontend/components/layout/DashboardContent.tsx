"use client";

import { ReactNode } from "react";

import Topbar from "@/components/dashboard/Topbar";

interface DashboardContentProps {
  children: ReactNode;
  showSearch?: boolean;
  breadcrumb?: ReactNode;
}

export default function DashboardContent({
  children,
  showSearch = false,
  breadcrumb,
}: DashboardContentProps) {
  return (
    <div className="flex-1 p-4 md:p-6 xl:p-8">
      <Topbar showSearch={showSearch} breadcrumb={breadcrumb} />

      <div className="mt-6 md:mt-8">{children}</div>
    </div>
  );
}
