import { Achievement, AchievementFormData } from "@/types/achievement";

export function achievementToForm(
  achievement: Achievement,
): AchievementFormData {
  return {
    title: achievement.title,

    category: achievement.category ?? "Education",

    difficulty: achievement.difficulty ?? "Beginner",

    description: achievement.description ?? "",

    image: achievement.image ?? "",

    points: achievement.points?.toString() ?? "",

    expiration: achievement.expiration
      ? achievement.expiration.slice(0, 10)
      : "",

    metadata: achievement.metadata?.note ?? "",
  };
}
