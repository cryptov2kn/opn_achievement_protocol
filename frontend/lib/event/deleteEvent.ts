/**
 * Delete event.
 */
export async function deleteEvent(id: string, wallet: string) {
  const response = await fetch("/api/event/delete", {
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
