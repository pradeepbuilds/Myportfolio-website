export default function SectionLabel({ index, title }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="font-mono text-accent text-sm">{`// ${index}`}</span>
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight">
        {title}
      </h2>
      <span className="flex-1 h-px bg-border ml-2" />
    </div>
  );
}
