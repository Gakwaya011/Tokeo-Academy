import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { trackPageView, initScrollDepth } from './lib/analytics'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Loader from './components/Loader'
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
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import NotFound from './pages/NotFound'
import AdminRoute from './components/admin/AdminRoute'
import AdminMessages from './pages/admin/Messages'
import AdminInsights from './pages/admin/Insights'
import AdminPrograms from './pages/admin/Programs'
import RequireEnrollment from './components/payments/RequireEnrollment'
import PaymentVerify from './pages/PaymentVerify'
import Dashboard from './pages/Dashboard'

const AUTH_ROUTES = ['/login', '/signup', '/forgot-password']

function AppShell() {
  const location = useLocation()

  // GA4 SPA tracking: one page_view per route, scroll-depth re-armed each time.
  useEffect(() => {
    trackPageView(location.pathname + location.search)
    const teardown = initScrollDepth()
    return teardown
  }, [location.pathname, location.search])

  const isAuthRoute = AUTH_ROUTES.includes(location.pathname)
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isPlatformRoute = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/payment')
  const hideChrome = isAuthRoute || isAdminRoute || isPlatformRoute

  return (
    <>
      {!hideChrome && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:slug" element={<ProgramModule />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<InsightArticle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/payment/verify" element={<PaymentVerify />} />
          <Route
            path="/dashboard"
            element={
              <RequireEnrollment>
                <Dashboard />
              </RequireEnrollment>
            }
          />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!hideChrome && <Footer />}
      <CookieNotice />
    </>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <AuthProvider>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <AppShell />
    </AuthProvider>
  )
}
