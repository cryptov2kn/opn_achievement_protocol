"use client";

import { Award } from "lucide-react";

export default function NFTCard() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glow */}
      <div className="absolute h-[260px] w-[260px] rounded-full bg-violet-600/30 blur-[70px] sm:h-[340px] sm:w-[340px] sm:blur-[90px] lg:h-[400px] lg:w-[400px] xl:h-[450px] xl:w-[450px] xl:blur-[120px]" />

      {/* Orbit */}
      <div className="animate-spin-slow absolute h-[360px] w-[360px] rounded-full border border-violet-500/20 md:h-[440px] md:w-[440px] xl:h-[520px] xl:w-[520px]" />

      <div className="animate-spin-reverse absolute h-[420px] w-[420px] rounded-full border border-violet-500/20" />

      {/* NFT Card */}
      <div className="animate-float relative flex h-[390px] w-[240px] rotate-[-6deg] flex-col justify-between rounded-[30px] border border-violet-500/40 bg-black/60 p-6 shadow-[0_0_80px_rgba(139,92,246,0.5)] backdrop-blur-xl sm:h-[430px] sm:w-[270px] sm:p-8 lg:h-[460px] lg:w-[290px] xl:h-[480px] xl:w-[300px] xl:rounded-[40px] xl:p-10">
        <div>
          <h2 className="text-center text-2xl leading-tight font-bold text-white sm:text-[28px] xl:text-3xl">
            ACHIEVEMENT
            <br />
            CREDENTIAL
          </h2>

          <p className="mt-4 text-center text-xs tracking-[5px] text-violet-300 sm:text-sm sm:tracking-[8px]">
            SOULBOUND
          </p>
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-violet-500/40 shadow-[0_0_40px_rgba(139,92,246,0.5)] sm:h-28 sm:w-28 xl:h-32 xl:w-32">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-violet-500/30 bg-violet-500/5 shadow-[0_0_50px_rgba(139,92,246,0.35)] sm:h-28 sm:w-28 xl:h-32 xl:w-32">
              <Award
                size={60}
                strokeWidth={2}
                className="h-12 w-12 rotate-[-2deg] text-yellow-300 drop-shadow-[0_0_20px_rgba(167,139,250,0.9)] sm:h-14 sm:w-14 xl:h-16 xl:w-16"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <p className="text-[11px] tracking-wide text-zinc-300 sm:text-xs xl:text-sm">
            VERIFIED ON OPN
          </p>
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-violet-500 sm:h-8 sm:w-8">
            ✓
          </div>
        </div>
      </div>
    </div>
  );
}
