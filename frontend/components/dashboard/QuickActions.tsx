"use client";

import { PlusCircle, Trophy, Award, BadgeCheck } from "lucide-react";
import ActionCard from "./ActionCard";
import { ActionItem } from "@/types/dashboard";

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
    title: "Create Achievement",
    description: "Design achievement template",
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
    <div
      className="
rounded-3xl
border
border-violet-500/20
bg-[#121214]

p-4
md:p-5
xl:p-6

flex
flex-col
h-full
"
    >
      <h2 className="text-lg md:text-xl font-bold">Quick Start</h2>
      <p className="mt-1 mb-5 text-xs md:text-sm text-zinc-500">
        Frequently used actions
      </p>

      <div
        className="
    flex-1

    grid
    grid-cols-1
    sm:grid-cols-2

    auto-rows-max

    gap-x-4
    gap-y-6

    content-evenly
  "
      >
        {actions.map((action) => (
          <ActionCard key={action.title} action={action} />
        ))}
      </div>
    </div>
  );
}
