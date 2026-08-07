"use client";

import CustomSelect from "@/components/ui/CustomSelect";
import FormInput from "@/components/ui/FormInput";
import { ACHIEVEMENT_CATEGORY_OPTIONS } from "@/constants/achievement";
import { AchievementFormData } from "@/types/achievement";

interface Props {
  form: AchievementFormData;
  updateField: (field: keyof AchievementFormData, value: string) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function AchievementBasicFields({
  form,
  updateField,
  handleChange,
}: Props) {
  return (
    <>
      {/* Achievement Name */}
      <FormInput
        label="Achievement Name"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Blockchain Master"
      />

      {/* Category + Difficulty */}
      <div className="grid gap-4 md:grid-cols-2">
        <CustomSelect
          label="Category"
          value={form.category}
          onChange={(value) => updateField("category", value)}
          options={ACHIEVEMENT_CATEGORY_OPTIONS}
        />

        <CustomSelect
          label="Difficulty"
          value={form.difficulty}
          onChange={(value) => updateField("difficulty", value)}
          options={["Beginner", "Intermediate", "Advanced", "Expert"]}
        />
      </div>
    </>
  );
}
