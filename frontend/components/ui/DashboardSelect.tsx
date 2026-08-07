"use client";

import clsx from "clsx";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DashboardSelectItem {
  label: string;
  value?: string;
  divider?: boolean;
}

interface DashboardSelectProps {
  label: string;
  value: string;
  items: DashboardSelectItem[];
  onChange: (value: string) => void;
}

export default function DashboardSelect({
  label,
  value,
  items,
  onChange,
}: DashboardSelectProps) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected =
    items.find((item) => item.value === value && !item.divider) ??
    items.find((item) => !item.divider)!;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 min-w-[120px] items-center justify-between rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-sm font-medium text-white transition-all duration-200 hover:border-violet-500 hover:bg-zinc-800 hover:shadow-lg hover:shadow-violet-500/10 sm:h-14 sm:min-w-[140px] sm:px-4 sm:text-base xl:min-w-[160px]"
      >
        <div className="flex flex-col items-start">
          <span className="text-[11px] text-zinc-500">{label}</span>

          <span className="text-sm font-semibold">{selected.label}</span>
        </div>

        <ChevronDown
          size={18}
          className={clsx(
            "text-zinc-400 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-xl shadow-black/40">
          {items.map((item, index) => {
            if (item.divider) {
              return (
                <div
                  key={`divider-${index}`}
                  className="mx-2 my-1 border-t border-zinc-700"
                />
              );
            }

            return (
              <button
                key={item.value ?? `item-${index}`}
                onClick={() => {
                  if (!item.value) return;

                  onChange(item.value);
                  setOpen(false);
                }}
                className={clsx(
                  "flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors",
                  item.value === value
                    ? "bg-violet-500/15 text-violet-300"
                    : "text-zinc-200 hover:bg-zinc-800",
                )}
              >
                <span>{item.label}</span>

                {item.value === value && (
                  <Check size={16} className="text-violet-400" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
