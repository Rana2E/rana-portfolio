import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import meImage from '../assets/Me.jpeg'

const AboutMe = () => {
  const reduceMotion = useReducedMotion()
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px',
  })

  const enter = (fromX, delay) =>
    reduceMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, x: fromX },
          animate: inView ? { opacity: 1, x: 0 } : {},
          transition: { duration: 0.5, delay, ease: 'easeOut' },
        }

  return (
    <section id="about" className="relative scroll-mt-28 px-4 py-20 sm:px-6" aria-label="About">
      <div ref={ref} className="section-shell">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-14">
          <motion.figure
            {...enter(-28, 0.08)}
            className="relative mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl lg:mx-0"
          >
            <div className="pointer-events-none absolute -inset-px rounded-2xl border border-lavender/25" />
            <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-surface">
              <img
                src={meImage}
                alt="Rana Ehab Hamadah at her graduation ceremony"
                className="h-full w-full object-cover object-[22%_82%]"
                width="640"
                height="853"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="mt-3 text-center text-[0.65rem] tracking-[0.14em] text-muted uppercase sm:text-xs sm:tracking-[0.16em] lg:text-left">
              University of Prince Mugrin · 2025
            </figcaption>
          </motion.figure>

          <motion.div {...enter(28, 0.12)} className="space-y-6">
            <div>
              <p className="section-kicker">About</p>
              <h2 className="section-title text-left">A software engineer who&apos;s always curious.</h2>
            </div>

            <div className="max-w-2xl space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                I&apos;m Rana, a software engineer based in Jeddah. I graduated from the University of
                Prince Mugrin in Madinah in 2025, earning my B.Sc. in Software Engineering with First
                Class Honors.
              </p>
              <p>
                I like understanding the why behind what I&apos;m building. I&apos;m not someone who
                enjoys just ticking tasks off a list — I want to understand the problem, explore
                different approaches, and figure out what actually makes sense.
              </p>
              <p>
                What I enjoy most about this field is that there&apos;s always more to learn. I&apos;ve
                worked across mobile development, web applications, and business systems, and I&apos;m
                always interested in exploring something new, challenging myself, and getting better
                at what I do.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe
