"use client";

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

export default function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: FormInputProps) {
  return (
    <div>
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

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          mt-2
          w-full

          px-4
          py-3
          md:py-4

          rounded-2xl

          bg-zinc-800/50

          border
          border-zinc-700

          transition-colors

          focus:outline-none
          focus:border-violet-500
        "
      />
    </div>
  );
}
