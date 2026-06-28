"use client";

import ConnectWallet from "@/components/ConnectWallet";

export default function Navbar() {
  return (
    <header
      className="
        fixed top-2 left-1/2 -translate-x-1/2
    w-[96%]
    max-w-7xl
    h-20
    px-8
    rounded-3xl
    border border-violet-500/20
    bg-zinc-900/70
    backdrop-blur-xl
    shadow-2xl shadow-violet-500/10
    flex items-center justify-between
    z-50
      "
    >
      <h1 className="text-4xl font-bold">
        <span className="text-violet-400">OPN</span>
        Achievement
      </h1>

      <nav className="hidden md:flex gap-10 text-gray-300">
        <a href="#" className="hover:text-white transition">
          Features
        </a>

        <a href="#" className="hover:text-white transition">
          Credentials
        </a>

        <a href="#" className="hover:text-white transition">
          Issuers
        </a>

        <a href="#" className="hover:text-white transition">
          About
        </a>
      </nav>

      <ConnectWallet />
    </header>
  );
}
