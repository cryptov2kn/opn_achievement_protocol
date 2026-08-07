import { Event } from "@/types/event";

interface Props {
  event: Event;
}

export default function EventDetailMetadata({ event }: Props) {
  return (
    <section className="mt-8 border-t border-zinc-800 pt-8">
      <div className="rounded-xl border border-zinc-800 bg-black p-6 py-8 transition hover:border-violet-500/30">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl">
            {event.event_type === "online" ? "🌐" : "📍"}
          </span>

          <h2 className="text-xl font-semibold text-white">
            {event.event_type === "online" ? "Event Link" : "Event Location"}
          </h2>
        </div>

        {event.location ? (
          event.event_type === "online" ? (
            <a
              href={event.location}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-violet-400 transition hover:text-violet-300"
            >
              {event.location}
            </a>
          ) : (
            <p className="leading-7 whitespace-pre-wrap text-zinc-300">
              {event.location}
            </p>
          )
        ) : (
          <p className="text-zinc-500">-</p>
        )}
      </div>
    </section>
  );
}
