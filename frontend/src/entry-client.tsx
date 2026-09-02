import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ProgramsDataContext } from './context/ProgramsDataContext'
import { InsightsDataContext } from './context/InsightsDataContext'
import { initAnalytics } from './lib/analytics'
import type { Program } from './types/program'
import type { Insight } from './types/insight'

declare global {
  interface Window {
    __SSR_DATA__?: { programs: Program[] | null; insights: Insight[] | null }
  }
}

// Read once, then drop it — only the very first paint needs to match what
// the server embedded; any later navigation refetches on its own.
const ssrData = window.__SSR_DATA__ ?? { programs: null, insights: null }
delete window.__SSR_DATA__

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <ProgramsDataContext.Provider value={ssrData.programs}>
        <InsightsDataContext.Provider value={ssrData.insights}>
          <App />
        </InsightsDataContext.Provider>
      </ProgramsDataContext.Provider>
    </BrowserRouter>
  </StrictMode>
)

// container.hasChildNodes() is not enough: the unreplaced <!--ssr-outlet-->
// comment placeholder (plain `vite` dev, no real SSR) counts as a child
// node too. Element children only exist when the server actually rendered
// real markup into the root.
if (container.children.length > 0) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}

initAnalytics()
