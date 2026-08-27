"use client";

import { use } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import DashboardContent from "@/components/layout/DashboardContent";
import DashboardLoading from "@/components/layout/DashboardLoading";
import DataState from "@/components/ui/DataState";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

import CredentialDetailContent from "@/components/credential/CredentialDetailContent";
import { useCredentialDetail } from "@/hooks/credential/useCredentialDetail";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function CredentialDetailPage({ params }: Props) {
  const { id } = use(params);

  const { credential, loading } = useCredentialDetail(id);

  if (loading) {
    return <DashboardLoading text="Loading credential..." />;
  }

  if (!credential) {
    return (
      <main className="flex min-h-screen bg-zinc-950 text-white">
        <Sidebar />

        <DashboardContent
          breadcrumb={
            <PageBreadcrumb
              items={[
                {
                  label: "Credential List",
                  href: "/credentials/list",
                },
                {
                  label: "Detail",
                },
              ]}
            />
          }
        >
          <DataState
            title="Credential Not Found"
            description="This credential does not exist or is no longer available."
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
                label: "Credential List",
                href: "/credentials/list",
              },
              {
                label: "Detail",
              },
            ]}
          />
        }
      >
        <CredentialDetailContent credential={credential} />
      </DashboardContent>
    </main>
  );
}
