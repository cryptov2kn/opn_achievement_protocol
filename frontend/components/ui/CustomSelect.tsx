"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Props {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function CustomSelect({
  label,
  options,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {label && (
        <label
          className="
    block
    pl-2
    text-sm
    md:text-base
    font-medium
    text-zinc-300
  "
        >
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          mt-2

w-full

px-4
md:px-5

py-3
md:py-4

rounded-2xl

bg-zinc-800/50

border
border-zinc-700

flex
items-center
justify-between

transition-all
duration-300

hover:border-violet-500/40

focus:outline-none
focus:border-violet-500
focus:ring-4
focus:ring-violet-500/10
        "
      >
        <span className="text-sm md:text-base text-white">{value}</span>

        <ChevronDown
          className={`
            w-4 h-4
            md:w-5 md:h-5
            text-zinc-400
            transition
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {open && (
        <div
          className="
    absolute
    top-full
    mt-3
    w-full
    max-h-64
    overflow-y-auto
    rounded-2xl
    border border-zinc-700
    bg-zinc-900
    shadow-2xl
    shadow-black/50
    z-50
    custom-scrollbar
  "
        >
          {options.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className="
                w-full
                px-4
                md:px-5
                py-3

                text-sm
                md:text-base
                flex
                items-center
                justify-between
                text-left
                hover:bg-violet-500/10
                transition
              "
            >
              {item}

              {value === item && (
                <Check
                  className="
                    w-4 h-4 shrink-0
                    text-violet-400
                  "
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
