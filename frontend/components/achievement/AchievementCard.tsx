"use client";

import Button from "@/components/ui/Button";
import { getAchievementStatus } from "@/lib/achievement/getAchievementStatus";
import { Achievement } from "@/types/achievement";
import { clsx } from "clsx";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  achievement: Achievement;
}

export default function AchievementCard({ achievement }: Props) {
  const router = useRouter();
  const status = getAchievementStatus(achievement);

  const STATUS_BADGES = {
    live: {
      label: "Live",
      className: "bg-emerald-500/90 text-white",
    },
    ended: {
      label: "Ended",
      className: "bg-red-500/90 text-white",
    },
    archived: {
      label: "Archived",
      className: "bg-zinc-600/90 text-white",
    },
  } as const;

  const badge = STATUS_BADGES[status];
  return (
    <div
      onClick={() => router.push(`/achievements/${achievement.id}`)}
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

        {achievement.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={achievement.image}
            alt={achievement.title}
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
          {achievement.title}
        </h3>

        {/* Category + Difficulty */}
        <div className="mt-4 flex items-center justify-center gap-2 text-sm">
          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-violet-300">
            {achievement.category}
          </span>

          <span className="text-zinc-600">•</span>

          <span className="rounded-full bg-zinc-800 px-3 py-1 text-zinc-300">
            {achievement.difficulty}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-md">⭐</span>

          <span className="text-md font-bold text-amber-400">
            {achievement.points ?? 0} pts
          </span>
        </div>

        {/* Date */}
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-zinc-500">
          <CalendarDays className="h-5 w-5" />

          <span>{new Date(achievement.created_at).toLocaleDateString()}</span>
        </div>

        {/* Action */}
        <div className="mt-auto flex justify-center gap-2 pt-6">
          <Link
            href={`/achievements/${achievement.id}/edit`}
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="primary" size="lg">
              Edit
            </Button>
          </Link>

          <Link
            href={`/achievements/${achievement.id}/delete`}
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
