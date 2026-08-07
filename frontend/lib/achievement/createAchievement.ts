import { AchievementFormData } from "@/types/achievement";

/**
 * Create a new achievement.
 */
export async function createAchievement(
  form: AchievementFormData,
  wallet: string,
) {
  const response = await fetch("/api/achievement/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...form,
      wallet,
    }),
  });

  return response.json();
}
