export default function OverviewCard() {
  return (
    <div className="rounded-3xl border border-violet-500/20 bg-zinc-900 p-8 shadow-[0_0_80px_rgba(139,92,246,0.15)]">
      <h2 className="text-zinc-400">Issuer Overview</h2>

      <div className="mt-6 grid grid-cols-3 gap-8">
        <Stat title="Events" value="0" />
        <Stat title="Achievements" value="0" />
        <Stat title="Credentials" value="0" />
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <p className="text-zinc-500">{title}</p>

      <h3 className="mt-2 text-5xl font-bold">{value}</h3>
    </div>
  );
}
