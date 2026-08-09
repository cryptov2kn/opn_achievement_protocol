"use client";

import { useState } from "react";

import AchievementForm from "@/components/achievement/AchievementForm";
import AchievementGuide from "@/components/achievement/AchievementGuide";
import AchievementPreviewCard from "@/components/achievement/AchievementPreviewCard";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardContent from "@/components/layout/DashboardContent";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

import {
  AchievementFormData,
  achievementFormDefault,
} from "@/types/achievement";

export default function CreateAchievementPage() {
  const [form, setForm] = useState<AchievementFormData>(achievementFormDefault);

  return (
    <main className="flex min-h-screen bg-[#0b0b0d] text-white">
      <Sidebar />

      <DashboardContent
        breadcrumb={
          <PageBreadcrumb
            items={[
              {
                label: "Achievement List",
                href: "/achievements/list",
              },
              {
                label: "Create Achievement",
              },
            ]}
          />
        }
      >
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 xl:gap-8">
          {/* LEFT */}
          <div className="xl:col-span-2">
            <AchievementForm form={form} setForm={setForm} />
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <AchievementGuide />

            <AchievementPreviewCard form={form} />
          </div>
        </div>
      </DashboardContent>
    </main>
  );
}
