import { Event } from "@/types/event";

interface Props {
  event: Event;
}

export default function EventDetailHeader({ event }: Props) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-white">
        {event.title}
      </h1>

      <p className="mt-2 text-sm text-zinc-500">Organized by issuer</p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <span className="rounded-full bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-300">
          🏆 {event.achievement.title}
        </span>

        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
          {event.event_type === "online" ? "🌐 Online" : "📍 Offline"}
        </span>
      </div>
    </div>
  );
}
