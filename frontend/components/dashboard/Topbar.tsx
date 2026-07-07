"use client";

import { usePathname } from "next/navigation";

import SearchBar from "./SearchBar";
import WalletMenu from "./WalletMenu";

export default function Topbar() {
  const pathname = usePathname();

  const placeholders: Record<string, string> = {
    "/dashboard": "Search dashboard...",
    "/issuer/register": "Search issuers...",
    "/events": "Search events...",
    "/achievements": "Search achievements...",
    "/credentials": "Search credentials...",
  };

  const placeholder = placeholders[pathname] ?? "Search...";
  return (
    <header
      className="
        flex
    flex-col
    lg:flex-row

    lg:items-center
    justify-between

    gap-5
      "
    >
      <SearchBar placeholder={placeholder} />

      <WalletMenu />
    </header>
  );
}
