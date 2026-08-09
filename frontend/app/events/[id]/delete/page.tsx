"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import DeleteEventContent from "@/components/event/DeleteEventContent";
import DashboardContent from "@/components/layout/DashboardContent";
import DashboardLoading from "@/components/layout/DashboardLoading";

import DataState from "@/components/ui/DataState";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { useNotification } from "@/hooks/common/useNotification";
import { useEventDetail } from "@/hooks/event/useEventDetail";
import { useWallet } from "@/hooks/useWallet";
import { deleteEvent } from "@/lib/event/deleteEvent";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function DeleteEventPage({ params }: Props) {
  const { id } = use(params);

  const router = useRouter();

  const notify = useNotification();

  const { address, isConnected } = useWallet();

  const { event, loading } = useEventDetail(id);

  async function handleDelete() {
    if (!isConnected || !address) {
      notify.warning("Please connect your wallet first.");
      return;
    }

    try {
      const result = await deleteEvent(id, address);

      if (!result.success) {
        notify.error(result.error);
        return;
      }

      notify.success("Event deleted successfully.");

      setTimeout(() => {
        router.replace("/events/list");
      }, 800);
    } catch (error) {
      console.error(error);
      notify.error("Something went wrong.");
    }
  }

  /*function handleCancel() {
    router.back();
  }*/

  if (loading) {
    return <DashboardLoading text="Loading event..." />;
  }

  if (!event) {
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
                  label: "Detail",
                  href: `/events/${id}`,
                },
                {
                  label: "Delete",
                },
              ]}
            />
          }
        >
          <DataState
            title="Event not found"
            description="The event may have been deleted or does not exist."
            buttonText="Back to List"
            onButtonClick={() => router.replace("/events/list")}
          />
        </DashboardContent>
      </main>
    );
  }

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
                label: "Detail",
                href: `/events/${id}`,
              },
              {
                label: "Delete",
              },
            ]}
          />
        }
      >
        <DeleteEventContent
          event={event}
          onDelete={handleDelete}
          onCancel={() => router.back()}
        />
      </DashboardContent>
    </main>
  );
}
