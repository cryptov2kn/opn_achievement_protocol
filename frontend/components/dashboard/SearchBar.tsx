"use client";

import { Search } from "lucide-react";

interface Props {
  placeholder: string;
}

export default function SearchBar({ placeholder }: Props) {
  return (
    <div
      className="
    relative

    w-full

    max-w-full

    lg:max-w-md
  "
    >
      <Search
        className="
    absolute

    left-4
    top-1/2

    -translate-y-1/2

    w-4
    h-4

    text-zinc-500
  "
      />

      <input
        type="text"
        placeholder={placeholder}
        className="
    w-full

    h-12
    lg:h-14

    rounded-2xl

    pl-11
    pr-20

    bg-zinc-900/70

    border
    border-zinc-800

    text-sm
    lg:text-base

    text-white
    placeholder:text-zinc-500

    outline-none

    transition-all

    focus:border-violet-500
    focus:ring-4
    focus:ring-violet-500/10
  "
      />

      <div
        className="
    hidden
    lg:flex

    absolute

    right-4
    top-1/2

    -translate-y-1/2

    items-center
    justify-center

    px-2.5
    py-1

    rounded-lg

    bg-zinc-800

    text-xs
    text-zinc-400
  "
      >
        Ctrl K
      </div>
    </div>
  );
}
