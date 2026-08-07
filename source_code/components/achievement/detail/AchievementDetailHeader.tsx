import { Achievement } from "@/types/achievement";

interface Props {
  achievement: Achievement;
}

export default function AchievementDetailHeader({ achievement }: Props) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-white">
        {achievement.title}
      </h1>

      <p className="mt-2 text-sm text-zinc-500">
        Achievement created by issuer
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <span className="rounded-full bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-300">
          📚 {achievement.category}
        </span>

        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300">
          🌱 {achievement.difficulty}
        </span>
      </div>
    </div>
  );
}
