"use client";

import ImageUpload from "@/components/ui/ImageUpload";
import { AchievementFormData } from "@/types/achievement";

interface Props {
  form: AchievementFormData;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;

  variant?: "default" | "compact";
}

export default function AchievementImageField({
  form,
  handleImageUpload,
  variant = "default",
}: Props) {
  return (
    <ImageUpload
      label="Achievement Image"
      image={form.image}
      onChange={handleImageUpload}
      variant={variant}
    />
  );
}
