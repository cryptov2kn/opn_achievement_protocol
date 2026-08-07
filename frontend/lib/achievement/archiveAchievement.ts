/**
 * Archive achievement.
 */
export async function archiveAchievement(id: string, wallet: string) {
  const response = await fetch("/api/achievement/archive", {
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
