import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const experiences = [
  {
    title: 'Odoo Developer (Contract)',
    company: 'MILE',
    dates: 'June 2026 – Present',
    current: true,
    description:
      'I analyze business requirements and customize Odoo websites and QWeb templates — improving event registration, configuring tickets and discounts, and automating Events-to-CRM and Contacts processes. I also support email campaigns and assess training and eLearning workflows, working primarily through Odoo Studio, QWeb, HTML, CSS, JavaScript, and Automated Actions.',
  },
  {
    title: 'Co-Founder & Flutter Engineer',
    company: 'UniTok',
    dates: 'June 2025 – September 2026',
    description:
      'I contributed to product development, Flutter functionality, API integration, real-time messaging, and debugging, collaborating through Git, pull requests, and code reviews, and coordinating work in Jira.',
  },
  {
    title: 'Full-Stack Web Developer',
    company: 'Freelance',
    dates: 'October 2025 – May 2026',
    description:
      'I designed and developed a Laravel platform for postgraduate academic services, including four role-based user interfaces, document management, authentication, notifications, and production payment integration.',
  },
  {
    title: 'ERP Systems Trainee',
    company: 'iLines Solutions',
    dates: 'June 2025 – August 2025',
    description:
      'I developed a custom Odoo training module using Python and XML, configured data models, views, and access permissions, and worked with Docker and Ubuntu.',
  },
]

const Experience = () => {
  const reduceMotion = useReducedMotion()
  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
    rootMargin: '50px',
  })

  return (
    <section id="experience" className="relative scroll-mt-28 overflow-hidden px-4 py-20 sm:px-6" aria-label="Experience">
      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={inView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-12 text-center"
        >
          <p className="section-kicker">Experience</p>
          <h2 className="section-title">Where the work happened.</h2>
          <p className="section-lede">
            From building digital products to solving real-world business challenges.
          </p>
        </motion.div>

        {/*
          Shared rail layout: one column owns both the vertical line and every marker.
          The line is a 1px stroke painted at the rail center, so it always bisects
          the markers regardless of border color or active state.
        */}
        <div ref={ref} className="timeline">
          {experiences.map((exp, index) => (
            <motion.article
              key={`${exp.company}-${exp.title}`}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={inView || reduceMotion ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.07, ease: 'easeOut' }}
              className="timeline-item"
            >
              <div className="timeline-rail" aria-hidden="true">
                <span
                  className={`timeline-marker ${
                    exp.current ? 'timeline-marker--current' : 'timeline-marker--past'
                  }`}
                />
              </div>

              <div className="timeline-card glass-strong rounded-2xl border border-lavender/15 p-6 sm:p-8">
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan">{exp.dates}</p>
                  {exp.current && (
                    <span className="rounded-full border border-cyan/30 px-2.5 py-0.5 text-[0.65rem] uppercase tracking-[0.16em] text-cyan">
                      Present
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-medium text-parchment sm:text-2xl">{exp.title}</h3>
                <p className="mb-4 mt-1 text-lavender">{exp.company}</p>
                <p className="text-base leading-relaxed text-muted">{exp.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
