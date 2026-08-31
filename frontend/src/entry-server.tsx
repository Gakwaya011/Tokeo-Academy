import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.tsx'
import { ProgramsDataContext } from './context/ProgramsDataContext'
import { InsightsDataContext } from './context/InsightsDataContext'
import { API_URL } from './lib/api'
import type { Program } from './types/program'
import type { Insight } from './types/insight'

async function fetchPrograms(): Promise<Program[]> {
  try {
    const res = await fetch(`${API_URL}/api/programs`)
    if (!res.ok) throw new Error(`/api/programs responded ${res.status}`)
    const { programs } = await res.json()
    return programs
  } catch (err) {
    console.error('SSR prefetch failed for /api/programs:', err)
    return []
  }
}

async function fetchInsights(): Promise<Insight[]> {
  try {
    const res = await fetch(`${API_URL}/api/insights`)
    if (!res.ok) throw new Error(`/api/insights responded ${res.status}`)
    const { insights } = await res.json()
    return insights
  } catch (err) {
    console.error('SSR prefetch failed for /api/insights:', err)
    return []
  }
}

export async function render(url: string) {
  const path = url.split('?')[0]
  const [programs, insights] = await Promise.all([
    path.startsWith('/programs') ? fetchPrograms() : Promise.resolve(null),
    path.startsWith('/insights') ? fetchInsights() : Promise.resolve(null),
  ])

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

  return { html, data: { programs, insights } }
}
