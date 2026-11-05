import React, { Suspense, lazy, useEffect, useMemo } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stars from './components/Stars'

const AboutMe = lazy(() => import('./components/AboutMe'))
const QuickStats = lazy(() => import('./components/QuickStats'))
const Projects = lazy(() => import('./components/Projects'))
const Skills = lazy(() => import('./components/Skills'))
const Experience = lazy(() => import('./components/Experience'))
const JustForFun = lazy(() => import('./components/JustForFun'))
const Footer = lazy(() => import('./components/Footer'))
const ThingsICantBuild = lazy(() => import('./components/ThingsICantBuild'))

const SectionLoader = () => (
  <div className="flex min-h-[200px] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-lavender border-t-transparent" />
  </div>
)

function isNotFoundPath() {
  if (typeof window === 'undefined') return false
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  return path !== '/' && path !== '/index.html'
}

function App() {
  const notFound = useMemo(() => isNotFoundPath(), [])

  // Warm the Projects chunk during idle time so entering the section does not
  // contend with decode of multi‑MB previews on the same frame as navigation.
  useEffect(() => {
    if (notFound) return undefined
    const warm = () => {
      import('./components/Projects')
      import('./components/Skills')
    }
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(warm, { timeout: 2500 })
      return () => window.cancelIdleCallback(id)
    }
    const timer = window.setTimeout(warm, 1200)
    return () => window.clearTimeout(timer)
  }, [notFound])

  if (notFound) {
    return (
      <div className="relative min-h-screen bg-ink">
        <Stars variant="fixed" />
        <Suspense fallback={<SectionLoader />}>
          <ThingsICantBuild fullPage />
        </Suspense>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-parchment"
      >
        Skip to content
      </a>
      <Stars variant="fixed" />
      <Navbar />
      <main id="content">
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <AboutMe />
          <QuickStats />
          <Projects />
          <Skills />
          <Experience />
          <JustForFun />
          <Footer />
        </Suspense>
      </main>
    </div>
  )
}

export default App
