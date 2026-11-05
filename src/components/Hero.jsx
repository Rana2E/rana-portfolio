import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Aurora from './Aurora'
import StarBorder from './StarBorder'
import { SiGithub, SiLinkedin } from 'react-icons/si'
import { HiMail } from 'react-icons/hi'
import { SITE } from '../data/site'
import CopyContact from './CopyContact'

const Hero = () => {
  const reduceMotion = useReducedMotion()

  const handleViewProjects = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
    }
  }

  const fade = (delay = 0, y = 20) =>
    reduceMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <section
      className="hero relative flex min-h-[100svh] items-center overflow-x-clip pb-16 pt-28 sm:pb-20 sm:pt-32"
      aria-label="Introduction"
    >
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <Aurora
          colorStops={['#BFA0EC', '#172031', '#67CCD8']}
          blend={0.45}
          amplitude={0.45}
          speed={0.22}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink" />

      <div className="hero-editorial relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Identity row — kicker + hairline spanning the composition */}
        <motion.div className="hero-editorial__meta" {...fade(0.08, 12)}>
          <p className="hero-editorial__kicker">Software Engineer · Jeddah, Saudi Arabia</p>
          <span className="hero-editorial__rule" aria-hidden="true" />
        </motion.div>

        {/* Name as the primary visual identity */}
        <motion.h1 className="hero-name" {...fade(0.18, 28)}>
          <span className="hero-name__given">Rana Ehab </span>
          <span className="hero-name__family">Hamadah</span>
        </motion.h1>

        {/* Statement + supporting column — asymmetric editorial grid */}
        <div className="hero-editorial__body">
          <motion.p className="hero-editorial__statement" {...fade(0.32, 18)}>
            Building thoughtful software — from interface to system.
          </motion.p>

          <motion.div className="hero-editorial__aside" {...fade(0.42, 18)}>
            <span className="hero-editorial__aside-rule" aria-hidden="true" />
            <p className="hero-editorial__lede">
              Flutter applications, full-stack web platforms, and business systems — engineered with
              clarity for users and the workflows behind them.
            </p>
          </motion.div>
        </div>

        <motion.div className="hero-editorial__actions" {...fade(0.55, 16)}>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <StarBorder
              as="button"
              type="button"
              onClick={handleViewProjects}
              color="#67CCD8"
              speed="5s"
              className="w-full sm:w-auto"
            >
              Explore My Work
            </StarBorder>
            <a
              href={SITE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-[18px] border border-line bg-transparent px-6 py-3.5 text-[15px] text-parchment transition-colors hover:border-lavender/50 hover:text-lavender sm:w-auto"
            >
              Download Résumé
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-parchment"
              aria-label="GitHub profile"
            >
              <SiGithub className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-parchment"
              aria-label="LinkedIn profile"
            >
              <SiLinkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <CopyContact
              value={SITE.email}
              label="Email"
              copiedMessage="Email copied to clipboard"
              ariaLabel="Copy email address"
              className="inline-flex items-center gap-2 transition-colors hover:text-parchment"
              icon={<HiMail className="h-4 w-4" />}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
