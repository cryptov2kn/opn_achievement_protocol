import { AchievementFormData } from "@/types/achievement";

/**
 * Update an achievement.
 */
export async function updateAchievement(
  id: string,
  form: AchievementFormData,
  wallet: string,
) {
  const response = await fetch("/api/achievement/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      wallet,
      ...form,
    }),
  });

  return response.json();
}
