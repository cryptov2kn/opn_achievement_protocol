import { Achievement } from "@/types/achievement";
import AchievementDetailStat from "./AchievementDetailStat";

interface Props {
  achievement: Achievement;
}

export default function AchievementDetailInfo({ achievement }: Props) {
  return (
    <>
      <section>
        <div className="rounded-xl border border-zinc-800 bg-black p-6 py-8 transition hover:border-violet-500/30">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-2xl">📝</span>

            <h2 className="text-xl font-semibold text-white">Description</h2>
          </div>

          <p className="leading-7 whitespace-pre-wrap text-zinc-300">
            {achievement.description || "-"}
          </p>
        </div>
      </section>

      <section className="mt-8 flex flex-wrap justify-center gap-6">
        <div className="w-full max-w-sm">
          <AchievementDetailStat
            icon="🕒"
            title="Created"
            value={new Date(achievement.created_at).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              },
            )}
          />
        </div>

        <div className="w-full max-w-sm">
          <AchievementDetailStat
            icon="📅"
            title="Expiration"
            value={
              achievement.expiration
                ? new Date(achievement.expiration).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "-"
            }
          />
        </div>
      </section>
    </>
  );
}
