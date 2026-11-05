import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import FuzzyText from './FuzzyText'

const ThingsICantBuild = ({ fullPage = false }) => {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="not-found"
      className={`relative overflow-hidden px-4 ${fullPage ? 'flex min-h-screen items-center py-24' : 'py-20'}`}
      aria-label="Page not found"
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {fullPage && (
          <a
            href="/"
            className="mb-12 inline-block font-display text-2xl italic text-parchment"
            aria-label="Return home"
          >
            RE
          </a>
        )}

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10 font-display text-3xl text-parchment sm:text-5xl"
        >
          Things I Can&apos;t Build
        </motion.h1>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mb-4 flex justify-center"
        >
          <FuzzyText
            baseIntensity={reduceMotion ? 0 : 0.2}
            hoverIntensity={reduceMotion ? 0 : 0.5}
            enableHover={!reduceMotion}
            fontFamily="Open Sans"
            fontSize="clamp(6rem, 20vw, 12rem)"
            fontWeight={800}
            color="#BFA0EC"
            fuzzRange={30}
            fps={reduceMotion ? 1 : 60}
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
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="flex justify-center"
        >
          <FuzzyText
            baseIntensity={reduceMotion ? 0 : 0.2}
            hoverIntensity={reduceMotion ? 0 : 0.5}
            enableHover={!reduceMotion}
            fontFamily="Gochi Hand"
            fontSize="clamp(2.5rem, 8vw, 5rem)"
            fontWeight={700}
            color="#67CCD8"
            fuzzRange={30}
            fps={reduceMotion ? 1 : 60}
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

        {fullPage && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="mt-12"
          >
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-[18px] border border-lavender/40 px-6 py-3 text-sm text-parchment transition-colors hover:border-cyan hover:text-cyan"
            >
              Return home
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default ThingsICantBuild
