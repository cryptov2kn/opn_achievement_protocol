export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="
        rounded-full
        bg-zinc-800
        px-3
        py-1
        text-sm
      "
    >
      {children}
    </span>
  );
}
