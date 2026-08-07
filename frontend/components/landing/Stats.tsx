"use client";

import CountUp from "react-countup";

export default function Stats() {
  return (
    <section className="px-12 pb-20">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-3xl border border-zinc-800 bg-zinc-950/50 p-10 backdrop-blur-xl md:grid-cols-4">
        <Card title="Verified Issuers" value={12} />
        <Card title="Events Created" value={45} />
        <Card title="Achievements Issued" value={117} />
        <Card title="Credentials Minted" value={174} />
      </div>
    </section>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="group flex flex-col items-center text-center transition-all duration-300 hover:scale-105">
      <h2 className="text-5xl font-bold text-violet-400 drop-shadow-[0_0_20px_rgba(167,139,250,0.5)] transition-all group-hover:drop-shadow-[0_0_30px_rgba(167,139,250,0.9)]">
        <CountUp end={value} duration={2.5} />+
      </h2>

      <p className="mt-3 text-zinc-300">{title}</p>
    </div>
  );
}
