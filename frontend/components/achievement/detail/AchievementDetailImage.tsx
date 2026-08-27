interface Props {
  image: string | null;
}

export default function AchievementDetailImage({ image }: Props) {
  return (
    <div className="mb-8 flex justify-center">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt="Achievement"
          className="h-[520px] w-[70%] max-w-3xl rounded-2xl border border-zinc-800 object-cover transition hover:border-violet-500/30 md:w-[65%] lg:w-[60%]"
        />
      ) : (
        <div className="mx-auto flex h-[520px] w-[70%] max-w-3xl flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-black text-zinc-500 md:w-[65%] lg:w-[60%]">
          <span className="text-5xl">🏆</span>

          <p className="mt-3 text-sm">No Achievement Image</p>
        </div>
      )}
    </div>
  );
}
