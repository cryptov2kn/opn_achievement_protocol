export async function getEventList(wallet: string) {
  const response = await fetch(`/api/event/list?wallet=${wallet}`, {
    cache: "no-store",
  });

  return response.json();
}
