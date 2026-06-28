"use client";

import { Award } from "lucide-react";

export default function NFTCard() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-violet-600/30 blur-[120px]" />

      {/* Orbit */}
      <div className="absolute w-[520px] h-[520px] border border-violet-500/20 rounded-full animate-spin-slow" />

      <div className="absolute w-[420px] h-[420px] border border-violet-500/20 rounded-full animate-spin-reverse" />

      {/* NFT Card */}
      <div
        className="
        relative
        w-[300px]
        h-[480px]
        rounded-[40px]
        border
        border-violet-500/40
        bg-black/60
        backdrop-blur-xl
        shadow-[0_0_80px_rgba(139,92,246,0.5)]
        p-10
        flex
        flex-col
        justify-between
        animate-float
        rotate-[-6deg]
        "
      >
        <div>
          <h2 className="text-3xl font-bold text-white leading-tight text-center">
            ACHIEVEMENT
            <br />
            CREDENTIAL
          </h2>

          <p className="mt-5 text-center text-violet-300 tracking-[8px] text-sm">
            SOULBOUND
          </p>
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <div
            className="
            w-32
            h-32
            rounded-3xl
            border
            border-violet-500/40
            flex
            items-center
            justify-center
            shadow-[0_0_40px_rgba(139,92,246,0.5)]
            "
          >
            <div
              className="
    w-32
    h-32
    rounded-3xl
    border border-violet-500/30
    bg-violet-500/5
    flex items-center justify-center
    shadow-[0_0_50px_rgba(139,92,246,0.35)]
  "
            >
              <Award
                size={60}
                strokeWidth={2}
                className="
      text-yellow-300
      drop-shadow-[0_0_20px_rgba(167,139,250,0.9)]
      rotate-[-2deg]
    "
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <p className="text-sm text-zinc-300 tracking-wide">VERIFIED ON OPN</p>
          <div
            className="
    w-8
    h-8
    rounded-full
    border
    border-violet-500
    flex
    items-center
    justify-center
    "
          >
            ✓
          </div>
        </div>
      </div>
    </div>
  );
}
