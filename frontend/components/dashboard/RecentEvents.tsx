import { CalendarDays } from "lucide-react";

export default function RecentEvents() {
  const events = [
    "OPN Hackathon",
    "AI Bootcamp",
    "Solidity Workshop",
    "Blockchain Summit",
    "AI Bootcamp",
    "Solidity Workshop",
    "Blockchain Summit",
  ];

  return (
    <div
      className="
    rounded-3xl

    border
    border-violet-500/20

    bg-zinc-900/60
    backdrop-blur-xl

    p-4
    md:p-5
    xl:p-6
  "
    >
      <h2 className=" text-lg md:text-xl font-bold mb-6">Upcoming Events</h2>

      <div
        className="
          min-h-[240px]
          max-h-[320px]
          overflow-y-auto
          dashboard-scroll
          space-y-4
          pr-2
        "
      >
        {events.map((event) => (
          <div
            key={event}
            className="
    group

    flex
    items-center
    gap-4

    p-3
    md:p-4

    rounded-2xl

    bg-zinc-800/60

    border
    border-transparent

    transition-all
    duration-300

    hover:border-violet-500/30
    hover:bg-zinc-800
    hover:shadow-[0_0_25px_rgba(139,92,246,0.18)]

    cursor-pointer
  "
          >
            <div
              className="
      w-9
      h-9

      rounded-xl

      bg-violet-500/10

      flex
      items-center
      justify-center

      shrink-0
    "
            >
              <CalendarDays className="w-4 h-4 text-violet-400" />
            </div>

            <div>
              <p
                className="
        text-sm
        md:text-base

        font-medium

        text-zinc-200

        transition-colors

        group-hover:text-white
      "
              >
                {event}
              </p>

              <p className="text-xs text-zinc-500 mt-1">Upcoming event</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
