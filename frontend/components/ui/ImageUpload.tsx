"use client";

interface ImageUploadProps {
  label: string;
  image: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: "default" | "compact";
}

export default function ImageUpload({
  label,
  image,
  onChange,
  variant = "default",
}: ImageUploadProps) {
  const containerClass =
    variant === "compact" ? "h-full min-h-[420px]" : "h-28 md:h-32";

  const imageClass =
    variant === "compact"
      ? "h-full w-full object-cover"
      : "h-16 w-16 rounded-full object-cover md:h-20 md:w-20";

  return (
    <div>
      <label className="block pl-2 text-sm font-medium text-zinc-300 md:text-base">
        {label}
      </label>

      <div className="mt-2">
        <label
          className={`flex ${containerClass} cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-800/30 text-zinc-400 transition hover:border-violet-500/50`}
        >
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="preview" className={imageClass} />
          ) : (
            <>
              <p className="font-medium">Upload Image</p>
              <p className="mt-1 text-xs text-zinc-500">PNG, JPG, SVG</p>
            </>
          )}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onChange}
          />
        </label>
      </div>
    </div>
  );
}
