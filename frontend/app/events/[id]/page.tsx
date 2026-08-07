"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import DashboardContent from "@/components/layout/DashboardContent";
import DashboardLoading from "@/components/layout/DashboardLoading";

import DataState from "@/components/ui/DataState";
import DetailSection from "@/components/ui/DetailSection";

import EventDetailActions from "@/components/event/detail/EventDetailActions";
import EventDetailHeader from "@/components/event/detail/EventDetailHeader";
import EventDetailImage from "@/components/event/detail/EventDetailImage";
import EventDetailInfo from "@/components/event/detail/EventDetailInfo";
import EventDetailMetadata from "@/components/event/detail/EventDetailMetadata";

import { useEventDetail } from "@/hooks/event/useEventDetail";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function EventDetailPage({ params }: Props) {
  const { id } = use(params);

  const router = useRouter();

  const { event, loading } = useEventDetail(id);

  if (loading) {
    return <DashboardLoading text="Loading event..." />;
  }

  if (!event) {
    return (
      <main className="flex min-h-screen bg-zinc-950 text-white">
        <Sidebar />

        <DashboardContent>
          <DataState
            title="Event not found"
            description="This event does not exist."
          />
        </DashboardContent>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <DashboardContent>
        <div className="mx-auto max-w-6xl">
          <DetailSection
            header={
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-5 py-3 text-sm font-semibold text-violet-200 transition-all duration-200 hover:border-violet-400 hover:bg-violet-500/20 hover:text-white hover:shadow-[0_0_24px_rgba(139,92,246,0.18)]"
              >
                ← Back to Event List
              </button>
            }
          >
            <EventDetailImage image={event.achievement?.image ?? null} />

            <EventDetailHeader event={event} />

            <EventDetailInfo event={event} />

            <EventDetailMetadata event={event} />

            <EventDetailActions eventId={event.id} />
          </DetailSection>
        </div>
      </DashboardContent>
    </main>
  );
}
