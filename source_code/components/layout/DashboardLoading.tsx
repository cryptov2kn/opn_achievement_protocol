"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import DashboardContent from "@/components/layout/DashboardContent";
import LoadingState from "@/components/ui/LoadingState";

interface DashboardLoadingProps {
  text?: string;
}

export default function DashboardLoading({
  text = "Loading...",
}: DashboardLoadingProps) {
  return (
    <main className="flex min-h-screen bg-[#0b0b0d] text-white">
      <Sidebar />

      <DashboardContent>
        <LoadingState text={text} />
      </DashboardContent>
    </main>
  );
}
