export default function EventGuide() {
  return (
    <div className="rounded-3xl border border-violet-500/20 bg-[#121214] p-5 md:p-6">
      <h2 className="text-lg font-bold md:text-xl">Why Create Events?</h2>

      <p className="mt-2 text-sm leading-7 text-zinc-400 md:text-base">
        Events allow participants to earn one of your published achievements
        during a specific time period.
      </p>

      <div className="mt-6 space-y-4">
        <div className="rounded-2xl bg-zinc-800/50 p-4">
          <p className="font-medium text-white">✔ Achievement Linked</p>

          <p className="mt-2 text-sm text-zinc-400">
            Every event is connected to one achievement.
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-800/50 p-4">
          <p className="font-medium text-white">✔ Public Participation</p>

          <p className="mt-2 text-sm text-zinc-400">
            Participants can join while the event is active.
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-800/50 p-4">
          <p className="font-medium text-white">✔ Time Controlled</p>

          <p className="mt-2 text-sm text-zinc-400">
            Start date and end date determine availability.
          </p>
        </div>
      </div>
    </div>
  );
}
