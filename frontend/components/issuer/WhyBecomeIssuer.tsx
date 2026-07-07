import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Create verifiable events",
  "Issue Soulbound credentials",
  "Build organization reputation",
  "Reward contributors",
];

export default function WhyBecomeIssuer() {
  return (
    <div
      className="
      rounded-3xl
      border border-violet-500/20
      bg-zinc-900/60
      backdrop-blur-xl
      p-8
      "
    >
      <h2 className="text-xl font-bold">Why Become an Issuer?</h2>

      <div className="mt-6 space-y-4">
        {benefits.map((item) => (
          <div
            key={item}
            className="
            flex
            items-center
            gap-4
            p-4
            rounded-2xl
            bg-zinc-800/20
            border border-zinc-800
            "
          >
            <CheckCircle2
              className="
              w-5
              h-5
              text-emerald-400
              flex-shrink-0
              "
            />

            <span className="text-zinc-300">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
