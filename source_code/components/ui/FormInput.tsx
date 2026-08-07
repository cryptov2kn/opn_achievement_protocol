"use client";

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}

export default function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
}: FormInputProps) {
  return (
    <div>
      <label className="block pl-2 text-sm font-medium text-zinc-300 md:text-base">
        {label}
      </label>

      <input
        type={type}
        inputMode={inputMode}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 transition-colors focus:border-violet-500 focus:outline-none md:py-4"
      />
    </div>
  );
}
