/**
 * Get achievement detail by id.
 */
export async function getAchievementById(id: string) {
  const response = await fetch(`/api/achievement/detail?id=${id}`, {
    cache: "no-store",
  });

  return response.json();
}
