interface DetailSectionProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

export default function DetailSection({
  header,
  children,
}: DetailSectionProps) {
  return (
    <section className="rounded-3xl border border-violet-500/20 bg-zinc-900/60 p-5 backdrop-blur-xl md:p-6 xl:p-8">
      {header}

      <div className="p-8">{children}</div>
    </section>
  );
}
