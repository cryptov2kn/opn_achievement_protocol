"use client";

import { ActionItem } from "@/types/dashboard";
import { Award, BadgeCheck, PlusCircle, Trophy } from "lucide-react";
import ActionCard from "./ActionCard";

const actions: ActionItem[] = [
  {
    title: "Register Issuer",
    description: "Create issuer profile",
    href: "/issuer/register",
    icon: PlusCircle,
  },
  {
    title: "Create Event",
    description: "Create a new event",
    href: "/events/create",
    icon: Trophy,
  },
  {
    title: "New Achievement",
    description: "Design achievement",
    href: "/achievements/create",
    icon: Award,
  },
  {
    title: "Issue Credential",
    description: "Mint credentials",
    href: "/credentials/issue",
    icon: BadgeCheck,
  },
];

export default function QuickActions() {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-violet-500/20 bg-[#121214] p-4 md:p-5 xl:p-6">
      <h2 className="text-lg font-bold md:text-xl">Quick Start</h2>
      <p className="mt-1 mb-5 text-xs text-zinc-500 md:text-sm">
        Frequently used actions
      </p>

      <div className="grid flex-1 auto-rows-max grid-cols-1 content-evenly gap-x-4 gap-y-6 sm:grid-cols-2">
        {actions.map((action) => (
          <ActionCard key={action.title} action={action} />
        ))}
      </div>
    </div>
  );
}
