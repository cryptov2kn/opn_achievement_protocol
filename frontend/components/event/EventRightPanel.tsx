export default function EventRightPanel() {
  return (
    <div className="space-y-6">
      {/* Info */}
      <section className="rounded-3xl border border-violet-500/20 bg-zinc-900/60 p-6 backdrop-blur-xl">
        <h2 className="text-2xl font-bold">Why Create Events?</h2>

        <p className="mt-4 leading-8 text-zinc-400">
          Events are the public campaigns that allow participants to earn one of
          your achievements.
        </p>

        <div className="mt-8 space-y-5">
          <div className="rounded-2xl bg-zinc-800/50 p-5">
            <p className="font-semibold text-violet-300">
              ✓ Achievement Linked
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              Every event is connected to one achievement.
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-800/50 p-5">
            <p className="font-semibold text-violet-300">
              ✓ Public Participation
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              Participants can join while the event is active.
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-800/50 p-5">
            <p className="font-semibold text-violet-300">✓ Time Controlled</p>

            <p className="mt-2 text-sm text-zinc-400">
              Start date and end date determine availability.
            </p>
          </div>
        </div>
      </section>

      {/* Preview */}
      <section className="rounded-3xl border border-violet-500/20 bg-zinc-900/60 p-6 backdrop-blur-xl">
        <h2 className="text-2xl font-bold">Live Preview</h2>

        <div className="mt-6 rounded-2xl border border-zinc-700 bg-zinc-800/30 p-5">
          <div className="aspect-[16/9] rounded-xl bg-zinc-700" />

          <h3 className="mt-5 text-xl font-semibold text-zinc-300">
            Event Title
          </h3>

          <p className="mt-2 text-sm text-zinc-500">Linked Achievement</p>

          <div className="mt-5 flex justify-between text-sm text-zinc-400">
            <span>📅 Date</span>
            <span>👥 Participants</span>
          </div>
        </div>
      </section>
    </div>
  );
}
