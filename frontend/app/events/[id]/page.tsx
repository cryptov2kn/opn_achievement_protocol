"use client";

import { use } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import DashboardContent from "@/components/layout/DashboardContent";
import DashboardLoading from "@/components/layout/DashboardLoading";
import DataState from "@/components/ui/DataState";

import EventDetailContent from "@/components/event/EventDetailContent";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { useEventDetail } from "@/hooks/event/useEventDetail";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function EventDetailPage({ params }: Props) {
  const { id } = use(params);

  //const router = useRouter();

  const { event, loading } = useEventDetail(id);

  if (loading) {
    return <DashboardLoading text="Loading event..." />;
  }

  if (!event) {
    return (
      <main className="flex min-h-screen bg-zinc-950 text-white">
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
                  label: "Detail",
                },
              ]}
            />
          }
        >
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

      <DashboardContent
        breadcrumb={
          <PageBreadcrumb
            items={[
              {
                label: "Event List",
                href: "/events/list",
              },
              {
                label: "Detail",
              },
            ]}
          />
        }
      >
        <EventDetailContent event={event} />
      </DashboardContent>
    </main>
  );
}
