"use client";

import { useRef } from "react";

interface FormTimeInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
}

export default function FormTimeInput({
  label,
  name,
  value,
  onChange,
  min,
}: FormTimeInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleOpenPicker() {
    inputRef.current?.showPicker?.();
    inputRef.current?.focus();
  }

  return (
    <div>
      <label className="block pl-2 text-sm font-medium text-zinc-300 md:text-base">
        {label}
      </label>

      <div onClick={handleOpenPicker} className="mt-2 cursor-pointer">
        <input
          ref={inputRef}
          type="time"
          name={name}
          value={value}
          min={min}
          onChange={onChange}
          className="w-full rounded-2xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-zinc-100 [color-scheme:dark] transition-colors focus:border-violet-500 focus:outline-none md:py-4"
        />
      </div>
    </div>
  );
}
