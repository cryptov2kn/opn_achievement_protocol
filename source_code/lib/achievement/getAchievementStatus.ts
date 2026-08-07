import { Achievement } from "@/types/achievement";

export type AchievementStatus = "live" | "ended" | "archived";

export function getAchievementStatus(
  achievement: Achievement,
): AchievementStatus {
  // Ưu tiên archive
  if (achievement.status === "archived") {
    return "archived";
  }

  // Published nhưng hết hạn
  if (achievement.expiration && new Date(achievement.expiration) < new Date()) {
    return "ended";
  }

  return "live";
}
