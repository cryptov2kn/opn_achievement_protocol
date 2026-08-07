interface Props {
  form: {
    title: string;
    category: string;
    difficulty: string;
    description: string;
    image: string;
  };
}

export default function AchievementPreviewCard({ form }: Props) {
  return (
    <div className="rounded-3xl border border-violet-500/20 bg-[#121214] p-5 md:p-6">
      <h2 className="text-lg font-bold md:text-xl">Live Preview</h2>

      <p className="mt-2 text-sm text-zinc-500">
        This is how your achievement will appear.
      </p>

      {/* Preview Card */}
      <div className="mt-6 p-6">
        {/* Image */}
        <div className="flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-zinc-800">
          {form.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={form.image}
              alt="Achievement"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm text-zinc-500">Achievement Image</span>
          )}
        </div>

        {/* Title + Category + Difficulty */}
        <div className="mt-5 flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold">
            {form.title || "Achievement Title"}
          </h3>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-300">
              {form.category}
            </span>

            <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
              {form.difficulty}
            </span>
          </div>

          <p className="mt-5 max-w-sm text-center text-sm leading-7 text-zinc-400">
            {form.description || "Achievement description will appear here."}
          </p>
        </div>
      </div>
    </div>
  );
}
