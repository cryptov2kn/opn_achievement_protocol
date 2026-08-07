"use client";

import { useState } from "react";

import { Achievement } from "@/types/achievement";

import AchievementSummary from "./AchievementSummary";

import ConfirmDialog from "@/components/ui/ConfirmDialog";

import FormActions from "@/components/ui/FormActions";

import FormSection from "@/components/ui/FormSection";

interface Props {
  achievement: Achievement;

  onDelete: () => void;

  onCancel: () => void;
}

export default function DeleteAchievementContent({
  achievement,
  onDelete,
  onCancel,
}: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <FormSection
        title="Delete Achievement"
        description="Review the achievement information before deleting."
      >
        <AchievementSummary achievement={achievement} />

        <FormActions
          submitText="Delete Achievement"
          onSubmit={() => setConfirmOpen(true)}
          onReset={onCancel}
          showReset={false}
          align="right"
        />
      </FormSection>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Achievement?"
        description="This action cannot be undone. Are you sure you want to permanently delete this achievement?"
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={onDelete}
      />
    </>
  );
}
