import { Event } from "@/types/event";

export function getEventStatus(event: Event): "upcoming" | "live" | "ended" {
  const now = new Date();

  const start = event.start_date ? new Date(event.start_date) : null;

  const end = event.end_date ? new Date(event.end_date) : null;

  if (!start || !end) {
    return "upcoming";
  }

  if (now < start) {
    return "upcoming";
  }

  if (now >= start && now <= end) {
    return "live";
  }

  return "ended";
}
