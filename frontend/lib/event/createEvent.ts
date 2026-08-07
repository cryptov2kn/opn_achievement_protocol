import { EventFormData } from "@/types/event";

/**
 * Create a new event.
 */
export async function createEvent(form: EventFormData, wallet: string) {
  const response = await fetch("/api/event/create", {
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
