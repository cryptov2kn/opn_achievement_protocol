"use client";

import { createPortal } from "react-dom";

import Button from "@/components/ui/Button";

interface ComingSoonDialogProps {
  open: boolean;
  featureName: string;
  onClose: () => void;
}

export default function ComingSoonDialog({
  open,
  featureName,
  onClose,
}: ComingSoonDialogProps) {
  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-violet-500/20 bg-zinc-950 p-6 shadow-2xl">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-white">
            Feature Under Development
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            <span className="font-medium text-violet-400">{featureName}</span>{" "}
            is currently under development and will be available in a future
            update.
          </p>
        </div>

        {/* Action */}
        <div className="mt-6 flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            OK
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
