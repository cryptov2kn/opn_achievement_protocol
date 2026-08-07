"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  Activity,
  Award,
  BadgeCheck,
  BarChart3,
  Building2,
  Calendar,
  ChevronRight,
  FileBadge2,
  FilePlus2,
  LayoutDashboard,
  PlusCircle,
  ScrollText,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const getCurrentMenu = () => {
    if (pathname.startsWith("/issuer")) return "issuer";
    if (pathname.startsWith("/events")) return "events";
    if (pathname.startsWith("/achievements")) return "achievements";
    if (pathname.startsWith("/credentials")) return "credentials";

    return "dashboard";
  };

  const [openMenu, setOpenMenu] = useState(getCurrentMenu);

  const currentMenu = getCurrentMenu();

  const menuGroups = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      children: [
        {
          text: "Overview",
          href: "/dashboard",
          icon: <LayoutDashboard size={16} />,
        },
        {
          text: "Analytics",
          href: "/dashboard/analytics",
          icon: <BarChart3 size={16} />,
        },
        {
          text: "Activity",
          href: "/dashboard/activity",
          icon: <Activity size={16} />,
        },
      ],
    },

    {
      id: "issuer",
      title: "Issuer",
      icon: <Building2 size={18} />,
      children: [
        {
          text: "Register Issuer",
          href: "/issuer/register",
          icon: <PlusCircle size={16} />,
        },
        {
          text: "Issuer Profile",
          href: "/issuer/profile",
          icon: <UserRound size={16} />,
        },
        {
          text: "Team Members",
          href: "/issuer/team",
          icon: <Users size={16} />,
        },
        {
          text: "Verification",
          href: "/issuer/verification",
          icon: <ShieldCheck size={16} />,
        },
      ],
    },

    {
      id: "achievements",
      title: "Achievements",
      icon: <Award size={18} />,
      children: [
        {
          text: "Achievement List",
          href: "/achievements/list",
          icon: <ScrollText size={16} />,
        },
        {
          text: "Create Achievement",
          href: "/achievements/create",
          icon: <PlusCircle size={16} />,
        },
      ],
    },

    {
      id: "events",
      title: "Events",
      icon: <Calendar size={18} />,
      children: [
        {
          text: "All Events",
          href: "/events/list",
          icon: <Calendar size={16} />,
        },
        {
          text: "Create Event",
          href: "/events/create",
          icon: <FilePlus2 size={16} />,
        },
      ],
    },

    {
      id: "credentials",
      title: "Credentials",
      icon: <BadgeCheck size={18} />,
      children: [
        {
          text: "Issued Credentials",
          href: "/credentials",
          icon: <FileBadge2 size={16} />,
        },
        {
          text: "Issue Credential",
          href: "/credentials/issue",
          icon: <PlusCircle size={16} />,
        },
      ],
    },
  ];

  return (
    <aside className="flex w-64 shrink-0 flex-col overflow-y-auto border-r border-zinc-900 bg-[#0e0e10] px-5 py-8 xl:w-72">
      <h1 className="text-1xl text-center leading-none font-bold xl:text-2xl">
        <span className="text-violet-500">OPN</span> Achievement
      </h1>

      <nav className="mt-10 flex flex-col gap-2 md:mt-12 xl:mt-16 xl:gap-3">
        {menuGroups.map((group) => (
          <div key={group.id}>
            <button
              onClick={() => setOpenMenu(group.id)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 transition-all xl:px-4 ${
                (openMenu || currentMenu) === group.id
                  ? `border border-violet-500/20 bg-zinc-800 text-white`
                  : `text-zinc-400 hover:bg-zinc-900 hover:text-white`
              } `}
            >
              <div className="flex items-center gap-3">
                {group.icon}
                <span className="text-[15px] font-medium xl:text-base">
                  {group.title}
                </span>
              </div>

              <ChevronRight
                size={16}
                className={`transition-transform duration-300 ${
                  (openMenu || currentMenu) === group.id
                    ? "rotate-90 text-violet-400"
                    : ""
                }`}
              />
            </button>

            {(openMenu || currentMenu) === group.id && (
              <div className="mt-2 mb-3 ml-4 flex flex-col gap-1.5 border-l border-zinc-800 pl-2.5">
                {group.children.map((item) => (
                  <SidebarItem
                    key={item.href}
                    icon={item.icon}
                    text={item.text}
                    href={item.href}
                    active={pathname === item.href}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="mt-2 xl:mt-3">
        <SidebarItem
          icon={<Settings size={18} />}
          text="Settings"
          href="#"
          active={pathname === "/settings"}
        />
      </div>
    </aside>
  );
}

function SidebarItem({
  icon,
  text,
  href,
  active,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative flex w-full items-center gap-2.5 rounded-2xl px-3 py-2.5 transition-all duration-300 xl:px-4 ${
        active
          ? `border border-violet-500/30 bg-violet-500/10 text-white shadow-[0_0_25px_rgba(139,92,246,0.25)]`
          : `border border-transparent text-zinc-300 hover:border-violet-500/30 hover:bg-zinc-800/80 hover:text-white`
      } `}
    >
      {active && (
        <div className="absolute top-2 bottom-2 left-0 w-1 rounded-r-full bg-violet-500" />
      )}

      <div className={active ? "text-violet-400" : "text-zinc-500"}>{icon}</div>

      <span className="text-[14px] leading-none font-medium whitespace-nowrap xl:text-[15px]">
        {text}
      </span>
    </Link>
  );
}
