"use client";

import ImageUpload from "@/components/ui/ImageUpload";
import { EventFormData } from "@/types/event";

interface Props {
  form: EventFormData;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: "default" | "compact";
}

export default function EventImageField({
  form,
  handleImageUpload,
  variant = "default",
}: Props) {
  return (
    <ImageUpload
      label="Event Image"
      image={form.image}
      onChange={handleImageUpload}
      variant={variant}
    />
  );
}
