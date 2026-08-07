"use client";

import Sidebar from "@/components/dashboard/Sidebar";

import AchievementSection from "@/components/achievement/AchievementSection";
import DashboardContent from "@/components/layout/DashboardContent";

export default function AchievementListPage() {
  return (
    <main className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <DashboardContent showSearch>
        <AchievementSection />
      </DashboardContent>
    </main>
  );
}
