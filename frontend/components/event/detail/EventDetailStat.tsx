interface Props {
  icon: string;
  title: string;
  value: string | number;
}

export default function EventDetailStat({ icon, title, value }: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-black p-6 transition hover:border-violet-500/40">
      <div className="mb-2 flex justify-center text-2xl">{icon}</div>

      <div className="text-center text-sm tracking-wide text-zinc-500 uppercase">
        {title}
      </div>

      <div className="mt-2 text-center text-xl font-bold text-white">
        {value}
      </div>
    </div>
  );
}
