export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-lg">
      {children}
    </div>
  );
}
