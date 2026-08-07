import { Activity } from "lucide-react";

export default function RecentActivity() {
  const activities = [
    "Issued Blockchain Basics credential",
    "Created AI Specialist achievement",
    "127 users completed event",
    "Issued Solidity Master credential",
    "Created OPN Hackathon achievement",
    "500 users joined event",
  ];

  return (
    <div className="rounded-3xl border border-violet-500/20 bg-zinc-900/60 p-4 backdrop-blur-xl md:p-5 xl:p-6">
      <h2 className="mb-6 text-lg font-bold md:text-xl">Recent Activity</h2>

      <div className="dashboard-scroll max-h-[320px] min-h-[240px] space-y-4 overflow-y-auto pr-2">
        {activities.map((item) => (
          <div
            key={item}
            className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-transparent bg-zinc-800/60 p-3 transition-all duration-300 hover:border-violet-500/30 hover:bg-zinc-800 hover:shadow-[0_0_25px_rgba(139,92,246,0.18)] md:p-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
              <Activity className="h-4 w-4 text-violet-400" />
            </div>

            <p className="text-sm leading-6 text-zinc-200 transition-colors group-hover:text-white md:text-base">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
