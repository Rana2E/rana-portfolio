import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

const highlights = [
  {
    title: 'Published Mobile App',
    body: 'UniTok · Available on the App Store',
  },
  {
    title: 'Full-Stack Development',
    body: 'Production Laravel Platform',
  },
  {
    title: 'ERP & Automation',
    body: 'Odoo · Business Workflows',
  },
]

const QuickStats = () => {
  const reduceMotion = useReducedMotion()
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px',
  })
  const { ref: gpaRef, inView: gpaInView } = useInView({
    threshold: 0.4,
    triggerOnce: true,
    rootMargin: '0px',
  })

  const fade = (delay = 0) =>
    reduceMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.45, delay, ease: 'easeOut' },
        }

  return (
    <section id="highlights" className="relative scroll-mt-28 px-4 py-20 sm:px-6" aria-label="At a glance">
      <div className="section-shell">
        <motion.div className="mb-12 text-center" {...fade(0)}>
          <p className="section-kicker">Highlights</p>
          <h2 className="section-title">At a Glance</h2>
          <p className="section-lede">A few things I&apos;m proud to have worked on.</p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item, index) => (
            <motion.article
              key={item.title}
              className="glass-strong flex h-full flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
              {...fade(0.08 + index * 0.06)}
              whileHover={reduceMotion ? undefined : { y: -4 }}
            >
              <div className="mb-4 h-px w-10 bg-gradient-to-r from-lavender to-cyan" />
              <h3 className="mb-2 text-lg font-medium text-parchment">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{item.body}</p>
            </motion.article>
          ))}

          <div ref={gpaRef} className="h-full">
            <motion.article
              className="glass-strong flex h-full flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
              {...fade(0.28)}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              aria-label="Academic GPA"
            >
              <div className="mb-4 h-px w-10 bg-gradient-to-r from-lavender to-cyan" />
              <div className="mb-2 min-h-[3.25rem] font-display text-4xl tracking-tight gradient-text tabular-nums sm:text-5xl">
                {reduceMotion ? (
                  <span>3.76 / 4.00</span>
                ) : gpaInView ? (
                  <CountUp start={0} end={3.76} decimals={2} duration={2} suffix=" / 4.00" />
                ) : (
                  <span>0.00 / 4.00</span>
                )}
              </div>
              <h3 className="mb-2 text-lg font-medium text-parchment">Academic Achievement</h3>
              <p className="text-sm leading-relaxed text-muted">First Class Honors</p>
              <p className="mt-3 text-xs tracking-[0.14em] text-muted/80 uppercase">
                B.Sc. Software Engineering · 2025
              </p>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuickStats
