import React from 'react'
import { motion } from 'framer-motion'
import Aurora from './Aurora'
import Stars from './Stars'
import ShinyText from './ShinyText'
import StarBorder from './StarBorder'
import { SiGithub } from 'react-icons/si'
import { HiMail, HiDocumentText } from 'react-icons/hi'

/**
 * Hero Section
 * Full viewport height hero section with animated Aurora background
 */
const Hero = () => {
  const handleViewProjects = () => {
    // Scroll to projects section
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleContact = () => {
    // Scroll to footer or open email
    const footerSection = document.getElementById('footer') || document.querySelector('footer')
    if (footerSection) {
      footerSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = 'mailto:RanaEhabHamadah@gmail.com'
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Stars background */}
      <Stars />
      
      {/* Aurora background with purple gradients */}
      <div className="absolute inset-0 opacity-60">
        <Aurora
          colorStops={["#6d28d9", "#7c3aed", "#8b5cf6"]}
          blend={0.3}
          amplitude={0.7}
          speed={0.3}
        />
      </div>
      
      {/* Additional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/15 to-black pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Name */}
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-8 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ShinyText
            text="Rana Ehab Hamadah"
            speed={2}
            delay={0.5}
            color="#e5e7eb"
            shineColor="#c084fc"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
          />
        </motion.h1>
        
        {/* Title */}
        <motion.p 
          className="text-xl md:text-2xl lg:text-3xl mb-6 font-medium gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Software Engineer
        </motion.p>
        
        {/* Description */}
        <motion.p 
          className="text-base md:text-lg lg:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Turning ideas into apps, websites, and occasionally midnight debugging sessions.
        </motion.p>
        
        {/* Social Links */}
        <motion.div 
          className="flex justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.a
            href="https://github.com/Rana2E"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass rounded-full text-gray-300 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Visit GitHub profile"
          >
            <SiGithub className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="/Rana_Ehab_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass rounded-full text-gray-300 hover:text-purple-300 transition-all duration-300 relative group"
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Download CV"
          >
            <HiDocumentText className="w-6 h-6" />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              CV
            </span>
          </motion.a>
          <motion.a
            href="mailto:RanaEhabHamadah@gmail.com"
            className="p-3 glass rounded-full text-gray-300 hover:text-purple-400 transition-all duration-300"
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Send email"
          >
            <HiMail className="w-6 h-6" />
          </motion.a>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <StarBorder
            as="button"
            onClick={handleViewProjects}
            color="cyan"
            speed="5s"
          >
            View Projects
          </StarBorder>
          <StarBorder
            as="button"
            onClick={handleContact}
            color="purple"
            speed="5s"
          >
            Contact Me
          </StarBorder>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

