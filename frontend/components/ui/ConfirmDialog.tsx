"use client";

import { createPortal } from "react-dom";

import Button from "@/components/ui/Button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;

  confirmText?: string;
  cancelText?: string;

  children?: React.ReactNode;

  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  children,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-violet-500/20 bg-zinc-950 p-6 shadow-2xl">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-white">{title}</h2>

          {description && (
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {description}
            </p>
          )}
        </div>

        {/* Optional custom content */}
        {children && <div className="mt-5">{children}</div>}

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel}>
            {cancelText}
          </Button>

          <Button variant="danger" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
