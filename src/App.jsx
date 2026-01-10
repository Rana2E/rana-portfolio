import React, { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

// Lazy load components that are below the fold
const AboutMe = lazy(() => import('./components/AboutMe'))
const QuickStats = lazy(() => import('./components/QuickStats'))
const Projects = lazy(() => import('./components/Projects'))
const JustForFun = lazy(() => import('./components/JustForFun'))
const Skills = lazy(() => import('./components/Skills'))
const Experience = lazy(() => import('./components/Experience'))
const ThingsICantBuild = lazy(() => import('./components/ThingsICantBuild'))
const Footer = lazy(() => import('./components/Footer'))

// Simple loading placeholder
const SectionLoader = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
)

/**
 * Main App Component
 * Assembles all sections in the correct order
 */
function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <AboutMe />
        <QuickStats />
        <Projects />
        <JustForFun />
        <Skills />
        <Experience />
        <ThingsICantBuild />
        <Footer />
      </Suspense>
    </div>
  )
}

export default App

