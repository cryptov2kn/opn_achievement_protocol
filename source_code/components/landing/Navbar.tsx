"use client";

import ConnectWallet from "@/components/landing/ConnectWallet";

export default function Navbar() {
  return (
    <header className="fixed top-2 left-1/2 z-50 flex h-20 w-[96%] max-w-7xl -translate-x-1/2 items-center justify-between rounded-3xl border border-violet-500/20 bg-zinc-900/70 px-5 shadow-2xl shadow-violet-500/10 backdrop-blur-xl md:px-6 lg:px-8">
      <h1 className="text-2xl font-bold lg:text-4xl">
        <span className="text-2xl text-violet-400 lg:text-4xl">OPN</span>
        Achievement
      </h1>

      <nav className="hidden items-center gap-5 text-sm text-gray-300 md:flex lg:gap-7 lg:text-[18px] xl:gap-10">
        <a href="#" className="transition hover:text-white">
          Features
        </a>

        <a href="#" className="transition hover:text-white">
          Credentials
        </a>

        <a href="#" className="transition hover:text-white">
          Issuers
        </a>

        <a href="#" className="transition hover:text-white">
          About
        </a>
      </nav>

      <ConnectWallet />
    </header>
  );
}
