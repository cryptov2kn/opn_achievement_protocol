"use client";

import { useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import EventForm from "@/components/event/EventForm";
import EventGuide from "@/components/event/EventGuide";
import EventPreviewCard from "@/components/event/EventPreviewCard";
import DashboardContent from "@/components/layout/DashboardContent";

import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { useAchievementList } from "@/hooks/achievement/useAchievementList";
import { EventFormData, eventFormDefault } from "@/types/event";
import { useSearchParams } from "next/navigation";

export default function CreateEventPage() {
  const searchParams = useSearchParams();
  const achievementId = searchParams.get("achievementId");
  const { achievements } = useAchievementList();

  const [form, setForm] = useState<EventFormData>({
    ...eventFormDefault,
    achievementId: achievementId ?? "",
  });

  return (
    <main className="flex min-h-screen bg-[#0b0b0d] text-white">
      <Sidebar />

      <DashboardContent
        breadcrumb={
          <PageBreadcrumb
            items={[
              {
                label: "Event List",
                href: "/events/list",
              },
              {
                label: "Create Event",
              },
            ]}
          />
        }
      >
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 xl:gap-8">
          {/* LEFT */}
          <div className="xl:col-span-2">
            <EventForm form={form} setForm={setForm} />
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <EventGuide />
            <EventPreviewCard form={form} achievements={achievements} />
          </div>
        </div>
      </DashboardContent>
    </main>
  );
}
