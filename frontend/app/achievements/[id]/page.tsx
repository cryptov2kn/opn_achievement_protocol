"use client";

import { use } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import DataState from "@/components/ui/DataState";

import AchievementDetailContent from "@/components/achievement/AchievementDetailContent";
import DashboardContent from "@/components/layout/DashboardContent";
import DashboardLoading from "@/components/layout/DashboardLoading";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

import { useAchievementDetail } from "@/hooks/achievement/useAchievementDetail";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function AchievementDetailPage({ params }: Props) {
  const { id } = use(params);

  //const router = useRouter();

  const { achievement, loading } = useAchievementDetail(id);

  if (loading) {
    return <DashboardLoading text="Loading achievement..." />;
  }

  if (!achievement) {
    return (
      <main className="flex min-h-screen bg-zinc-950 text-white">
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
                },
              ]}
            />
          }
        >
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
              },
            ]}
          />
        }
      >
        <AchievementDetailContent achievement={achievement} />
      </DashboardContent>
    </main>
  );
}
