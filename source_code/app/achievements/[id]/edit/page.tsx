"use client";

import { use } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import DashboardContent from "@/components/layout/DashboardContent";

import { useEffect, useState } from "react";

import AchievementEditForm from "@/components/achievement/AchievementEditForm";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useAchievementDetail } from "@/hooks/achievement/useAchievementDetail";
import { achievementToForm } from "@/lib/achievement/achievementToForm";

import DashboardLoading from "@/components/layout/DashboardLoading";
import { useNotification } from "@/hooks/common/useNotification";
import { useWallet } from "@/hooks/useWallet";
import { updateAchievement } from "@/lib/achievement/updateAchievement";
import { useRouter } from "next/navigation";

import DataState from "@/components/ui/DataState";
import {
  AchievementFormData,
  achievementFormDefault,
} from "@/types/achievement";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function EditAchievementPage({ params }: Props) {
  const { id } = use(params);

  const notify = useNotification();

  const { address, isConnected } = useWallet();

  const router = useRouter();

  const { achievement, loading } = useAchievementDetail(id);

  const [form, setForm] = useState<AchievementFormData>(achievementFormDefault);

  const [initialForm, setInitialForm] = useState<AchievementFormData>(
    achievementFormDefault,
  );

  const [confirmOpen, setConfirmOpen] = useState(false);

  const hasChanges = JSON.stringify(form) !== JSON.stringify(initialForm);

  async function doUpdate() {
    if (!isConnected || !address) {
      notify.warning("Please connect your wallet first.");
      return;
    }
    try {
      const result = await updateAchievement(id, form, address);

      if (!result.success) {
        notify.error(result.error);
        return;
      }

      notify.success("Achievement updated successfully.");
      // update data
      setInitialForm({ ...form });

      setTimeout(() => {
        router.replace(`/achievements/${id}`);
      }, 800);
    } catch (error) {
      console.error(error);

      notify.error("Something went wrong.");
    }
  }

  function handleUpdate() {
    if (!hasChanges) return;

    setConfirmOpen(true);
  }

  async function handleConfirmUpdate() {
    setConfirmOpen(false);
    await doUpdate();
  }

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      if (!hasChanges) return;

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);

    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [hasChanges]);

  useEffect(() => {
    if (!achievement) return;

    const next = achievementToForm(achievement);

    queueMicrotask(() => {
      setInitialForm(next);
      setForm(next);
    });
  }, [achievement]);

  if (loading) {
    return <DashboardLoading text="Loading achievement..." />;
  }

  if (achievement?.status === "archived") {
    return (
      <main className="flex min-h-screen bg-[#0b0b0d] text-white">
        <Sidebar />

        <DashboardContent>
          <DataState
            title="Achievement Archived"
            description="Archived achievements cannot be edited. Restore it first if you want to make changes."
            buttonText="Back to Detail"
            onButtonClick={() => router.replace(`/achievements/${id}`)}
          />
        </DashboardContent>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen bg-[#0b0b0d] text-white">
      <Sidebar />
      <DashboardContent>
        <AchievementEditForm
          form={form}
          setForm={setForm}
          initialForm={initialForm}
          hasChanges={hasChanges}
          onSubmit={handleUpdate}
        />
      </DashboardContent>

      <ConfirmDialog
        open={confirmOpen}
        title="Save Changes?"
        description="Are you sure you want to save changes to this achievement?"
        confirmText="Save Changes"
        cancelText="Cancel"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmUpdate}
      />
    </main>
  );
}
