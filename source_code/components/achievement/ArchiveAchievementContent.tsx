"use client";

import { useState } from "react";

import { Achievement } from "@/types/achievement";

import AchievementSummary from "./AchievementSummary";

import ConfirmDialog from "@/components/ui/ConfirmDialog";
import FormActions from "@/components/ui/FormActions";
import FormSection from "@/components/ui/FormSection";

interface Props {
  achievement: Achievement;

  onArchive: () => void;

  onCancel: () => void;
}

export default function ArchiveAchievementContent({
  achievement,
  onArchive,
  onCancel,
}: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <FormSection
        title="Archive Achievement"
        description="Archived achievements are hidden from active listings but remain available for historical records."
      >
        <AchievementSummary achievement={achievement} />

        <FormActions
          submitText="Archive Achievement"
          onSubmit={() => setConfirmOpen(true)}
          onReset={onCancel}
          showReset={false}
          align="right"
        />
      </FormSection>

      <ConfirmDialog
        open={confirmOpen}
        title="Archive Achievement?"
        description="This achievement will no longer appear in the active achievement list. You can restore it later if needed."
        confirmText="Archive"
        cancelText="Cancel"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={onArchive}
      />
    </>
  );
}
