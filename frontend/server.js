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

function escAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// Swap the template's default per-page tags for the route-resolved ones,
// then add canonical + og:url. Non-SSR routes keep the index.html defaults.
function applyHead(html, head) {
  const title = escAttr(head.title)
  const description = escAttr(head.description)
  const canonical = escAttr(head.canonical)
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${description}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${description}" />`)
    .replace('</head>', `  <link rel="canonical" href="${canonical}" />\n    <meta property="og:url" content="${canonical}" />\n  </head>`)
}

const template = await fs.readFile(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

const app = express()
app.use(express.static(path.resolve(__dirname, 'dist/client'), { index: false }))

app.use(async (req, res) => {
  try {
    let appHtml = ''
    let dataScript = ''
    let head = null
    if (isSsrPath(req.originalUrl)) {
      const result = await render(req.originalUrl)
      appHtml = result.html
      head = result.head
      if (result.data) {
        dataScript = `<script>window.__SSR_DATA__=${safeStringify(result.data)}</script>`
      }
    }
    let html = template.replace('<!--ssr-outlet-->', appHtml)
    if (head) html = applyHead(html, head)
    html = html.replace('</head>', `${dataScript}</head>`)
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    console.error(e.stack)
    res.status(500).end('Internal Server Error')
  }
})

app.listen(port, () => {
  console.log(`Frontend server listening on http://localhost:${port}`)
})
