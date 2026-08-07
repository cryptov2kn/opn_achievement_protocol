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
    <div className="rounded-3xl border border-violet-500/20 bg-zinc-900/60 p-4 backdrop-blur-xl md:p-5 xl:p-6">
      <h2 className="mb-6 text-lg font-bold md:text-xl">Upcoming Events</h2>

      <div className="dashboard-scroll max-h-[320px] min-h-[240px] space-y-4 overflow-y-auto pr-2">
        {events.map((event) => (
          <div
            key={event}
            className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-transparent bg-zinc-800/60 p-3 transition-all duration-300 hover:border-violet-500/30 hover:bg-zinc-800 hover:shadow-[0_0_25px_rgba(139,92,246,0.18)] md:p-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
              <CalendarDays className="h-4 w-4 text-violet-400" />
            </div>

            <div>
              <p className="text-sm font-medium text-zinc-200 transition-colors group-hover:text-white md:text-base">
                {event}
              </p>

              <p className="mt-1 text-xs text-zinc-500">Upcoming event</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
