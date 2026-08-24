import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
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
