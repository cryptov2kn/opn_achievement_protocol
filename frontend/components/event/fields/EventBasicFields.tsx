"use client";

import FormDateInput from "@/components/ui/FormDateInput";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";
import ObjectSelect from "@/components/ui/ObjectSelect";
import { Achievement } from "@/types/achievement";

import CustomSelect from "@/components/ui/CustomSelect";
import { EVENT_TYPE_OPTIONS } from "@/constants/event";
import { useAvailableAchievements } from "@/hooks/event/useAvailableAchievements";
import { EventFormData } from "@/types/event";

interface Props {
  form: EventFormData;

  achievements: Achievement[];

  updateField: (field: keyof EventFormData, value: string) => void;

  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function EventBasicFields({
  form,
  achievements,
  updateField,
  handleChange,
}: Props) {
  const { options } = useAvailableAchievements();
  const achievementOptions = achievements.map((item) => ({
    label: item.title,
    value: item.id,
  }));
  return (
    <>
      {/* Achievement */}

      <ObjectSelect
        label="Achievement"
        value={form.achievementId}
        onChange={(value) => updateField("achievementId", value)}
        options={achievementOptions}
      />

      {/* Event Title */}

      <FormInput
        label="Event Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Summer Hackathon 2026"
      />

      {/* Description */}

      <FormTextarea
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Describe this event..."
      />

      {/* Start / End */}

      <div className="grid gap-4 md:grid-cols-2">
        <FormDateInput
          label="Start Date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
        />

        <FormDateInput
          label="End Date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          min={form.startDate}
        />
      </div>

      {/* Participants */}

      <FormInput
        label="Max Participants"
        name="maxParticipants"
        type="text"
        inputMode="numeric"
        value={form.maxParticipants}
        onChange={handleChange}
        placeholder="100"
      />

      {/* Location */}

      <div className="grid gap-4 md:grid-cols-2">
        <CustomSelect
          label="Event Type"
          value={form.eventType}
          onChange={(value) => updateField("eventType", value)}
          options={EVENT_TYPE_OPTIONS}
        />

        <FormInput
          label={form.eventType === "online" ? "Event Link" : "Venue"}
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder={
            form.eventType === "online"
              ? "https://discord.gg/..."
              : "District 1, HCMC..."
          }
        />
      </div>
    </>
  );
}
