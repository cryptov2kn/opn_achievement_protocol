"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import DashboardContent from "@/components/layout/DashboardContent";

import CredentialSection from "@/components/credential/CredentialSection";

export default function CredentialListPage() {
  return (
    <main className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <DashboardContent showSearch>
        <CredentialSection />
      </DashboardContent>
    </main>
  );
}
