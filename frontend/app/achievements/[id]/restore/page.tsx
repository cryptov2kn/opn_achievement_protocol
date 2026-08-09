"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import RestoreAchievementContent from "@/components/achievement/RestoreAchievementContent";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardContent from "@/components/layout/DashboardContent";
import DashboardLoading from "@/components/layout/DashboardLoading";
import DataState from "@/components/ui/DataState";

import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { useAchievementDetail } from "@/hooks/achievement/useAchievementDetail";
import { useNotification } from "@/hooks/common/useNotification";
import { useWallet } from "@/hooks/useWallet";

import { restoreAchievement } from "@/lib/achievement/restoreAchievement";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function RestoreAchievementPage({ params }: Props) {
  const { id } = use(params);

  const router = useRouter();

  const notify = useNotification();

  const { address, isConnected } = useWallet();

  const { achievement, loading } = useAchievementDetail(id);

  async function handleRestore() {
    if (!isConnected || !address) {
      notify.warning("Please connect your wallet first.");
      return;
    }

    const achievementId = id!;

    try {
      const result = await restoreAchievement(achievementId, address);

      if (!result.success) {
        notify.error(result.error);
        return;
      }

      notify.success("Achievement restored successfully.");

      setTimeout(() => {
        router.replace(`/achievements/${achievementId}`);
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

        <DashboardContent
          breadcrumb={
            <PageBreadcrumb
              items={[
                {
                  label: "Achievement List",
                  href: "/achievements/list",
                },
                {
                  label: "Detail",
                  href: `/achievements/${id}`,
                },
                {
                  label: "Restore",
                },
              ]}
            />
          }
        >
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

      <DashboardContent
        breadcrumb={
          <PageBreadcrumb
            items={[
              {
                label: "Achievement List",
                href: "/achievements/list",
              },
              {
                label: "Detail",
                href: `/achievements/${id}`,
              },
              {
                label: "Restore",
              },
            ]}
          />
        }
      >
        <RestoreAchievementContent
          achievement={achievement}
          onRestore={handleRestore}
          onCancel={handleCancel}
        />
      </DashboardContent>
    </main>
  );
}
