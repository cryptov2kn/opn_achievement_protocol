"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import DashboardContent from "@/components/layout/DashboardContent";
import DashboardLoading from "@/components/layout/DashboardLoading";

import ArchiveAchievementContent from "@/components/achievement/ArchiveAchievementContent";

import DataState from "@/components/ui/DataState";

import { useAchievementDetail } from "@/hooks/achievement/useAchievementDetail";
import { useNotification } from "@/hooks/common/useNotification";
import { useWallet } from "@/hooks/useWallet";

import { archiveAchievement } from "@/lib/achievement/archiveAchievement";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function ArchiveAchievementPage({ params }: Props) {
  const { id } = use(params);

  const router = useRouter();

  const notify = useNotification();

  const { address, isConnected } = useWallet();

  const { achievement, loading } = useAchievementDetail(id);

  async function handleArchive() {
    if (!isConnected || !address) {
      notify.warning("Please connect your wallet first.");
      return;
    }

    try {
      const result = await archiveAchievement(id, address);

      if (!result.success) {
        notify.error(result.error);
        return;
      }

      notify.success("Achievement archived successfully.");

      setTimeout(() => {
        router.replace(`/achievements/${id}`);
      }, 800);
    } catch (error) {
      console.error(error);

      notify.error("Something went wrong.");
    }
  }

  function handleCancel() {
    router.back();
  }

  if (loading) {
    return <DashboardLoading text="Loading achievement..." />;
  }

  if (!achievement) {
    return (
      <main className="flex min-h-screen bg-[#0b0b0d] text-white">
        <Sidebar />

        <DashboardContent>
          <DataState
            title="Achievement not found"
            description="The achievement may have been deleted or does not exist."
            buttonText="Back to List"
            onButtonClick={() => router.replace("/achievements/list")}
          />
        </DashboardContent>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen bg-[#0b0b0d] text-white">
      <Sidebar />

      <DashboardContent>
        <ArchiveAchievementContent
          achievement={achievement}
          onArchive={handleArchive}
          onCancel={handleCancel}
        />
      </DashboardContent>
    </main>
  );
}
