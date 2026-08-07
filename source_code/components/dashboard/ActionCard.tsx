"use client";

import { ActionItem } from "@/types/dashboard";
import Link from "next/link";

interface ActionCardProps {
  action: ActionItem;
}

export default function ActionCard({ action }: ActionCardProps) {
  const Icon = action.icon;

  return (
    <Link
      href={action.href}
      className="group h-full min-h-[145px] rounded-2xl border border-zinc-800 bg-zinc-800/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-violet-500/5 md:min-h-[155px] xl:min-h-[165px]"
    >
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 transition-colors group-hover:bg-violet-500/20">
          <Icon className="h-5 w-5 text-violet-400" />
        </div>

        <h3 className="text-sm leading-5 font-semibold text-white">
          {action.title}
        </h3>

        <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-500">
          {action.description}
        </p>
      </div>
    </Link>
  );
}
