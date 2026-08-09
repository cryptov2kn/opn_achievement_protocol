"use client";

import FormSection from "@/components/ui/FormSection";
import { Achievement } from "@/types/achievement";

import AchievementDetailActions from "./detail/AchievementDetailActions";
import AchievementDetailHeader from "./detail/AchievementDetailHeader";
import AchievementDetailImage from "./detail/AchievementDetailImage";
import AchievementDetailInfo from "./detail/AchievementDetailInfo";
import AchievementDetailMetadata from "./detail/AchievementDetailMetadata";

interface Props {
  achievement: Achievement;
}

export default function AchievementDetailContent({ achievement }: Props) {
  return (
    <FormSection
      title="Achievement Detail"
      description="View the achievement information and manage this achievement."
    >
      <AchievementDetailImage image={achievement.image} />

      <AchievementDetailHeader achievement={achievement} />

      <AchievementDetailInfo achievement={achievement} />

      <AchievementDetailMetadata achievement={achievement} />

      <AchievementDetailActions
        achievementId={achievement.id}
        status={achievement.status}
      />
    </FormSection>
  );
}
