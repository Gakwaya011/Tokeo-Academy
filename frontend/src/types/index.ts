export interface NavLink {
  label: string
  href: string
}

export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
}

export interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}