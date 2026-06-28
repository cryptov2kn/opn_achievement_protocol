"use client";

import BackgroundGlow from "./BackgroundGlow";
import NFTCard from "./NFTCard";

export default function Hero() {
  return (
    <section className="relative px-12 pt-40 pb-24">
      <BackgroundGlow />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-block rounded-full border border-violet-500 px-5 py-2 text-violet-300 mb-8">
            ON-CHAIN • VERIFIABLE • PERMANENT
          </div>

          <h1 className="text-6xl font-black leading-tight">
            RECOGNIZE.
            <br />
            ACHIEVE.
            <br />
            <span className="text-violet-400">BE REMEMBERED.</span>
          </h1>

          <p className="mt-8 text-zinc-400 text-xl max-w-xl">
            A decentralized protocol for issuing, managing and verifying
            achievements as Soulbound credentials on OPN.
          </p>

          <div className="mt-10 flex gap-5">
            <button
              className="
    group
    relative
    overflow-hidden
    rounded-xl
    border border-violet-500/30
    bg-black/30
    px-8
    py-4
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

        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-20 rounded-full bg-violet-700 blur-[120px] opacity-60" />

            <div className="h-[450px] w-[450px] rounded-full border border-violet-500 bg-zinc-950 flex items-center justify-center">
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
