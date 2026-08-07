"use client";

import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  disabled = false,
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        // Base style
        "rounded-2xl font-semibold backdrop-blur-md transition-all duration-300",
        "hover:-translate-y-0.5",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        "disabled:hover:translate-y-0",
        "disabled:hover:shadow-none",

        {
          "h-10 px-4 text-sm": size === "sm",
          "h-12 px-6": size === "md",
          "h-14 px-8 text-lg": size === "lg",
        },

        // Variants
        {
          "border border-violet-400/30 bg-violet-500/20 text-violet-200 hover:border-violet-300 hover:bg-violet-500/30 hover:shadow-lg hover:shadow-violet-500/20":
            variant === "primary",

          "border border-zinc-600 bg-zinc-800 text-zinc-200 hover:border-zinc-500 hover:bg-zinc-700":
            variant === "secondary",

          "border border-red-500/30 bg-red-500/10 text-red-300 hover:border-red-400 hover:bg-red-500/20 hover:shadow-lg hover:shadow-red-500/20":
            variant === "danger",
        },

        className,
      )}
    >
      {children}
    </button>
  );
}
