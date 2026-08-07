interface DashboardSectionProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export default function DashboardSection({
  title,
  description,
  actions,
  children,
}: DashboardSectionProps) {
  return (
    <section className="rounded-3xl border border-violet-500/20 bg-zinc-900/60 p-5 backdrop-blur-xl md:p-6 xl:p-8">
      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl xl:text-3xl">{title}</h1>

          {description && (
            <p className="mt-2 text-sm text-zinc-400 md:text-base">
              {description}
            </p>
          )}
        </div>

        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      </div>

      {/* Body */}
      <div className="mt-8">{children}</div>
    </section>
  );
}
