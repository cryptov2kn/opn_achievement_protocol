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
    <div className="rounded-3xl border border-violet-500/20 bg-zinc-900/70 p-8 backdrop-blur-xl">
      <h2 className="text-xl font-semibold">Issuer Preview</h2>

      <div className="mt-8 flex justify-center">
        {form.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={form.logo}
            alt="Organization Logo"
            className="h-28 w-28 rounded-full border border-violet-500/30 object-cover shadow-[0_0_25px_rgba(139,92,246,0.2)]"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-400">
            Logo
          </div>
        )}
      </div>

      <h3 className="mt-6 text-center text-2xl font-bold">
        {form.name || "Organization Name"}
      </h3>

      <p className="mt-3 text-center text-zinc-400">
        {form.description || "Description preview..."}
      </p>

      <div className="mt-6 flex justify-center">
        <div className="inline-flex rounded-full bg-violet-500/10 px-4 py-2 text-violet-400">
          {form.category}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="inline-flex rounded-full bg-emerald-500/10 px-4 py-2 text-emerald-400">
          Verified Issuer
        </div>
      </div>
    </div>
  );
}
