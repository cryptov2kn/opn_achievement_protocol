"use client";

export default function RegisterIssuerCard() {
  return (
    <div className="rounded-3xl border border-violet-500/20 bg-zinc-900 p-10">
      <h2 className="text-3xl font-bold">Become an Issuer</h2>

      <p className="mt-3 text-zinc-400">
        Register your organization and start issuing Soulbound achievement
        credentials on OPN.
      </p>

      <button className="mt-8 h-14 rounded-2xl bg-violet-600 px-8 transition hover:bg-violet-500">
        Register as Issuer
      </button>
    </div>
  );
}
