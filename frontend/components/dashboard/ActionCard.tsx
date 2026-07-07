"use client";

import Link from "next/link";
import { ActionItem } from "@/types/dashboard";

interface ActionCardProps {
  action: ActionItem;
}

export default function ActionCard({ action }: ActionCardProps) {
  const Icon = action.icon;

  return (
    <Link
      href={action.href}
      className="
      group

      h-full
      min-h-[170px]

      rounded-2xl
      border
      border-zinc-800

      bg-zinc-800/40

      p-4
      lg:p-5

      transition-all
      duration-300

      hover:border-violet-500/40
      hover:bg-violet-500/5
      hover:-translate-y-1
      "
    >
      <div className="flex flex-col items-center justify-center text-center h-full">
        <div
          className="
      w-9
      h-9

      lg:w-10
      lg:h-10
      rounded-lg
      bg-violet-500/10

      flex
      items-center
      justify-center

      mb-4

      group-hover:bg-violet-500/20
      transition-colors
    "
        >
          <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-violet-400" />
        </div>

        <h3 className="text-sm lg:text-[15px] font-semibold text-white leading-5">
          {action.title}
        </h3>

        <p className="mt-2 text-[11px] lg:text-xs leading-5 text-zinc-500 line-clamp-2">
          {action.description}
        </p>
      </div>
    </Link>
  );
}
