import type { ButtonProps } from '../../types'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-200 cursor-pointer'

  const variants = {
    primary: 'bg-tokeo-gold text-tokeo-navy hover:opacity-90',
    secondary: 'border border-tokeo-cream text-tokeo-cream hover:bg-tokeo-cream hover:text-tokeo-navy',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded',
    md: 'px-6 py-3 text-base rounded',
    lg: 'px-8 py-4 text-lg rounded',
  }

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return <a href={href} className={classes}>{children}</a>
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}