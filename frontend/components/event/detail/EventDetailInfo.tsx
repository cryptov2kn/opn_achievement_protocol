import { Event } from "@/types/event";
import { DateTime } from "luxon";
import EventDetailStat from "./EventDetailStat";

interface Props {
  event: Event;
}

export default function EventDetailInfo({ event }: Props) {
  const startDateTime = event.start_at
    ? DateTime.fromISO(event.start_at).toLocal()
    : null;

  const endDateTime = event.end_at
    ? DateTime.fromISO(event.end_at).toLocal()
    : null;

  function formatDateTime(dateTime: DateTime | null) {
    if (!dateTime) {
      return {
        date: "-",
        time: "-",
        offset: "",
      };
    }

    return {
      date: dateTime.toFormat("MMM dd, yyyy"),
      time: dateTime.toFormat("HH:mm"),
      offset: `UTC${dateTime.toFormat("ZZ").slice(0, 3)}`,
    };
  }

  const start = formatDateTime(startDateTime);
  const end = formatDateTime(endDateTime);
  return (
    <>
      {/* Description */}
      <section>
        <div className="rounded-xl border border-zinc-800 bg-black p-6 py-8 transition hover:border-violet-500/30">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-2xl">📝</span>

            <h2 className="text-xl font-semibold text-white">Description</h2>
          </div>

          <p className="leading-7 whitespace-pre-wrap text-zinc-300">
            {event.description || "-"}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        <EventDetailStat
          icon="👥"
          title="Participants"
          value={event.max_participants ?? "-"}
        />

        <EventDetailStat
          icon="⭐"
          title="Points"
          value={`${event.points ?? 0} pts`}
        />

        <EventDetailStat
          icon="📅"
          title="Start"
          value={
            <div>
              <div>{start.date}</div>

              <div className="mt-1 text-sm font-normal text-zinc-400">
                {start.time}
                {start.offset && ` (${start.offset})`}
              </div>
            </div>
          }
        />

        <EventDetailStat
          icon="🏁"
          title="End"
          value={
            <div>
              <div>{end.date}</div>

              <div className="mt-1 text-sm font-normal text-zinc-400">
                {end.time}
                {end.offset && ` (${end.offset})`}
              </div>
            </div>
          }
        />
      </section>
    </>
  );
}
