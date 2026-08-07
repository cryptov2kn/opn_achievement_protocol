"use client";

import FormInput from "@/components/ui/FormInput";
import { AchievementFormData } from "@/types/achievement";

interface Props {
  form: AchievementFormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function AchievementStatsFields({ form, handleChange }: Props) {
  return (
    /* Stats */

    <FormInput
      label="Points"
      name="points"
      value={form.points}
      onChange={handleChange}
      placeholder="100"
    />
  );
}
