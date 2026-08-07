import { Event } from "@/types/event";

/**
 * Get Event Detail
 */
export async function getEventDetail(id: string) {
  const response = await fetch(`/api/event/detail?id=${id}`, {
    cache: "no-store",
  });

  return response.json() as Promise<{
    success: boolean;
    data: Event;
    error?: string;
  }>;
}
