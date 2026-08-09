"use client";

import { useState } from "react";

import { Event } from "@/types/event";

import EventSummary from "./EventSummary";

import ConfirmDialog from "@/components/ui/ConfirmDialog";
import FormActions from "@/components/ui/FormActions";
import FormSection from "@/components/ui/FormSection";

interface Props {
  event: Event;
  onDelete: () => void;
  onCancel: () => void;
}

export default function DeleteEventContent({
  event,
  onDelete,
  onCancel,
}: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <FormSection
        title="Delete Event"
        description="Review the event information before deleting."
      >
        <EventSummary event={event} />

        <FormActions
          submitText="Delete Event"
          onSubmit={() => setConfirmOpen(true)}
          onReset={onCancel}
          showReset={false}
          align="right"
        />
      </FormSection>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Event?"
        description="This action cannot be undone. Are you sure you want to permanently delete this event?"
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={onDelete}
      />
    </>
  );
}
