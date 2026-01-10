import React from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import Stars from './Stars'

/**
 * Quick Stats Section
 * Minimal layout with animated GPA counter using CountUp
 */
const QuickStats = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px',
  })

  return (
    <section id="stats" className="py-20 px-4 relative overflow-hidden bg-black" aria-label="Quick stats section">
      <Stars />
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/8 via-transparent to-cyan-900/8 animate-gradient"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-5xl font-bold mb-4 text-center gradient-text"
          style={{ willChange: 'opacity, transform' }}
        >
          Quick Stats
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
          className="text-center text-gray-400 mb-12 text-lg"
        >
          Academic achievements and expertise
        </motion.p>
        
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* GPA Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
            className="glass-strong rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300 bg-gray-950/80"
            whileHover={{ y: -5 }}
            style={{ willChange: 'opacity, transform' }}
          >
            <div className="text-5xl font-bold gradient-text mb-3">
              {inView && (
                <CountUp
                  start={0}
                  end={3.76}
                  decimals={2}
                  duration={2}
                  suffix=" / 4.00"
                />
              )}
            </div>
            <p className="text-gray-300 text-lg font-medium">GPA (Honors)</p>
          </motion.div>

          {/* Degree */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            className="glass-strong rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300 bg-gray-950/80"
            whileHover={{ y: -5 }}
            style={{ willChange: 'opacity, transform' }}
          >
            <div className="text-4xl font-bold gradient-text mb-3">
              B.Sc.
            </div>
            <p className="text-gray-300 text-lg font-medium">Software Engineering</p>
          </motion.div>

          {/* Platforms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
            className="glass-strong rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300 bg-gray-950/80"
            whileHover={{ y: -5 }}
            style={{ willChange: 'opacity, transform' }}
          >
            <div className="text-4xl font-bold gradient-text mb-3">
              Web & Mobile
            </div>
            <p className="text-gray-300 text-lg font-medium">Platforms</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default QuickStats

