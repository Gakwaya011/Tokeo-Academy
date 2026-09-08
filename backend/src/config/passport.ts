import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { env } from './env'
import * as authService from '../modules/auth/auth.service'

// Stateless: we never call req.logIn / serializeUser, the strategy just
// resolves a User we then mint our own JWT for. `session: false` is set on
// every authenticate() call, so no session store is needed.
passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase()
        if (!email) {
          return done(new Error('Google account did not return an email address'))
        }
        const name = profile.displayName || email.split('@')[0]
        const user = await authService.findOrCreateGoogleUser({ email, name })
        return done(null, user)
      } catch (err) {
        return done(err as Error)
      }
    },
  ),
)

export { passport }
