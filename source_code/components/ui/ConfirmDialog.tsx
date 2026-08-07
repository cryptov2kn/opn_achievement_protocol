"use client";

import Button from "@/components/ui/Button";
import FormSection from "@/components/ui/FormSection";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;

  confirmText?: string;
  cancelText?: string;

  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg">
        <FormSection title={title} description={description}>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={onCancel}>
              {cancelText}
            </Button>

            <Button variant="danger" onClick={onConfirm}>
              {confirmText}
            </Button>
          </div>
        </FormSection>
      </div>
    </div>
  );
}
