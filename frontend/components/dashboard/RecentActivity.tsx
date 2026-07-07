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
      <h2
        className="
    text-lg
    md:text-xl

    font-bold

    mb-6
  "
      >
        Recent Activity
      </h2>

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
        {activities.map((item) => (
          <div
            key={item}
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
              <Activity className="w-4 h-4 text-violet-400" />
            </div>

            <p
              className="
      text-sm
      md:text-base

      leading-6

      text-zinc-200

      transition-colors

      group-hover:text-white
    "
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
