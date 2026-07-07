"use client";

import BackgroundGlow from "./BackgroundGlow";
import NFTCard from "./NFTCard";

export default function Hero() {
  return (
    <section
      className="relative
    overflow-hidden

    px-6
    md:px-10
    xl:px-16

    pt-32
    md:pt-36
    xl:pt-40

    pb-28
    xl:pb-32"
    >
      <BackgroundGlow />

      <div
        className="relative
    z-10

    mx-auto
    max-w-7xl

    grid

    lg:grid-cols-2

    gap-12
    xl:gap-20

    items-center"
      >
        <div>
          <div className="inline-block rounded-full border border-violet-500 px-4 py-2 md:px-5 text-xs md:text-sm text-violet-300 mb-8">
            ON-CHAIN • VERIFIABLE • PERMANENT
          </div>

          <h1 className="text-4xl sm:text-5xl xl:text-6xl 2xl:text-6xl font-black leading-tight">
            RECOGNIZE.
            <br />
            ACHIEVE.
            <br />
            <span className="text-violet-400">BE REMEMBERED.</span>
          </h1>

          <p className=" text-zinc-400 mt-6 text-base md:text-lg xl:text-xl max-w-xl">
            A decentralized protocol for issuing, managing and verifying
            achievements as Soulbound credentials on OPN.
          </p>

          <div className="mt-8 md:mt-10flex gap-5">
            <button
              className="
    group
    relative
    overflow-hidden
    rounded-xl
    border border-violet-500/30
    bg-black/30
    px-6
    md:px-8

    py-3
    md:py-4
    font-semibold
    text-white
    transition-all
    duration-300
    hover:border-violet-400
    hover:shadow-lg
    hover:shadow-violet-500/20
    hover:-translate-y-1
  "
            >
              <span className="relative z-10 flex items-center gap-2">
                Learn More
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>

              <div
                className="
      absolute
      inset-0
      bg-violet-600/10
      opacity-0
      transition-opacity
      duration-300
      group-hover:opacity-100
    "
              />
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-10 lg:mt-0">
          <div className="relative">
            <div className="absolute -inset-10 md:-inset-16 xl:-inset-20 rounded-full bg-violet-700 blur-[120px] opacity-60" />

            <div className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px] xl:w-[460px] xl:h-[460px] rounded-full border border-violet-500 bg-zinc-950 flex items-center justify-center">
              <div className="flex justify-center">
                <NFTCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
