"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import ConfirmDialog from "@/components/ui/ConfirmDialog";
import FormActions from "@/components/ui/FormActions";
import FormSection from "@/components/ui/FormSection";

import EventBasicFields from "./fields/EventBasicFields";
import EventImageField from "./fields/EventImageField";

import { useAchievementList } from "@/hooks/achievement/useAchievementList";
import { useNotification } from "@/hooks/common/useNotification";
import { useWallet } from "@/hooks/useWallet";
import { createEvent } from "@/lib/event/createEvent";
import { EventFormData, eventFormDefault } from "@/types/event";

interface Props {
  form: EventFormData;
  setForm: React.Dispatch<React.SetStateAction<EventFormData>>;
}

export default function EventForm({ form, setForm }: Props) {
  const { address, isConnected } = useWallet();

  const notify = useNotification();

  const router = useRouter();

  const { achievements } = useAchievementList();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const liveAchievements = achievements.filter((item) => {
    if (item.status === "archived") return false;

    if (item.expiration) {
      return new Date(item.expiration) >= new Date();
    }

    return true;
  });

  function updateField(field: keyof EventFormData, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    updateField(e.target.name as keyof EventFormData, e.target.value);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    updateField("image", imageUrl);
  }

  /**
   * Validate the form before opening confirmation dialog.
   */
  function handleCreate() {
    if (!isConnected || !address) {
      notify.warning("Please connect your wallet first.");
      return;
    }

    if (!form.achievementId) {
      notify.warning("Please select an achievement.");
      return;
    }

    if (!form.title.trim()) {
      notify.warning("Event title is required.");
      return;
    }

    if (!form.startDate) {
      notify.warning("Start date is required.");
      return;
    }

    if (!form.startTime) {
      notify.warning("Start time is required.");
      return;
    }

    if (!form.endDate) {
      notify.warning("End date is required.");
      return;
    }

    if (!form.endTime) {
      notify.warning("End time is required.");
      return;
    }

    if (new Date(form.endDate) < new Date(form.startDate)) {
      notify.warning("End date cannot be before start date.");
      return;
    }

    if (!form.maxParticipants || Number(form.maxParticipants) <= 0) {
      notify.warning("Participants must be greater than 0.");
      return;
    }

    if (!form.location.trim()) {
      notify.warning(
        form.eventType === "online"
          ? "Event link is required."
          : "Venue is required.",
      );
      return;
    }

    // Do NOT create immediately.
    // Open confirmation dialog first.
    setConfirmOpen(true);
  }

  /**
   * Actually create the event after user confirmation.
   */
  async function handleConfirmCreate() {
    if (!form.participationKeyword.trim()) {
      notify.warning("Please enter a participation keyword.");
      return;
    }

    if (!isConnected || !address) {
      setConfirmOpen(false);
      notify.warning("Please connect your wallet first.");
      return;
    }

    if (!isConnected || !address) {
      setConfirmOpen(false);
      notify.warning("Please connect your wallet first.");
      return;
    }

    try {
      setIsSubmitting(true);
      setConfirmOpen(false);

      const result = await createEvent(form, address);

      if (!result.success) {
        notify.error(result.error);
        return;
      }

      notify.success("Event created successfully.");

      setForm({
        ...eventFormDefault,
        achievementId: form.achievementId,
      });

      setTimeout(() => {
        router.replace("/events/list");
      }, 800);
    } catch (error) {
      console.error(error);
      notify.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setForm({
      ...eventFormDefault,
      achievementId: form.achievementId,
    });
  }

  return (
    <>
      <FormSection
        title="Create Event"
        description="Create an event that issues one of your achievements."
      >
        <EventBasicFields
          form={form}
          achievements={liveAchievements}
          updateField={updateField}
          handleChange={handleChange}
        />

        <EventImageField form={form} handleImageUpload={handleImageUpload} />

        <FormActions
          submitText="Create Event"
          onSubmit={handleCreate}
          onReset={handleReset}
          isSubmitting={isSubmitting}
        />
      </FormSection>

      <ConfirmDialog
        open={confirmOpen}
        title="Create Event?"
        description=""
        confirmText="Create Event"
        cancelText="Cancel"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmCreate}
      >
        <div>
          <label
            htmlFor="participationKeyword"
            className="block text-sm font-semibold text-white"
          >
            Participation Keyword
          </label>

          <input
            id="participationKeyword"
            type="text"
            value={form.participationKeyword}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                participationKeyword: e.target.value,
              }))
            }
            placeholder="Enter participation keyword"
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-violet-500"
          />

          <p className="mt-3 text-xs leading-5 text-amber-300">
            ⚠️ Please choose your keyword carefully. This keyword will be used
            by participants to verify their participation and cannot be changed
            after the event is created.
          </p>
        </div>
      </ConfirmDialog>
    </>
  );
}
