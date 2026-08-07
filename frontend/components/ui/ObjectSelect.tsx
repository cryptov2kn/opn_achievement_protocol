"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface ObjectSelectOption {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  options: ObjectSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function ObjectSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Select",
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

  const selected = options.find((item) => item.value === value);

  return (
    <div className="relative" ref={ref}>
      {label && (
        <label className="block pl-2 text-sm font-medium text-zinc-300 md:text-base">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-2 flex w-full items-center justify-between rounded-2xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 transition-all duration-300 hover:border-violet-500/40 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none md:px-5 md:py-4"
      >
        <span className="text-sm text-white md:text-base">
          {selected?.label ?? placeholder}
        </span>

        <ChevronDown
          className={`h-4 w-4 text-zinc-400 transition md:h-5 md:w-5 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="custom-scrollbar absolute top-full z-50 mt-3 max-h-64 w-full overflow-y-auto rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl shadow-black/50">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-violet-500/10 md:px-5 md:text-base"
            >
              {option.label}

              {value === option.value && (
                <Check className="h-4 w-4 shrink-0 text-violet-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
