import type { SectionProps } from '../../types'

export default function Section({ children, className = '', id }: SectionProps) {
  return (
    <section id={id} className={`w-full px-6 py-20 md:px-12 lg:px-24 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  )
}