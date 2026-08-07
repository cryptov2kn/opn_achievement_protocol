"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import DashboardContent from "@/components/layout/DashboardContent";

import EventSection from "@/components/event/EventSection";

export default function EventListPage() {
  return (
    <main className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <DashboardContent showSearch>
        <EventSection />
      </DashboardContent>
    </main>
  );
}
