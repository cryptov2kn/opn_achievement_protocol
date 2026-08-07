"use client";

import FormTextarea from "@/components/ui/FormTextarea";
import { AchievementFormData } from "@/types/achievement";

interface Props {
  form: AchievementFormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function AchievementDescriptionField({
  form,
  handleChange,
}: Props) {
  return (
    /* Description */
    <FormTextarea
      label="Description"
      name="description"
      value={form.description}
      onChange={handleChange}
      placeholder="Describe this achievement..."
      rows={5}
    />
  );
}
