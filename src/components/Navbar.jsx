import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './StarBorder.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navbarContentRef = useRef(null)

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#footer' },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(`#${sections[i]}`)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Override StarBorder default padding - wider horizontally, shorter vertically
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
    const element = document.querySelector(href)
    if (element) {
      const offset = 80 // Account for navbar height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-3'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="star-border-container">
          <div
            className="border-gradient-bottom"
            style={{
              background: 'radial-gradient(circle, cyan, transparent 10%)',
              animationDuration: '5s'
            }}
          ></div>
          <div
            className="border-gradient-top"
            style={{
              background: 'radial-gradient(circle, purple, transparent 10%)',
              animationDuration: '5s'
            }}
          ></div>
          <div 
            ref={navbarContentRef}
            className={`inner-content glass-strong rounded-2xl px-4 sm:px-6 py-3 ${
              isScrolled ? 'backdrop-blur-xl' : 'backdrop-blur-lg'
            }`}
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid #222',
              textAlign: 'left',
              fontSize: 'inherit'
            }}
          >
            <div className="flex items-center justify-between">
            {/* Logo/Name */}
            <motion.button
              onClick={scrollToTop}
              className="text-xl font-bold gradient-text cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll to top"
            >
              REH
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 ml-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-cyan-400'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    aria-label={`Navigate to ${link.name} section`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                        layoutId="activeSection"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.a>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
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

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <div className="pt-4 pb-2 space-y-2">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href
                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'text-cyan-400 bg-cyan-400/10'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                        whileHover={{ x: 4 }}
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

