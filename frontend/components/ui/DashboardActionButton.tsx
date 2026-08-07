"use client";

import clsx from "clsx";

interface DashboardActionButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function DashboardActionButton({
  children,
  variant = "secondary",
  onClick,
  disabled = false,
  className,
}: DashboardActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-medium transition-all duration-200 sm:h-11 sm:px-5",
        "disabled:cursor-not-allowed disabled:opacity-40",

        {
          "border border-zinc-700 bg-zinc-800 text-zinc-200 hover:border-zinc-500 hover:bg-zinc-700":
            variant === "secondary",

          "border border-violet-500/30 bg-violet-500/20 text-violet-200 hover:border-violet-400 hover:bg-violet-500/30":
            variant === "primary",
        },

        className,
      )}
    >
      {children}
    </button>
  );
}
