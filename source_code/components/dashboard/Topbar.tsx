"use client";

import { usePathname } from "next/navigation";

import SearchBar from "./SearchBar";
import WalletMenu from "./WalletMenu";

import { useSearch } from "@/providers/SearchProvider";

interface Props {
  showSearch?: boolean;
}

export default function Topbar({ showSearch = false }: Props) {
  const pathname = usePathname();

  const { search, setSearch } = useSearch();

  const placeholders: Record<string, string> = {
    "/dashboard": "Search dashboard...",
    "/issuer/register": "Search issuers...",
    "/events": "Search events...",
    "/achievements": "Search achievements...",
    "/credentials": "Search credentials...",
  };

  const placeholder = placeholders[pathname] ?? "Search...";

  return (
    <header className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
      {showSearch ? (
        <SearchBar
          placeholder={placeholder}
          value={search}
          onChange={setSearch}
        />
      ) : (
        <div />
      )}

      <WalletMenu />
    </header>
  );
}
