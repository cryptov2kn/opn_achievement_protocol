interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="rounded-3xl border border-violet-500/20 bg-zinc-900/60 p-5 backdrop-blur-xl md:p-6 xl:p-8">
      <h1 className="text-xl font-bold sm:text-2xl xl:text-3xl">{title}</h1>

      {description && (
        <p className="mt-2 text-sm text-zinc-400 md:text-base">{description}</p>
      )}

      <div className="mt-6 space-y-5 md:mt-8 xl:mt-10 xl:space-y-6">
        {children}
      </div>
    </section>
  );
}
