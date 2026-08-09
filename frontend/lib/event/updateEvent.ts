import { EventFormData } from "@/types/event";

export async function updateEvent(
  id: string,
  form: EventFormData,
  wallet: string,
) {
  const response = await fetch("/api/event/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      ...form,
      wallet,
    }),
  });

  return response.json() as Promise<{
    success: boolean;
    data?: unknown;
    error?: string;
  }>;
}
