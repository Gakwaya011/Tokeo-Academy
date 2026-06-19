import logo from '../../assets/logo-gold.png'

const links = [
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-12 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <img src={logo} alt="Tokeo Academy" className="h-8 w-auto mb-2" />
          <p className="text-tokeo-cream/40 text-xs">
            Build execution habits that turn potential into performance.
          </p>
        </div>
        <div className="flex gap-6">
          {links.map(({ label, href }) => (
            <a key={label} href={href} className="text-xs text-tokeo-cream/50 hover:text-tokeo-cream transition-colors">
              {label}
            </a>
          ))}
        </div>
        <p className="text-xs text-tokeo-cream/30">
          © {new Date().getFullYear()} Tokeo Academy. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
