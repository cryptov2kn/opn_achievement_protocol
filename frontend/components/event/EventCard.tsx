"use client";

import Button from "@/components/ui/Button";
import { getEventStatus } from "@/lib/event/getEventStatus";
import { Event } from "@/types/event";
import { clsx } from "clsx";
import { CalendarDays, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  event: Event;
}

export default function EventCard({ event }: Props) {
  const router = useRouter();

  const status = getEventStatus(event);

  const STATUS_BADGES = {
    upcoming: {
      label: "Upcoming",
      className: "bg-sky-500/90 text-white",
    },
    live: {
      label: "Live",
      className: "bg-emerald-500/90 text-white",
    },
    ended: {
      label: "Ended",
      className: "bg-red-500/90 text-white",
    },
  } as const;

  const badge = STATUS_BADGES[status];

  return (
    <div
      onClick={() => router.push(`/events/${event.id}`)}
      className="flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/60"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] bg-zinc-800">
        <div
          className={clsx(
            "absolute top-3 right-3 z-20 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md",
            badge.className,
          )}
        >
          {badge.label}
        </div>

        {event.achievement?.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={event.achievement.image}
            alt={event.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-500">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="line-clamp-1 text-center text-xl font-bold tracking-tight text-white">
          {event.title}
        </h3>

        {/* Achievement + Location */}
        <div className="mt-4 flex items-center justify-center gap-2 text-sm">
          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-violet-300">
            {event.achievement?.title ?? "Achievement"}
          </span>

          <span className="text-zinc-600">•</span>

          <span
            className={clsx(
              "rounded-full px-3 py-1",
              event.event_type === "online"
                ? "bg-sky-500/10 text-sky-300"
                : "bg-amber-500/10 text-amber-300",
            )}
          >
            {event.event_type === "online" ? "🌐 Online" : "📍 Offline"}
          </span>
        </div>

        {/* Participants */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <Users className="h-5 w-5 text-emerald-400" />

          <span className="font-bold text-emerald-400">
            {event.max_participants ?? "-"} Participants
          </span>
        </div>

        {/* Date */}
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-zinc-500">
          <CalendarDays className="h-5 w-5" />

          <span>
            {event.start_date} → {event.end_date}
          </span>
        </div>

        {/* Action */}
        <div className="mt-auto flex justify-center gap-2 pt-6">
          <Link
            href={`/events/${event.id}/edit`}
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="primary" size="lg">
              Edit
            </Button>
          </Link>

          <Link
            href={`/events/${event.id}/delete`}
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="danger" size="lg">
              Delete
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
