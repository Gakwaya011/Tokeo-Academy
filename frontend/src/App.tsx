import { useContext, useEffect } from 'react'
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { trackPageView, initScrollDepth } from './lib/analytics'
import { resolveMeta } from './lib/seo'
import { ProgramsDataContext } from './context/ProgramsDataContext'
import { InsightsDataContext } from './context/InsightsDataContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Loader from './components/Loader'
import PageContent from './components/PageContent'
import CookieNotice from './components/CookieNotice'
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import ProgramModule from './pages/ProgramModule'
import Insights from './pages/Insights'
import InsightArticle from './pages/InsightArticle'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import AuthCallback from './pages/AuthCallback'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import NotFound from './pages/NotFound'
import AdminRoute from './components/admin/AdminRoute'
import AdminMessages from './pages/admin/Messages'
import AdminInsights from './pages/admin/Insights'
import AdminPrograms from './pages/admin/Programs'

const AUTH_ROUTES = ['/login', '/signup', '/forgot-password', '/auth/callback']
const PRIVATE_TITLES: Record<string, string> = {
  '/login': 'Log In | Tokeo Academy',
  '/signup': 'Sign Up | Tokeo Academy',
  '/forgot-password': 'Reset Password | Tokeo Academy',
  '/auth/callback': 'Signing In | Tokeo Academy',
  '/admin': 'Admin Dashboard | Tokeo Academy',
  '/admin/messages': 'Messages | Tokeo Academy',
  '/admin/insights': 'Manage Insights | Tokeo Academy',
  '/admin/programs': 'Manage Programs | Tokeo Academy',
}

// Only auth/admin routes wait for session restoration; public pages render immediately.
function SessionBoundary() {
  const { loading } = useAuth()
  return loading ? <Loader /> : <Outlet />
}

function AppShell() {
  const location = useLocation()
  const programs = useContext(ProgramsDataContext)
  const insights = useContext(InsightsDataContext)

  useEffect(() => {
    const path = location.pathname.replace(/\/+$/, '').toLowerCase() || '/'
    document.title = PRIVATE_TITLES[path] || resolveMeta(path, { programs, insights }).title
  }, [location.pathname, programs, insights])

  // GA4 SPA tracking: one page_view per route, scroll-depth re-armed each time.
  useEffect(() => {
    trackPageView(location.pathname + location.search)
    const teardown = initScrollDepth()
    return teardown
  }, [location.pathname, location.search])

  const path = location.pathname.replace(/\/+$/, '').toLowerCase() || '/'
  const isAuthRoute = AUTH_ROUTES.includes(path)
  const isAdminRoute = path === '/admin' || path.startsWith('/admin/')
  const hideChrome = isAuthRoute || isAdminRoute

  return (
    <>
      {!hideChrome && <Navbar />}
      <PageContent animate={!hideChrome}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:slug" element={<ProgramModule />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<InsightArticle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route element={<SessionBoundary />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/admin" element={<AdminRoute><Navigate to="/admin/messages" replace /></AdminRoute>} />
            <Route
              path="/admin/messages"
              element={
                <AdminRoute>
                  <AdminMessages />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/insights"
              element={
                <AdminRoute>
                  <AdminInsights />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/programs"
              element={
                <AdminRoute>
                  <AdminPrograms />
                </AdminRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageContent>
      {!hideChrome && <Footer />}
      <CookieNotice />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  )
}
