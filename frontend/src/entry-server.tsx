import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { matchRoutes, StaticRouter } from 'react-router-dom'
import App from './App.tsx'
import { ProgramsDataContext } from './context/ProgramsDataContext'
import { InsightsDataContext } from './context/InsightsDataContext'
import { API_URL } from './lib/api'
import { resolveMeta } from './lib/seo'
import type { Program } from './types/program'
import type { Insight } from './types/insight'

// Mirror App.tsx's concrete routes, excluding its visual '*' fallback.
// Use React Router's matcher so casing, trailing slashes and encoded params
// are handled the same way on the server and in the browser.
const routes = [
  ...['/', '/about', '/programs', '/programs/:slug', '/insights',
    '/insights/:slug', '/contact', '/privacy-policy', '/terms-of-service']
    .map((path) => ({ path })),
  ...['/login', '/signup', '/forgot-password', '/auth/callback', '/admin',
    '/admin/messages', '/admin/insights', '/admin/programs']
    .map((path) => ({ path, handle: { clientOnly: true } })),
]

export function resolveRoute(url: string) {
  return matchRoutes(routes, url)?.[0] ?? null
}

async function fetchPrograms(): Promise<Program[]> {
  const res = await fetch(`${API_URL}/api/programs`)
  if (!res.ok) throw new Error(`/api/programs responded ${res.status}`)
  const { programs } = await res.json()
  if (!Array.isArray(programs)) throw new Error('Invalid programs response')
  return programs
}

async function fetchInsights(): Promise<Insight[]> {
  const res = await fetch(`${API_URL}/api/insights`)
  if (!res.ok) throw new Error(`/api/insights responded ${res.status}`)
  const { insights } = await res.json()
  if (!Array.isArray(insights)) throw new Error('Invalid insights response')
  return insights
}

export async function render(url: string) {
  const path = url.split('?')[0]
  const match = resolveRoute(url)
  const route = match?.route.path
  // Let failures reach server.js's 500 handler. An unavailable API is not
  // evidence that a requested slug does not exist.
  const [programs, insights] = await Promise.all([
    route === '/programs' || route === '/programs/:slug' ? fetchPrograms() : Promise.resolve(null),
    route === '/insights' || route === '/insights/:slug' ? fetchInsights() : Promise.resolve(null),
  ])
  const missingProgram = route === '/programs/:slug' && !programs?.some((p) => p.slug === match?.params.slug)
  const missingInsight = route === '/insights/:slug' && !insights?.some((i) => i.slug === match?.params.slug)
  const status = !match || missingProgram || missingInsight ? 404 : 200

  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <ProgramsDataContext.Provider value={programs}>
          <InsightsDataContext.Provider value={insights}>
            <App />
          </InsightsDataContext.Provider>
        </ProgramsDataContext.Provider>
      </StaticRouter>
    </StrictMode>,
  )

  const head = resolveMeta(path, { programs, insights })

  return { html, data: { programs, insights }, head, status }
}
