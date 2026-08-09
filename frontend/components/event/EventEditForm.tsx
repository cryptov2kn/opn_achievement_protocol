"use client";

import FormActions from "@/components/ui/FormActions";
import FormSection from "@/components/ui/FormSection";

import { useAchievementList } from "@/hooks/achievement/useAchievementList";
import { EventFormData } from "@/types/event";
import EventImageField from "./EventImageField";

import EventBasicFields from "./fields/EventBasicFields";

interface Props {
  form: EventFormData;
  setForm: React.Dispatch<React.SetStateAction<EventFormData>>;
  initialForm?: EventFormData;
  hasChanges?: boolean;
  onSubmit: () => Promise<void> | void;
}

export default function EventEditForm({
  form,
  setForm,
  initialForm,
  hasChanges = true,
  onSubmit,
}: Props) {
  const { achievements } = useAchievementList();

  const liveAchievements = achievements.filter((item) => {
    if (item.status === "archived") return false;

    if (item.expiration) {
      const expired = new Date(item.expiration) < new Date();

      if (expired && item.id !== form.achievementId) {
        return false;
      }
    }

    return true;
  });

  const selectedAchievement = achievements.find(
    (item) => item.id === form.achievementId,
  );

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

  function handleReset() {
    if (initialForm) {
      setForm({ ...initialForm });
    }
  }

  async function handleSubmit() {
    await onSubmit();
  }

  return (
    <FormSection title="Edit Event" description="Update the event information.">
      <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
        {/* Left */}
        <div>
          <EventImageField image={selectedAchievement?.image ?? null} />
        </div>

        {/* Right — Event fields */}
        <div className="space-y-6">
          <EventBasicFields
            form={form}
            achievements={liveAchievements}
            updateField={updateField}
            handleChange={handleChange}
          />
        </div>
      </div>

      <FormActions
        submitText="Save Changes"
        resetText="Reset"
        onSubmit={handleSubmit}
        onReset={handleReset}
        submitDisabled={!hasChanges}
        align="right"
      />
    </FormSection>
  );
}
