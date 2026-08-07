"use client";

import CustomSelect from "@/components/ui/CustomSelect";
import { Achievement } from "@/types/achievement";

interface Props {
  achievements: Achievement[];

  value: string;

  onChange: (value: string) => void;
}

export default function EventAchievementField({
  achievements,
  value,
  onChange,
}: Props) {
  return (
    <CustomSelect
      label="Achievement"
      value={value}
      onChange={onChange}
      options={achievements.map((item) => item.title)}
    />
  );
}
