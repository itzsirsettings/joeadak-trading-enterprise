import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ErrorBoundary from './components/ui/ErrorBoundary'
import { initGA, logPageView } from './config/analytics'

// Lazy-loaded routes for code splitting (Fix #7)
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Projects = lazy(() => import('./pages/Projects'))
const Testimonials = lazy(() => import('./pages/Testimonials'))
const Contact = lazy(() => import('./pages/Contact'))
const Insights = lazy(() => import('./pages/Insights'))
const SinglePost = lazy(() => import('./pages/SinglePost'))
const NotFound404 = lazy(() => import('./pages/NotFound404'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { 
    window.scrollTo(0, 0)
    logPageView(pathname)
  }, [pathname])
  return null
}

// Shared Layout wrapper (Fix #10)
function Layout() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<SinglePost />} />
        </Route>
        <Route path="*" element={
          <Suspense fallback={null}>
            <NotFound404 />
          </Suspense>
        } />
      </Routes>
    </>
  )
}

function App() {
  useEffect(() => {
    initGA()
  }, [])

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <AppContent />
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App
