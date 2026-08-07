"use client";

interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}

export default function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 5,
}: FormTextareaProps) {
  return (
    <div>
      <label className="block pl-2 text-sm font-medium text-zinc-300 md:text-base">
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="mt-2 h-28 w-full resize-none rounded-2xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white transition-all duration-300 outline-none placeholder:text-zinc-500 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 md:h-32 md:py-4"
      />
    </div>
  );
}
