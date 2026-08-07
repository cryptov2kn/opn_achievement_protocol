"use client";

import { Search } from "lucide-react";

interface Props {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  showShortcut?: boolean;
}

export default function SearchBar({
  placeholder,
  value,
  onChange,
  showShortcut = true,
}: Props) {
  //const { search, setSearch } = useSearch();

  return (
    <div className="relative w-full max-w-full lg:max-w-md">
      <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-500" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-zinc-800 bg-zinc-900/70 pr-20 pl-11 text-sm text-white transition-all outline-none placeholder:text-zinc-500 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 lg:h-14 lg:text-base"
      />

      {showShortcut && (
        <div className="absolute top-1/2 right-4 hidden -translate-y-1/2 items-center justify-center rounded-lg bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400 lg:flex">
          Ctrl K
        </div>
      )}
    </div>
  );
}
