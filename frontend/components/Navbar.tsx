"use client";

import ConnectWallet from "@/components/ConnectWallet";

export default function Navbar() {
  return (
    <header
      className="
fixed
top-2
left-1/2
-translate-x-1/2

w-[96%]
max-w-7xl

h-20

rounded-3xl
border
border-violet-500/20

bg-zinc-900/70
backdrop-blur-xl

shadow-2xl
shadow-violet-500/10

z-50

flex
items-center
justify-between

px-5
md:px-6
lg:px-8
"
    >
      <h1 className="text-2xl lg:text-4xl font-bold">
        <span className="text-violet-400 text-2xl lg:text-4xl">OPN</span>
        Achievement
      </h1>

      <nav
        className="
hidden
md:flex

items-center

gap-5
lg:gap-7
xl:gap-10

text-sm
lg:text-[18px]

text-gray-300
"
      >
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
