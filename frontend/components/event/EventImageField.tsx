"use client";

interface Props {
  image: string | null;
}

export default function EventImageField({ image }: Props) {
  return (
    <div>
      <label className="block pl-2 text-sm font-medium text-zinc-300 md:text-base">
        Event Image
      </label>

      <div className="mt-2 flex h-[420px] w-full flex-col overflow-hidden rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-800/30">
        {/* Image */}
        <div className="min-h-0 flex-1">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt="Event achievement"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-zinc-500">
              <span className="text-5xl">🏆</span>

              <p className="mt-3 text-sm">No Achievement Image</p>
            </div>
          )}
        </div>

        {/* Caption inside image frame */}
        <div className="shrink-0 border-t border-zinc-800 bg-black px-5 py-4">
          <p className="text-xs font-medium text-zinc-500">Achievement image</p>

          <p className="mt-1 text-sm text-zinc-300">
            The image is managed by the achievement.
          </p>
        </div>
      </div>
    </div>
  );
}
