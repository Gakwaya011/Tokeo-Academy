export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-tokeo-gold border border-tokeo-gold px-3 py-1 rounded-sm">
      {children}
    </span>
  )
}