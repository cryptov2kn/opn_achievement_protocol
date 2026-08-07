"use client";

import BackgroundGlow from "./BackgroundGlow";
import NFTCard from "./NFTCard";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-28 md:px-10 md:pt-36 xl:px-16 xl:pt-40 xl:pb-32">
      <BackgroundGlow />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 xl:gap-20">
        <div>
          <div className="mb-8 inline-block rounded-full border border-violet-500 px-4 py-2 text-xs text-violet-300 md:px-5 md:text-sm">
            ON-CHAIN • VERIFIABLE • PERMANENT
          </div>

          <h1 className="text-4xl leading-tight font-black sm:text-5xl xl:text-6xl 2xl:text-6xl">
            RECOGNIZE.
            <br />
            ACHIEVE.
            <br />
            <span className="text-violet-400">BE REMEMBERED.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-zinc-400 md:text-lg xl:text-xl">
            A decentralized protocol for issuing, managing and verifying
            achievements as Soulbound credentials on OPN.
          </p>

          <div className="md:mt-10flex mt-8 gap-5">
            <button className="group relative overflow-hidden rounded-xl border border-violet-500/30 bg-black/30 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/20 md:px-8 md:py-4">
              <span className="relative z-10 flex items-center gap-2">
                Learn More
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>

              <div className="absolute inset-0 bg-violet-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          </div>
        </div>

        <div className="mt-10 flex justify-center lg:mt-0">
          <div className="relative">
            <div className="absolute -inset-10 rounded-full bg-violet-700 opacity-60 blur-[120px] md:-inset-16 xl:-inset-20" />

            <div className="flex h-[280px] w-[280px] items-center justify-center rounded-full border border-violet-500 bg-zinc-950 sm:h-[340px] sm:w-[340px] lg:h-[420px] lg:w-[420px] xl:h-[460px] xl:w-[460px]">
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
