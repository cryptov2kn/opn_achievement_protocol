"use client";

export default function RegisterIssuerCard() {
  return (
    <div
      className="
      rounded-3xl
      border border-violet-500/20
      bg-zinc-900
      p-10
      "
    >
      <h2 className="text-3xl font-bold">Become an Issuer</h2>

      <p className="text-zinc-400 mt-3">
        Register your organization and start issuing Soulbound achievement
        credentials on OPN.
      </p>

      <button
        className="
        mt-8
        h-14
        px-8
        rounded-2xl
        bg-violet-600
        hover:bg-violet-500
        transition
        "
      >
        Register as Issuer
      </button>
    </div>
  );
}
