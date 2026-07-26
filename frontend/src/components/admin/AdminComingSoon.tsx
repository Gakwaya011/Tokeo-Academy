export default function AdminComingSoon({ label, description }: { label: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-3 p-12">
      <p className="text-xs font-semibold tracking-widest uppercase text-tokeo-gold">{label}</p>
      <h2 className="text-2xl font-bold text-tokeo-navy tracking-tight">Management tools are coming soon.</h2>
      <p className="text-tokeo-navy/50 max-w-sm leading-relaxed">{description}</p>
    </div>
  )
}
