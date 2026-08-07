import { Event } from "@/types/event";

export function viewEvents(events: Event[], view: string) {
  const now = new Date();

  switch (view) {
    case "upcoming":
      return events.filter((event) => {
        if (!event.start_date) return false;

        return new Date(event.start_date) > now;
      });

    case "live":
      return events.filter((event) => {
        if (!event.start_date || !event.end_date) return false;

        return (
          new Date(event.start_date) <= now && new Date(event.end_date) >= now
        );
      });

    case "ended":
      return events.filter((event) => {
        if (!event.end_date) return false;

        return new Date(event.end_date) < now;
      });

    default:
      return events;
  }
}
