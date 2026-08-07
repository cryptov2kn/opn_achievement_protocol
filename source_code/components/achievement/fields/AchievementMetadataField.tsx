"use client";

import FormTextarea from "@/components/ui/FormTextarea";
import { AchievementFormData } from "@/types/achievement";

interface Props {
  form: AchievementFormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function AchievementMetadataField({
  form,
  handleChange,
}: Props) {
  return (
    <FormTextarea
      label="Metadata"
      name="metadata"
      value={form.metadata}
      onChange={handleChange}
      placeholder="Optional additional information..."
      rows={4}
    />
  );
}
