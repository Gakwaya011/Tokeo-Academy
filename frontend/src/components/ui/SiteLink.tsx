import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

// Preserve native behavior for external URLs, email, phone and downloads.
export default function SiteLink({ href, ...props }: ComponentProps<'a'>) {
  if (href && href.startsWith('/') && !href.startsWith('//') && !props.download) {
    return <Link to={href} {...props} />
  }
  return <a href={href} {...props} />
}
