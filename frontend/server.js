import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import helmet from 'helmet'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const port = process.env.PORT || 5174

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
const { render, resolveRoute } = await import('./dist/server/entry-server.js')

const app = express()

app.disable('x-powered-by')

// Per-request nonce for the one inline script we emit (the SSR data blob),
// so the CSP below can forbid all other inline script.
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64')
  next()
})

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        frameAncestors: ["'none'"],
        objectSrc: ["'none'"],
        formAction: ["'self'"],
        scriptSrc: [
          "'self'",
          (req, res) => `'nonce-${res.locals.nonce}'`,
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com',
        ],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: [
          "'self'",
          'data:',
          'blob:',
          'https://res.cloudinary.com',
          'https://www.google-analytics.com',
          'https://www.googletagmanager.com',
        ],
        connectSrc: [
          "'self'",
          'https://tokeoacademy.org',
          'https://www.google-analytics.com',
          'https://www.googletagmanager.com',
        ],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: false,
    hsts: { maxAge: 15552000, includeSubDomains: true },
  }),
)

app.use(express.static(path.resolve(__dirname, 'dist/client'), { index: false }))

app.use(async (req, res) => {
  try {
    let appHtml = ''
    let dataScript = ''
    let head = null
    const match = resolveRoute(req.originalUrl)
    let status = match ? 200 : 404
    // Known auth/admin routes keep their client-rendered shell. Unknown
    // paths are server-rendered too, so the existing 404 page is in the HTML.
    if (!match?.route.handle?.clientOnly) {
      const result = await render(req.originalUrl)
      status = result.status
      appHtml = result.html
      head = result.head
      if (result.data) {
        dataScript = `<script nonce="${res.locals.nonce}">window.__SSR_DATA__=${safeStringify(result.data)}</script>`
      }
    }
    let html = template.replace('<!--ssr-outlet-->', appHtml)
    if (head) html = applyHead(html, head)
    html = html.replace('</head>', `${dataScript}</head>`)
    res.status(status).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    console.error(e.stack)
    res.status(500).end('Internal Server Error')
  }
})

app.listen(port, () => {
  console.log(`Frontend server listening on http://localhost:${port}`)
})
