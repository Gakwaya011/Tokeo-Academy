// Per-route <head> metadata, resolved on the server during SSR and injected
// into the HTML template by server.js. Keep the vocabulary consistent —
// "Tokeo Academy", "execution", "execution skills", "execution habits",
// "professional development" — so search and social snippets stay on-brand.

export const SITE = {
  name: 'Tokeo Academy',
  url: 'https://tokeoacademy.org',
  tagline:
    'Tokeo Academy is an execution curriculum for professionals, entrepreneurs and teams — build the execution skills and habits that turn what you know into results you can repeat.',
}

export type Meta = { title: string; description: string; canonical: string }

type Entry = { title: string; description: string }

const STATIC: Record<string, Entry> = {
  '/': {
    title: 'Tokeo Academy — Build the Execution Skills That Turn Knowledge Into Results',
    description: SITE.tagline,
  },
  '/about': {
    title: 'About Tokeo Academy — Execution as a Trainable Skill',
    description:
      'Founded by Léonce Ngaboyakema, Managing Director of One Acre Fund Rwanda. Tokeo Academy makes practical execution capability accessible to the next generation of African professionals, entrepreneurs and leaders.',
  },
  '/programs': {
    title: 'Programs — An Execution Curriculum, Module by Module | Tokeo Academy',
    description:
      'Eight execution capabilities, each paired with a Virtual Execution Lab where you work a real challenge and leave with a decision, a plan, or a tool you can use.',
  },
  '/insights': {
    title: 'Insights — Notes on Execution, Discipline and Follow-Through | Tokeo Academy',
    description:
      'Short essays on why knowledge alone never builds discipline, the cost of restarting every Monday, and what accountability actually means in practice.',
  },
  '/contact': {
    title: 'Join the Waitlist | Tokeo Academy',
    description:
      'Join the waitlist for the Tokeo Academy pilot cohort, or reach out about bringing execution training to your team or institution.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Tokeo Academy',
    description: 'How Tokeo Academy handles the information you share with us.',
  },
  '/terms-of-service': {
    title: 'Terms of Service | Tokeo Academy',
    description: 'The terms that apply when you use the Tokeo Academy website.',
  },
}

export type SsrItem = { slug: string; title: string; excerpt?: string; tagline?: string }

export function resolveMeta(
  pathname: string,
  ctx?: { programs?: SsrItem[] | null; insights?: SsrItem[] | null },
): Meta {
  const path = pathname.split('?')[0].replace(/\/+$/, '') || '/'
  const canonical = `${SITE.url}${path === '/' ? '' : path}`

  const staticEntry = STATIC[path]
  if (staticEntry) return { ...staticEntry, canonical }

  const programMatch = path.match(/^\/programs\/([^/]+)$/)
  if (programMatch) {
    const p = ctx?.programs?.find((x) => x.slug === programMatch[1])
    return {
      title: p ? `${p.title} — Execution Foundations | Tokeo Academy` : 'Execution Foundations | Tokeo Academy',
      description: p?.tagline || SITE.tagline,
      canonical,
    }
  }

  const insightMatch = path.match(/^\/insights\/([^/]+)$/)
  if (insightMatch) {
    const a = ctx?.insights?.find((x) => x.slug === insightMatch[1])
    return {
      title: a ? `${a.title} | Tokeo Academy` : 'Insights | Tokeo Academy',
      description: a?.excerpt || SITE.tagline,
      canonical,
    }
  }

  return { title: SITE.name, description: SITE.tagline, canonical }
}
