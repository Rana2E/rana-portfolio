import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import FuzzyText from './FuzzyText'
import Stars from './Stars'

/**
 * Things I Can't Build Section
 * Centered section with "404 — Not Found" with fuzzy text effect
 */
const ThingsICantBuild = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <section id="things-i-cant-build" className="py-20 px-4 relative overflow-hidden bg-black">
      <Stars />
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-cyan-900/5 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-16 text-white"
        >
          Things I Can't Build:
        </motion.h2>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 flex justify-center"
        >
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
            fontFamily="Open Sans"
            fontSize="clamp(6rem, 20vw, 12rem)"
            fontWeight={800}
            color="#c084fc"
            fuzzRange={30}
            fps={60}
            direction="horizontal"
            transitionDuration={0}
            letterSpacing={0}
            clickEffect={false}
            glitchMode={false}
            glitchInterval={2000}
            glitchDuration={200}
          >
            404
          </FuzzyText>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center"
        >
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
            fontFamily="Gochi Hand"
            fontSize="clamp(2.5rem, 8vw, 5rem)"
            fontWeight={700}
            color="#c084fc"
            fuzzRange={30}
            fps={60}
            direction="horizontal"
            transitionDuration={0}
            letterSpacing={0}
            clickEffect={false}
            glitchMode={false}
            glitchInterval={2000}
            glitchDuration={200}
          >
            not found
          </FuzzyText>
        </motion.div>
      </div>
    </section>
  )
}

export default ThingsICantBuild

