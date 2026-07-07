interface FormData {
  name: string;
  organizationType: string;
  category: string;
  website: string;
  twitter: string;
  description: string;
  country: string;
  foundedYear: string;
  logo: string;
}

interface Props {
  form: FormData;
}

export default function IssuerPreviewCard({ form }: Props) {
  return (
    <div
      className="
      rounded-3xl
      border border-violet-500/20
      bg-zinc-900/70
      backdrop-blur-xl
      p-8
      "
    >
      <h2 className="text-xl font-semibold">Issuer Preview</h2>

      <div className="mt-8 flex justify-center">
        {form.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={form.logo}
            alt="Organization Logo"
            className="
        w-28
        h-28
        rounded-full
        object-cover
        border
        border-violet-500/30
        shadow-[0_0_25px_rgba(139,92,246,0.2)]
      "
          />
        ) : (
          <div
            className="
        w-28
        h-28
        rounded-full
        bg-violet-500/10
        border
        border-violet-500/20
        flex
        items-center
        justify-center
        text-violet-400
      "
          >
            Logo
          </div>
        )}
      </div>

      <h3
        className="
        mt-6
        text-2xl
        font-bold
        text-center
        "
      >
        {form.name || "Organization Name"}
      </h3>

      <p
        className="
        mt-3
        text-zinc-400
        text-center
        "
      >
        {form.description || "Description preview..."}
      </p>

      <div className="mt-6 flex justify-center">
        <div
          className="
          inline-flex
          px-4
          py-2
          rounded-full
          bg-violet-500/10
          text-violet-400
          "
        >
          {form.category}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <div
          className="
          inline-flex
          px-4
          py-2
          rounded-full
          bg-emerald-500/10
          text-emerald-400
          "
        >
          Verified Issuer
        </div>
      </div>
    </div>
  );
}
