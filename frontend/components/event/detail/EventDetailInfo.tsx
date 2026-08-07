import { Event } from "@/types/event";
import EventDetailStat from "./EventDetailStat";

interface Props {
  event: Event;
}

export default function EventDetailInfo({ event }: Props) {
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
      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <EventDetailStat
          icon="👥"
          title="Participants"
          value={event.max_participants ?? "-"}
        />

        <EventDetailStat
          icon="📅"
          title="Start Date"
          value={
            event.start_date
              ? new Date(event.start_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "-"
          }
        />

        <EventDetailStat
          icon="🏁"
          title="End Date"
          value={
            event.end_date
              ? new Date(event.end_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "-"
          }
        />
      </section>
    </>
  );
}
