import { Event } from "@/types/event";

export function getEventStatus(event: Event): "upcoming" | "live" | "ended" {
  const now = new Date();

  const start = event.start_at ? new Date(event.start_at) : null;
  const end = event.end_at ? new Date(event.end_at) : null;

  if (!start || !end) {
    return "upcoming";
  }

  if (now < start) {
    return "upcoming";
  }

  if (now <= end) {
    return "live";
  }

  return "ended";
}
