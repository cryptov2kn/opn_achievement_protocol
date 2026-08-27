"use client";

import { Event } from "@/types/event";
import { DateTime } from "luxon";

interface Props {
  event: Event;
}

function formatEventDateTime(value: string | null) {
  if (!value) {
    return {
      date: "-",
      time: "-",
      offset: "",
    };
  }

  const dateTime = DateTime.fromISO(value).toLocal();

  return {
    date: dateTime.toFormat("MMM dd, yyyy"),
    time: dateTime.toFormat("HH:mm"),
    offset: `UTC${dateTime.toFormat("ZZ").slice(0, 3)}`,
  };
}

export default function EventSummary({ event }: Props) {
  const start = formatEventDateTime(event.start_at);
  const end = formatEventDateTime(event.end_at);

  return (
    <div className="grid items-stretch gap-8 lg:grid-cols-[320px_1fr]">
      {/* Left */}
      <div>
        {event.image && (
          <div className="overflow-hidden rounded-2xl border border-zinc-800 lg:h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Right */}
      <div className="flex h-full flex-col gap-6">
        {/* Title */}
        <div className="flex flex-1 flex-col justify-center">
          <h2 className="text-4xl font-bold">{event.title}</h2>

          <p className="mt-2 text-zinc-400">
            {event.event_type === "online" ? "Online" : "Offline"} •{" "}
            {event.achievement?.title || "Achievement"}
          </p>
        </div>

        {/* Description + Location */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="mb-2 text-xs tracking-wider text-zinc-500 uppercase">
              Description
            </p>

            <p className="leading-7 break-all whitespace-pre-wrap text-zinc-300">
              {event.description || "-"}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="mb-2 text-xs tracking-wider text-zinc-500 uppercase">
              Location
            </p>

            <p className="leading-7 break-all whitespace-pre-wrap text-zinc-300">
              {event.location || "-"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <p className="text-sm text-zinc-500">Participants</p>

            <p className="mt-1 text-lg font-semibold">
              {event.max_participants ?? "-"}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <p className="text-sm text-zinc-500">Points</p>

            <p className="mt-1 text-lg font-semibold">
              {event.points ?? 0} pts
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <p className="text-sm text-zinc-500">Start</p>

            <p className="mt-1 text-lg font-semibold">{start.date}</p>

            <p className="text-sm font-normal text-zinc-400">
              {start.time}
              {start.offset && ` (${start.offset})`}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <p className="text-sm text-zinc-500">End</p>

            <p className="mt-1 text-lg font-semibold">{end.date}</p>

            <p className="text-sm font-normal text-zinc-400">
              {end.time}
              {end.offset && ` (${end.offset})`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
