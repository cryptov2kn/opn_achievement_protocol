"use client";

import FormDateInput from "@/components/ui/FormDateInput";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";
import FormTimeInput from "@/components/ui/FormTimeInput";
import ObjectSelect from "@/components/ui/ObjectSelect";
import { Achievement } from "@/types/achievement";

import CustomSelect from "@/components/ui/CustomSelect";
import { EVENT_TYPE_OPTIONS } from "@/constants/event";
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
  //const { options } = useAvailableAchievements();
  const achievementOptions = achievements.map((item) => ({
    label: item.title,
    value: item.id,
  }));

  function handleDateTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    // Nếu đổi End Date
    if (name === "endDate") {
      const sameDay = form.startDate && value && form.startDate === value;

      // Cùng ngày nhưng End Time đang nhỏ hơn Start Time
      if (
        sameDay &&
        form.startTime &&
        form.endTime &&
        form.endTime < form.startTime
      ) {
        updateField("endTime", "");
      }
    }

    // Nếu đổi Start Date
    if (name === "startDate") {
      const sameDay = form.endDate && value && value === form.endDate;

      // Hai ngày trở thành cùng ngày nhưng giờ hiện tại không hợp lệ
      if (
        sameDay &&
        form.startTime &&
        form.endTime &&
        form.endTime < form.startTime
      ) {
        updateField("endTime", "");
      }
    }

    // Nếu đổi Start Time
    if (name === "startTime") {
      const sameDay =
        form.startDate && form.endDate && form.startDate === form.endDate;

      if (sameDay && form.endTime && value > form.endTime) {
        updateField("endTime", "");
      }
    }

    // Nếu đổi End Time
    if (name === "endTime") {
      const sameDay =
        form.startDate && form.endDate && form.startDate === form.endDate;

      if (sameDay && form.startTime && value < form.startTime) {
        return;
      }
    }

    handleChange(e);
  }

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

      {/* Points */}
      <FormInput
        label="Points"
        name="points"
        type="text"
        inputMode="numeric"
        value={form.points}
        onChange={handleChange}
        placeholder="100"
      />

      {/* Start / End */}
      <div className="grid gap-4 md:grid-cols-2">
        <FormDateInput
          label="Start Date"
          name="startDate"
          value={form.startDate}
          onChange={handleDateTimeChange}
        />

        <FormDateInput
          label="End Date"
          name="endDate"
          value={form.endDate}
          onChange={handleDateTimeChange}
          min={form.startDate}
        />
      </div>

      {/* Start / End Time */}
      <div className="grid gap-4 md:grid-cols-2">
        <FormTimeInput
          label="Start Time"
          name="startTime"
          value={form.startTime}
          onChange={handleDateTimeChange}
        />

        <FormTimeInput
          label="End Time"
          name="endTime"
          value={form.endTime}
          min={form.startDate === form.endDate ? form.startTime : undefined}
          onChange={handleDateTimeChange}
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
