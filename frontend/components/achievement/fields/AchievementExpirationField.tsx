"use client";

import FormDateInput from "@/components/ui/FormDateInput";
import { AchievementFormData } from "@/types/achievement";

interface Props {
  form: AchievementFormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function AchievementExpirationField({
  form,
  handleChange,
}: Props) {
  return (
    <FormDateInput
      label="Expiration Date"
      name="expiration"
      value={form.expiration}
      onChange={handleChange}
    />
  );
}
