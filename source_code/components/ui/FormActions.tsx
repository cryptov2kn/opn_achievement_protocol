"use client";

import Button from "@/components/ui/Button";

interface FormActionsProps {
  submitText: string;
  resetText?: string;

  onSubmit: () => void;
  onReset?: () => void;

  isSubmitting?: boolean;
  submitDisabled?: boolean;

  align?: "center" | "right";
  showReset?: boolean;
}

export default function FormActions({
  submitText,
  resetText = "Reset",
  onSubmit,
  onReset,
  isSubmitting = false,
  submitDisabled = false,
  align = "center",
  showReset = true,
}: FormActionsProps) {
  return (
    <div
      className={`flex flex-col gap-4 pt-8 sm:flex-row ${
        align === "right" ? "sm:justify-end" : "sm:justify-center"
      }`}
    >
      {showReset && onReset && (
        <Button
          variant="danger"
          type="button"
          size="lg"
          onClick={onReset}
          disabled={isSubmitting}
        >
          {resetText}
        </Button>
      )}

      <Button
        variant="primary"
        type="button"
        size="lg"
        onClick={onSubmit}
        disabled={isSubmitting || submitDisabled}
      >
        {isSubmitting ? "Processing..." : submitText}
      </Button>
    </div>
  );
}
