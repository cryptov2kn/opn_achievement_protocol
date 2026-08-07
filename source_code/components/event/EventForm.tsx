"use client";

import FormActions from "@/components/ui/FormActions";
import FormSection from "@/components/ui/FormSection";
import EventBasicFields from "./fields/EventBasicFields";

import { useAchievementList } from "@/hooks/achievement/useAchievementList";
import { useNotification } from "@/hooks/common/useNotification";
import { useWallet } from "@/hooks/useWallet";
import { createEvent } from "@/lib/event/createEvent";
import { EventFormData, eventFormDefault } from "@/types/event";
import { useRouter } from "next/navigation";

interface Props {
  form: EventFormData;
  setForm: React.Dispatch<React.SetStateAction<EventFormData>>;
}

export default function EventForm({ form, setForm }: Props) {
  const { address, isConnected } = useWallet();

  const notify = useNotification();

  const router = useRouter();

  const { achievements } = useAchievementList();

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

  async function handleCreate() {
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

    if (!form.endDate) {
      notify.warning("End date is required.");
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
  }

  return (
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

      <FormActions
        submitText="Create Event"
        onSubmit={handleCreate}
        onReset={() =>
          setForm({
            ...eventFormDefault,
            achievementId: form.achievementId,
          })
        }
      />
    </FormSection>
  );
}
