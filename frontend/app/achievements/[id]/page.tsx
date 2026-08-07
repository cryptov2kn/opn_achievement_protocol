"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import Sidebar from "@/components/dashboard/Sidebar";

import DataState from "@/components/ui/DataState";

import AchievementDetailActions from "@/components/achievement/detail/AchievementDetailActions";
import AchievementDetailHeader from "@/components/achievement/detail/AchievementDetailHeader";
import AchievementDetailImage from "@/components/achievement/detail/AchievementDetailImage";
import AchievementDetailInfo from "@/components/achievement/detail/AchievementDetailInfo";
import AchievementDetailMetadata from "@/components/achievement/detail/AchievementDetailMetadata";
import DashboardContent from "@/components/layout/DashboardContent";
import DashboardLoading from "@/components/layout/DashboardLoading";
import DetailSection from "@/components/ui/DetailSection";

import { useAchievementDetail } from "@/hooks/achievement/useAchievementDetail";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function AchievementDetailPage({ params }: Props) {
  const { id } = use(params);

  const router = useRouter();

  const { achievement, loading } = useAchievementDetail(id);

  if (loading) {
    return <DashboardLoading text="Loading achievement..." />;
  }

  if (!achievement) {
    return (
      <main className="flex min-h-screen bg-zinc-950 text-white">
        <Sidebar />

        <DashboardContent>
          <DataState
            title="Achievement not found"
            description="This achievement does not exist."
          />
        </DashboardContent>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <DashboardContent>
        <div className="mx-auto max-w-6xl">
          <DetailSection
            header={
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-5 py-3 text-sm font-semibold text-violet-200 transition-all duration-200 hover:border-violet-400 hover:bg-violet-500/20 hover:text-white hover:shadow-[0_0_24px_rgba(139,92,246,0.18)]"
              >
                ← Back to Achievement List
              </button>
            }
          >
            <AchievementDetailImage image={achievement.image} />

            <AchievementDetailHeader achievement={achievement} />

            <AchievementDetailInfo achievement={achievement} />

            <AchievementDetailMetadata achievement={achievement} />

            <AchievementDetailActions
              achievementId={achievement.id}
              status={achievement.status}
            />
          </DetailSection>
        </div>
      </DashboardContent>
    </main>
  );
}
