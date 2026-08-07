import { Achievement } from "@/types/achievement";
import { getAchievementStatus } from "./getAchievementStatus";

export function viewAchievements(achievements: Achievement[], view: string) {
  switch (view) {
    case "live":
      return achievements.filter(
        (achievement) => getAchievementStatus(achievement) === "live",
      );

    case "ended":
      return achievements.filter(
        (achievement) => getAchievementStatus(achievement) === "ended",
      );

    case "archived":
      return achievements.filter(
        (achievement) => getAchievementStatus(achievement) === "archived",
      );

    default:
      return achievements;
  }
}
