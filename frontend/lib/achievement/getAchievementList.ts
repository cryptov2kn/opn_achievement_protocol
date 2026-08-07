/**
 * Get achievement list by wallet.
 */
export async function getAchievementList(wallet: string) {
  const response = await fetch(`/api/achievement/list?wallet=${wallet}`, {
    cache: "no-store",
  });

  return response.json();
}
