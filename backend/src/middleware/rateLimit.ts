import rateLimit, { ipKeyGenerator } from 'express-rate-limit'

const FIFTEEN_MIN = 15 * 60 * 1000
const ONE_HOUR = 60 * 60 * 1000

const tooMany = (message: string) => ({ error: message })

// App-wide backstop for every route. Generous — real users won't notice,
// but a scripted flood gets capped.
export const globalLimiter = rateLimit({
  windowMs: FIFTEEN_MIN,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: tooMany('Too many requests. Please slow down and try again shortly.'),
})

// Signup — one IP shouldn't be creating many accounts.
export const signupLimiter = rateLimit({
  windowMs: ONE_HOUR,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: tooMany('Too many sign-up attempts. Please try again in an hour.'),
})

// Login — per IP. Stricter, shorter window.
export const loginIpLimiter = rateLimit({
  windowMs: FIFTEEN_MIN,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: tooMany('Too many login attempts. Please try again in 15 minutes.'),
})

// Login — per email address, so a botnet spread across many IPs still can't
// grind one account. Runs after express.json(), so req.body is parsed.
export const loginEmailLimiter = rateLimit({
  windowMs: FIFTEEN_MIN,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: tooMany('Too many failed attempts for this account. Please try again in 15 minutes.'),
  keyGenerator: (req) => {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : ''
    return email || ipKeyGenerator(req.ip ?? '')
  },
})

// Public contact form — no auth, so this is the main abuse guard.
export const contactLimiter = rateLimit({
  windowMs: ONE_HOUR,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: tooMany('You have sent several messages recently. Please try again later.'),
})

// Payment endpoints — a logged-in user shouldn't be hammering these.
export const paymentLimiter = rateLimit({
  windowMs: FIFTEEN_MIN,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: tooMany('Too many payment attempts. Please wait a few minutes.'),
})
