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
    <div
      className="
        rounded-[32px]
        border border-violet-500/20
        bg-zinc-900/60
        backdrop-blur-xl
        p-6
      "
    >
      <h2 className="text-xl font-bold mb-8">Reputation</h2>

      <div
        className="
    flex

    flex-col
    lg:flex-row

    items-center
    justify-center

    gap-10
    xl:gap-14
  "
      >
        {/* Circle */}
        <div
          className="
    relative

    w-40
    h-40

    md:w-44
    md:h-44

    xl:w-48
    xl:h-48

    flex
    items-center
    justify-center
  "
        >
          {/* Glow */}
          <div
            className="
    absolute

    w-28
    h-28

    md:w-32
    md:h-32

    xl:w-36
    xl:h-36

    rounded-full
    bg-violet-500/15
    blur-3xl
  "
          />

          <svg
            className="absolute w-full h-full -rotate-90"
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
          <div
            className="
    absolute
    inset-0
    grid
    place-items-center
  "
          >
            <div className="flex flex-col items-center justify-center leading-none">
              <span
                className="
        text-5xl
        md:text-6xl
        font-black
        text-white
        tabular-nums
        drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]
      "
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {level}
              </span>

              <span
                className="
        mt-2
        text-xs
        font-semibold
        tracking-[3px]
        md:tracking-[4px]
        uppercase
        text-violet-300
      "
              >
                LEVEL
              </span>
            </div>
          </div>
        </div>

        {/* XP */}
        <div className="text-center lg:text-left">
          <p className="text-zinc-400 text-lg md:text-xl">{rank}</p>

          <h2 className="text-4xl md:text-5xl font-black mt-2 text-white">
            {xp}
          </h2>

          <p className="text-zinc-500 mt-3 text-base md:text-lg">
            {xp - currentXP} / {nextXP - currentXP} XP
          </p>
        </div>
      </div>
    </div>
  );
}
