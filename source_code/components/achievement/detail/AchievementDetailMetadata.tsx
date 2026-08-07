import { Achievement } from "@/types/achievement";

interface Props {
  achievement: Achievement;
}

export default function AchievementDetailMetadata({ achievement }: Props) {
  return (
    <section className="mt-8 border-t border-zinc-800 pt-8">
      <div className="rounded-xl border border-zinc-800 bg-black p-6 py-8 transition hover:border-violet-500/30">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl">📄</span>

          <h2 className="text-xl font-semibold text-white">Metadata</h2>
        </div>

        <p className="leading-7 whitespace-pre-wrap text-zinc-300">
          {achievement.metadata?.note || "-"}
        </p>
      </div>
    </section>
  );
}
