import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Create verifiable events",
  "Issue Soulbound credentials",
  "Build organization reputation",
  "Reward contributors",
];

export default function WhyBecomeIssuer() {
  return (
    <div className="rounded-3xl border border-violet-500/20 bg-zinc-900/60 p-8 backdrop-blur-xl">
      <h2 className="text-xl font-bold">Why Become an Issuer?</h2>

      <div className="mt-6 space-y-4">
        {benefits.map((item) => (
          <div
            key={item}
            className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-800/20 p-4"
          >
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-400" />

            <span className="text-zinc-300">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
