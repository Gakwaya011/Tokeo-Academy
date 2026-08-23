import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const port = process.env.PORT || 5174

// Only these public/marketing routes get real server-side rendering, so
// crawlers see real content. Everything else (auth, dashboard, admin,
// payment) keeps working exactly as before: a plain client-rendered SPA
// shell, since those pages shouldn't be indexed anyway.
const SSR_PATTERNS = [
  /^\/$/,
  /^\/about$/,
  /^\/programs$/,
  /^\/insights$/,
  /^\/insights\/[^/]+$/,
  /^\/contact$/,
  /^\/privacy-policy$/,
  /^\/terms-of-service$/,
]

function isSsrPath(url) {
  return SSR_PATTERNS.some((re) => re.test(url.split('?')[0]))
}

const template = await fs.readFile(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

const app = express()
app.use(express.static(path.resolve(__dirname, 'dist/client'), { index: false }))

app.use((req, res) => {
  try {
    const appHtml = isSsrPath(req.originalUrl) ? render(req.originalUrl) : ''
    const html = template.replace('<!--ssr-outlet-->', appHtml)
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    console.error(e.stack)
    res.status(500).end('Internal Server Error')
  }
})

app.listen(port, () => {
  console.log(`Frontend server listening on http://localhost:${port}`)
})
