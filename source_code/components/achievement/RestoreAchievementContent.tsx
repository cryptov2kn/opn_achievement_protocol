"use client";

import { useState } from "react";

import { Achievement } from "@/types/achievement";

import AchievementSummary from "./AchievementSummary";

import ConfirmDialog from "@/components/ui/ConfirmDialog";
import FormActions from "@/components/ui/FormActions";
import FormSection from "@/components/ui/FormSection";

interface Props {
  achievement: Achievement;
  onRestore: () => void;
  onCancel: () => void;
}

export default function RestoreAchievementContent({
  achievement,
  onRestore,
  onCancel,
}: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <FormSection
        title="Restore Achievement"
        description="Review the achievement before restoring it."
      >
        <AchievementSummary achievement={achievement} />

        <FormActions
          submitText="Restore Achievement"
          onSubmit={() => setConfirmOpen(true)}
          onReset={onCancel}
          showReset={false}
          align="right"
        />
      </FormSection>

      <ConfirmDialog
        open={confirmOpen}
        title="Restore Achievement?"
        description="This achievement will become active again and can be edited or issued."
        confirmText="Restore"
        cancelText="Cancel"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={onRestore}
      />
    </>
  );
}
