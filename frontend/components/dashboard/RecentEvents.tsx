"use client";

import { CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";

import { useEventList } from "@/hooks/event/useEventList";
import { getEventStatus } from "@/lib/event/getEventStatus";

export default function RecentEvents() {
  const router = useRouter();

  const { events, loading } = useEventList();

  const liveEvents = events
    .filter((event) => getEventStatus(event) === "live")
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

  return (
    <div className="rounded-3xl border border-violet-500/20 bg-zinc-900/60 p-4 backdrop-blur-xl md:p-5 xl:p-6">
      <h2 className="mb-6 text-lg font-bold md:text-xl">Live Events</h2>

      <div className="dashboard-scroll max-h-[320px] min-h-[240px] space-y-4 overflow-y-auto pr-2">
        {loading ? (
          <p className="py-8 text-center text-sm text-zinc-500">
            Loading events...
          </p>
        ) : liveEvents.length === 0 ? (
          <p className="py-8 text-center text-sm text-zinc-500">
            No live events.
          </p>
        ) : (
          liveEvents.map((event) => (
            <button
              key={event.id}
              type="button"
              onClick={() => router.push(`/events/${event.id}`)}
              className="group flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-transparent bg-zinc-800/60 p-3 text-left transition-all duration-300 hover:border-violet-500/30 hover:bg-zinc-800 hover:shadow-[0_0_25px_rgba(139,92,246,0.18)] md:p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
                <CalendarDays className="h-4 w-4 text-violet-400" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-zinc-200 transition-colors group-hover:text-white md:text-base">
                  {event.title}
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  {formatEventDate(event.start_at, event.timezone)} →{" "}
                  {formatEventDate(event.end_at, event.timezone)}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

function formatEventDate(date: string | null, timezone: string | null) {
  if (!date) return "--";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: timezone ?? undefined,
  })
    .format(new Date(date))
    .replace(",", " ·");
}
