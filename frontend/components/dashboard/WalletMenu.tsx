"use client";

import { ChevronDown, Copy, ExternalLink, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useDisconnect } from "wagmi";
//import Image from "next/image";

export default function WalletMenu() {
  const { address, chain, status } = useAccount();

  const { disconnect } = useDisconnect();

  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function clickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !(menuRef.current as HTMLDivElement).contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", clickOutside);

    return () => {
      window.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  if (status === "connecting" || status === "reconnecting") {
    return (
      <div className="h-14 w-[180px] animate-pulse rounded-2xl bg-zinc-900/70" />
    );
  }

  if (!address) {
    return null;
  }

  const short = `${address.slice(0, 6)}...${address.slice(-4)}`;

  async function copyAddress() {
    if (!address) return;

    await navigator.clipboard.writeText(address);

    toast.success("Wallet copied");

    setOpen(false);
  }

  function openExplorer() {
    if (!address) return;

    if (!chain?.blockExplorers?.default?.url) return;

    window.open(
      `${chain.blockExplorers.default.url}/address/${address}`,
      "_blank",
    );

    setOpen(false);
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* BUTTON */}

      <button
        onClick={() => setOpen(!open)}
        className="flex h-14 items-center gap-3 rounded-2xl border border-violet-500/30 bg-zinc-900/80 px-4 transition hover:border-violet-400 hover:bg-zinc-800"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://api.dicebear.com/9.x/identicon/svg?seed=${address}`}
          alt="Wallet Avatar"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full border border-violet-500/30 bg-zinc-900"
        />

        <div className="text-left">
          <p className="font-medium">{short}</p>

          <p className="text-xs text-green-400">● Connected</p>
        </div>

        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""} `}
        />
      </button>

      {/* MENU */}

      {open && (
        <div className="absolute right-0 z-50 mt-3 w-72 overflow-hidden rounded-3xl border border-zinc-700 bg-zinc-900 shadow-2xl">
          <div className="p-6">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://api.dicebear.com/9.x/identicon/svg?seed=${address}`}
                alt="Wallet Avatar"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full border border-violet-500/30 bg-zinc-900"
              />

              <div>
                <p className="font-semibold">Connected</p>

                <p className="text-sm text-zinc-400">{short}</p>

                <p className="mt-1 text-xs text-violet-400">{chain?.name}</p>
              </div>
            </div>

            <div className="mt-6 border-t border-zinc-800" />

            <button
              onClick={copyAddress}
              className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-zinc-800"
            >
              <Copy size={18} />
              Copy Address
            </button>

            <button
              onClick={openExplorer}
              className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-zinc-800"
            >
              <ExternalLink size={18} />
              View Explorer
            </button>

            <div className="my-4 border-t border-zinc-800" />

            <button
              onClick={() => disconnect()}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-red-400 transition hover:bg-red-500/10"
            >
              <LogOut size={18} />
              Disconnect Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
