export default function AchievementGuide() {
  return (
    <div className="rounded-3xl border border-violet-500/20 bg-[#121214] p-5 md:p-6">
      <h2 className="text-lg font-bold md:text-xl">Why Create Achievements?</h2>

      <p className="mt-2 text-sm leading-7 text-zinc-400 md:text-base">
        Achievement templates define the skills, milestones and accomplishments
        that can later be issued as permanent Soulbound credentials on OPN.
      </p>

      <div className="mt-6 space-y-4">
        <div className="rounded-2xl bg-zinc-800/50 p-4">
          <p className="font-medium text-white">✔ Verifiable</p>

          <p className="mt-2 text-sm text-zinc-400">
            Stored permanently on-chain.
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-800/50 p-4">
          <p className="font-medium text-white">✔ Reusable</p>

          <p className="mt-2 text-sm text-zinc-400">
            Issue this achievement to unlimited recipients.
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-800/50 p-4">
          <p className="font-medium text-white">✔ Trusted</p>

          <p className="mt-2 text-sm text-zinc-400">
            Every credential is linked to your issuer profile.
          </p>
        </div>
      </div>
    </div>
  );
}
