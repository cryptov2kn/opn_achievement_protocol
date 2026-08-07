"use client";

import { useMemo } from "react";

import { useAchievementList } from "@/hooks/achievement/useAchievementList";
import { getAchievementStatus } from "@/lib/achievement/getAchievementStatus";

export function useAvailableAchievements() {
  const { achievements, loading } = useAchievementList();

  const options = useMemo(() => {
    return achievements
      .filter((achievement) => getAchievementStatus(achievement) === "live")
      .map((achievement) => ({
        label: achievement.title,
        value: achievement.id,
      }));
  }, [achievements]);

  return {
    options,
    loading,
  };
}
