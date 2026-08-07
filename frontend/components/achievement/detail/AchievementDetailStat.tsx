interface Props {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
}

export default function AchievementDetailStat({ icon, title, value }: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-black p-6 transition hover:border-violet-500/40">
      <div className="mb-2 flex justify-center text-2xl">{icon}</div>

      <p className="text-center text-sm tracking-wide text-zinc-500 uppercase">
        {title}
      </p>

      <p className="mt-2 text-center text-xl font-bold text-white">{value}</p>
    </div>
  );
}
