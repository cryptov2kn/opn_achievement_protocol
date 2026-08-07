/**
 * Delete achievement.
 */
export async function deleteAchievement(id: string, wallet: string) {
  const response = await fetch("/api/achievement/delete", {
    method: "DELETE",
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
