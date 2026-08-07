"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import DashboardContent from "@/components/layout/DashboardContent";
import DashboardLoading from "@/components/layout/DashboardLoading";

import DeleteAchievementContent from "@/components/achievement/DeleteAchievementContent";

import DataState from "@/components/ui/DataState";
import { useAchievementDetail } from "@/hooks/achievement/useAchievementDetail";
import { useNotification } from "@/hooks/common/useNotification";
import { useWallet } from "@/hooks/useWallet";
import { deleteAchievement } from "@/lib/achievement/deleteAchievement";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function DeleteAchievementPage({ params }: Props) {
  const { id } = use(params);

  const router = useRouter();

  const notify = useNotification();

  const { address, isConnected } = useWallet();

  const { achievement, loading } = useAchievementDetail(id);

  async function handleDelete() {
    if (!isConnected || !address) {
      notify.warning("Please connect your wallet first.");
      return;
    }
    try {
      const result = await deleteAchievement(id, address);

      if (!result.success) {
        notify.error(result.error);
        return;
      }

      notify.success("Achievement deleted successfully.");

      setTimeout(() => {
        router.replace("/achievements/list");
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
        <DeleteAchievementContent
          achievement={achievement}
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      </DashboardContent>
    </main>
  );
}
