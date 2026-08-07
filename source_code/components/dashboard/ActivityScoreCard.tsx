"use client";

import { getProgress, getRank } from "@/lib/level";

export default function LevelCard() {
  const xp = 2450;

  const { level, currentXP, nextXP, progress } = getProgress(xp);

  const rank = getRank(level);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (circumference * progress) / 100;

  return (
    <div className="rounded-[32px] border border-violet-500/20 bg-zinc-900/60 p-6 backdrop-blur-xl">
      <h2 className="mb-8 text-xl font-bold">Reputation</h2>

      <div className="flex flex-col items-center justify-center gap-10 lg:flex-row xl:gap-14">
        {/* Circle */}
        <div className="relative flex h-40 w-40 items-center justify-center md:h-44 md:w-44 xl:h-48 xl:w-48">
          {/* Glow */}
          <div className="absolute h-28 w-28 rounded-full bg-violet-500/15 blur-3xl md:h-32 md:w-32 xl:h-36 xl:w-36" />

          <svg
            className="absolute h-full w-full -rotate-90"
            viewBox="0 0 160 160"
          >
            <defs>
              <linearGradient id="levelGradient">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>

              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Track */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#24242a"
              strokeWidth="14"
              fill="none"
            />

            {/* Progress */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="url(#levelGradient)"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              filter="url(#glow)"
            />
          </svg>

          {/* Inner Circle */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center justify-center leading-none">
              <span
                className="text-5xl font-black text-white tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] md:text-6xl"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {level}
              </span>

              <span className="mt-2 text-xs font-semibold tracking-[3px] text-violet-300 uppercase md:tracking-[4px]">
                LEVEL
              </span>
            </div>
          </div>
        </div>

        {/* XP */}
        <div className="text-center lg:text-left">
          <p className="text-lg text-zinc-400 md:text-xl">{rank}</p>

          <h2 className="mt-2 text-4xl font-black text-white md:text-5xl">
            {xp}
          </h2>

          <p className="mt-3 text-base text-zinc-500 md:text-lg">
            {xp - currentXP} / {nextXP - currentXP} XP
          </p>
        </div>
      </div>
    </div>
  );
}
