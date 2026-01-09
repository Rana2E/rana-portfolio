import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutMe from './components/AboutMe'
import QuickStats from './components/QuickStats'
import Projects from './components/Projects'
import JustForFun from './components/JustForFun'
import Skills from './components/Skills'
import Experience from './components/Experience'
import ThingsICantBuild from './components/ThingsICantBuild'
import Footer from './components/Footer'

/**
 * Main App Component
 * Assembles all sections in the correct order
 */
function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutMe />
      <QuickStats />
      <Projects />
      <JustForFun />
      <Skills />
      <Experience />
      <ThingsICantBuild />
      <Footer />
    </div>
  )
}

export default App

