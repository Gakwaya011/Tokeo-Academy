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
  /^\/programs\/[^/]+$/,
  /^\/insights$/,
  /^\/insights\/[^/]+$/,
  /^\/contact$/,
  /^\/privacy-policy$/,
  /^\/terms-of-service$/,
]

function isSsrPath(url) {
  return SSR_PATTERNS.some((re) => re.test(url.split('?')[0]))
}

// Escapes characters that could break out of the <script> tag or be
// misread as markup, so embedded JSON can never smuggle in a script injection.
function safeStringify(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')
}

const template = await fs.readFile(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

const app = express()
app.use(express.static(path.resolve(__dirname, 'dist/client'), { index: false }))

app.use(async (req, res) => {
  try {
    let appHtml = ''
    let dataScript = ''
    if (isSsrPath(req.originalUrl)) {
      const result = await render(req.originalUrl)
      appHtml = result.html
      if (result.data) {
        dataScript = `<script>window.__SSR_DATA__=${safeStringify(result.data)}</script>`
      }
    }
    const html = template
      .replace('<!--ssr-outlet-->', appHtml)
      .replace('</head>', `${dataScript}</head>`)
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    console.error(e.stack)
    res.status(500).end('Internal Server Error')
  }
})

app.listen(port, () => {
  console.log(`Frontend server listening on http://localhost:${port}`)
})
