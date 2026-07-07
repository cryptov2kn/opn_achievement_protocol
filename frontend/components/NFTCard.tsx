"use client";

import { Award } from "lucide-react";

export default function NFTCard() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glow */}
      <div
        className="absolute

    w-[260px]
    h-[260px]

    sm:w-[340px]
    sm:h-[340px]

    lg:w-[400px]
    lg:h-[400px]

    xl:w-[450px]
    xl:h-[450px]

    rounded-full

    bg-violet-600/30

    blur-[70px]
    sm:blur-[90px]
    xl:blur-[120px]"
      />

      {/* Orbit */}
      <div className="absolute w-[360px] h-[360px] md:w-[440px] md:h-[440px] xl:w-[520px] xl:h-[520px] border border-violet-500/20 rounded-full animate-spin-slow" />

      <div className="absolute w-[420px] h-[420px] border border-violet-500/20 rounded-full animate-spin-reverse" />

      {/* NFT Card */}
      <div
        className="
        relative
        w-[240px] h-[390px] sm:w-[270px] sm:h-[430px] lg:w-[290px] lg:h-[460px] xl:w-[300px] xl:h-[480px]
        rounded-[30px]
        xl:rounded-[40px]
        border
        border-violet-500/40
        bg-black/60
        backdrop-blur-xl
        shadow-[0_0_80px_rgba(139,92,246,0.5)]
        p-6
        sm:p-8
        xl:p-10
        flex
        flex-col
        justify-between
        animate-float
        rotate-[-6deg]
        "
      >
        <div>
          <h2 className="text-2xl sm:text-[28px] xl:text-3xl font-bold text-white leading-tight text-center">
            ACHIEVEMENT
            <br />
            CREDENTIAL
          </h2>

          <p className="text-center text-violet-300 mt-4 text-xs sm:text-sm tracking-[5px] sm:tracking-[8px]">
            SOULBOUND
          </p>
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <div
            className="
            w-24
            h-24

            sm:w-28
            sm:h-28

            xl:w-32
            xl:h-32
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
     w-24
     h-24

     sm:w-28
     sm:h-28

     xl:w-32
     xl:h-32
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
                w-12
                h-12

                sm:w-14
                sm:h-14

                xl:w-16
                xl:h-16
      text-yellow-300
      drop-shadow-[0_0_20px_rgba(167,139,250,0.9)]
      rotate-[-2deg]
    "
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <p className="text-[11px] sm:text-xs xl:text-sm text-zinc-300 tracking-wide">
            VERIFIED ON OPN
          </p>
          <div
            className="
    w-7
    h-7

    sm:w-8
    sm:h-8
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
