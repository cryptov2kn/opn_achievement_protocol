/**
 * Restore achievement.
 */
export async function restoreAchievement(id: string, wallet: string) {
  const response = await fetch("/api/achievement/restore", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      wallet,
    }),
  });

  return response.json();
}
