"use client";

import { formatDate } from "@/lib/utils/formatDate";
import { Event } from "@/types/event";

interface Props {
  event: Event;
}

export default function EventSummary({ event }: Props) {
  return (
    <div className="grid items-stretch gap-8 lg:grid-cols-[320px_1fr]">
      {/* Left */}
      <div>
        {event.achievement?.image && (
          <div className="overflow-hidden rounded-2xl border border-zinc-800 lg:h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.achievement.image}
              alt={event.achievement.title}
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

            <p className="leading-7 whitespace-pre-wrap text-zinc-300">
              {event.description || "-"}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="mb-2 text-xs tracking-wider text-zinc-500 uppercase">
              Location
            </p>

            <p className="leading-7 whitespace-pre-wrap text-zinc-300">
              {event.location || "-"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <p className="text-sm text-zinc-500">Participants</p>

            <p className="mt-1 text-lg font-semibold">
              {event.max_participants ?? "-"}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <p className="text-sm text-zinc-500">Start Date</p>

            <p className="mt-1 text-lg font-semibold">
              {formatDate(event.start_date)}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <p className="text-sm text-zinc-500">End Date</p>

            <p className="mt-1 text-lg font-semibold">
              {formatDate(event.end_date)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
