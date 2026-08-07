import { BadgeCheck, Calendar, Trophy, Users } from "lucide-react";

export default function StatsCards() {
  const stats = [
    {
      title: "Events",
      value: 12,
      icon: Calendar,
    },
    {
      title: "Achievements",
      value: 43,
      icon: Trophy,
    },
    {
      title: "Credentials",
      value: 2450,
      icon: BadgeCheck,
    },
    {
      title: "Recipients",
      value: 892,
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex min-h-[150px] flex-col items-center justify-center rounded-3xl border border-violet-500/20 bg-zinc-900/60 p-2 text-center backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-violet-500 hover:shadow-[0_0_35px_rgba(139,92,246,0.25)] lg:p-3"
          >
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/10 lg:h-12 lg:w-12">
              <Icon className="h-5 w-5 text-violet-400 lg:h-6 lg:w-6" />
            </div>

            <h2 className="mt-3 text-2xl font-bold lg:mt-4 lg:text-3xl">
              {item.value}
            </h2>

            <p className="mt-2 text-sm text-zinc-400 lg:text-base">
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
