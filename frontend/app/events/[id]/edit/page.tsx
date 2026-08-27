"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import EventEditForm from "@/components/event/EventEditForm";
import DashboardContent from "@/components/layout/DashboardContent";
import DashboardLoading from "@/components/layout/DashboardLoading";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import DataState from "@/components/ui/DataState";

import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { useNotification } from "@/hooks/common/useNotification";
import { useEventDetail } from "@/hooks/event/useEventDetail";
import { useWallet } from "@/hooks/useWallet";
import { updateEvent } from "@/lib/event/updateEvent";

import { EventFormData, eventFormDefault } from "@/types/event";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function EditEventPage({ params }: Props) {
  const { id } = use(params);

  const router = useRouter();

  const notify = useNotification();

  const { address, isConnected } = useWallet();

  const { event, loading } = useEventDetail(id);

  const [form, setForm] = useState<EventFormData>(eventFormDefault);

  const [initialForm, setInitialForm] =
    useState<EventFormData>(eventFormDefault);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const hasChanges = JSON.stringify(form) !== JSON.stringify(initialForm);

  useEffect(() => {
    if (!event) return;

    const timezone =
      event.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    const start = event.start_at ? new Date(event.start_at) : null;

    const end = event.end_at ? new Date(event.end_at) : null;

    const dateFormatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const timeFormatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const nextForm: EventFormData = {
      achievementId: event.achievement_id,
      title: event.title,
      eventType: event.event_type,

      startDate: start ? dateFormatter.format(start) : "",
      endDate: end ? dateFormatter.format(end) : "",

      startTime: start ? timeFormatter.format(start) : "",
      endTime: end ? timeFormatter.format(end) : "",

      timezone,

      maxParticipants:
        event.max_participants !== null ? String(event.max_participants) : "",

      location: event.location ?? "",
      description: event.description ?? "",

      points: event.points !== null ? String(event.points) : "",

      participationKeyword: "",

      image: event.image ?? "",
    };

    queueMicrotask(() => {
      setForm(nextForm);
      setInitialForm(nextForm);
    });
  }, [event]);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!hasChanges) return;

      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);

    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [hasChanges]);

  async function handleUpdate() {
    if (!hasChanges) return;

    if (!isConnected || !address) {
      notify.warning("Please connect your wallet first.");
      return;
    }

    setConfirmOpen(true);
  }

  async function handleConfirmUpdate() {
    setConfirmOpen(false);

    if (!isConnected || !address) {
      notify.warning("Please connect your wallet first.");
      return;
    }

    try {
      const result = await updateEvent(id, form, address);

      if (!result.success) {
        notify.error(result.error || "Failed to update event.");
        return;
      }

      notify.success("Event updated successfully.");

      setInitialForm({ ...form });

      setTimeout(() => {
        router.replace(`/events/${id}`);
      }, 800);
    } catch (error) {
      console.error(error);
      notify.error("Something went wrong.");
    }
  }

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
                  label: "Edit",
                },
              ]}
            />
          }
        >
          <DataState
            title="Event not found"
            description="This event does not exist or is no longer available."
            buttonText="Back to Event List"
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
                label: "Edit",
              },
            ]}
          />
        }
      >
        <EventEditForm
          form={form}
          setForm={setForm}
          initialForm={initialForm}
          hasChanges={hasChanges}
          onSubmit={handleUpdate}
        />
      </DashboardContent>

      <ConfirmDialog
        open={confirmOpen}
        title="Save Changes?"
        description="Are you sure you want to save changes to this event?"
        confirmText="Save Changes"
        cancelText="Cancel"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmUpdate}
      />
    </main>
  );
}
