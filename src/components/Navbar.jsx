import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import MonogramMark from './MonogramMark'
import './StarBorder.css'

const NAV_LINKS = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Contact', href: '#contact', id: 'contact' },
]

const NAV_OFFSET = 96
const NONE = null

const getDocumentTop = (el) => el.getBoundingClientRect().top + window.scrollY

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  // No section active while the visitor is still in the Hero
  const [activeSection, setActiveSection] = useState(NONE)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navbarContentRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const clickLockRef = useRef(false)
  const clickLockTimerRef = useRef(null)
  const scrolledRef = useRef(false)
  const activeRef = useRef(NONE)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0

      const nextScrolled = window.scrollY > 50
      if (scrolledRef.current !== nextScrolled) {
        scrolledRef.current = nextScrolled
        setIsScrolled(nextScrolled)
      }

      if (clickLockRef.current) return

      const referenceY = window.scrollY + NAV_OFFSET + 20
      let currentId = NONE

      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id)
        if (!el) continue
        if (getDocumentTop(el) <= referenceY) {
          currentId = link.id
        }
      }

      // Short final sections often never cross the reference line at max scroll.
      const doc = document.documentElement
      const atBottom =
        window.innerHeight + window.scrollY >= doc.scrollHeight - 64
      if (atBottom) {
        currentId = NAV_LINKS[NAV_LINKS.length - 1].id
      }

      const next = currentId ? `#${currentId}` : NONE
      if (activeRef.current !== next) {
        activeRef.current = next
        setActiveSection(next)
      }
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    const boot = window.setInterval(() => {
      if (NAV_LINKS.every((l) => document.getElementById(l.id))) {
        window.clearInterval(boot)
        update()
      }
    }, 120)
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.clearInterval(boot)
      if (frame) window.cancelAnimationFrame(frame)
      if (clickLockTimerRef.current) window.clearTimeout(clickLockTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (navbarContentRef.current) {
      const isSmallScreen = window.innerWidth >= 640
      navbarContentRef.current.style.setProperty(
        'padding',
        `0.5rem ${isSmallScreen ? '2rem' : '1.5rem'}`,
        'important'
      )
    }
  }, [isScrolled])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    activeRef.current = href
    setActiveSection(href)
    clickLockRef.current = true
    if (clickLockTimerRef.current) window.clearTimeout(clickLockTimerRef.current)
    clickLockTimerRef.current = window.setTimeout(() => {
      clickLockRef.current = false
    }, reduceMotion ? 50 : 900)

    const element = document.querySelector(href)
    if (element) {
      const offsetPosition = getDocumentTop(element) - NAV_OFFSET
      window.scrollTo({
        top: offsetPosition,
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
    }
  }

  const scrollToTop = () => {
    activeRef.current = NONE
    setActiveSection(NONE)
    clickLockRef.current = true
    if (clickLockTimerRef.current) window.clearTimeout(clickLockTimerRef.current)
    clickLockTimerRef.current = window.setTimeout(() => {
      clickLockRef.current = false
    }, reduceMotion ? 50 : 900)
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-3'
      }`}
      initial={reduceMotion ? false : { y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Primary"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="star-border-container" style={{ display: 'block', width: '100%' }}>
          <div
            className="border-gradient-bottom"
            style={{
              background: 'radial-gradient(circle, #67CCD8, transparent 10%)',
              animationDuration: '5s',
            }}
          />
          <div
            className="border-gradient-top"
            style={{
              background: 'radial-gradient(circle, #BFA0EC, transparent 10%)',
              animationDuration: '5s',
            }}
          />
          <div
            ref={navbarContentRef}
            className={`inner-content glass-strong rounded-2xl px-4 py-3 sm:px-6 ${
              isScrolled ? 'backdrop-blur-xl' : 'backdrop-blur-lg'
            }`}
            style={{
              background: 'rgba(9, 11, 18, 0.72)',
              border: '1px solid rgba(191, 160, 236, 0.16)',
              textAlign: 'left',
              fontSize: 'inherit',
            }}
          >
            <div className="flex items-center justify-between">
              <motion.button
                type="button"
                onClick={scrollToTop}
                className="nav-monogram"
                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                aria-label="Scroll to top"
              >
                <MonogramMark className="nav-monogram__mark" title="RE monogram — scroll to top" />
              </motion.button>

              <div className="ml-8 hidden items-center gap-1 md:flex">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        isActive ? 'text-cyan' : 'text-muted hover:text-parchment'
                      }`}
                      whileHover={reduceMotion ? undefined : { y: -2 }}
                      whileTap={reduceMotion ? undefined : { y: 0 }}
                      aria-current={isActive ? 'location' : undefined}
                    >
                      {link.name}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-cyan to-lavender"
                          layoutId={reduceMotion ? undefined : 'activeSection'}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.a>
                  )
                })}
              </div>

              <motion.button
                type="button"
                className="p-2 text-muted transition-colors hover:text-parchment md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </motion.button>
            </div>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  id="mobile-nav"
                  initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={reduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden md:hidden"
                >
                  <div className="space-y-2 pb-2 pt-4">
                    {NAV_LINKS.map((link) => {
                      const isActive = activeSection === link.href
                      return (
                        <motion.a
                          key={link.name}
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className={`block rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-cyan/10 text-cyan'
                              : 'text-muted hover:bg-white/5 hover:text-parchment'
                          }`}
                          whileHover={reduceMotion ? undefined : { x: 4 }}
                        >
                          {link.name}
                        </motion.a>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
