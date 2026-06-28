export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <input
      className="
        w-full
        rounded-xl
        border
        border-zinc-700
        bg-zinc-950
        p-3
        text-white
      "
      {...props}
    />
  );
}
