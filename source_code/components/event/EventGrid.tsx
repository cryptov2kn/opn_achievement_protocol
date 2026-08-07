import EventCard from "./EventCard";

import { Event } from "@/types/event";

interface Props {
  events: Event[];
}

export default function EventGrid({ events }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
