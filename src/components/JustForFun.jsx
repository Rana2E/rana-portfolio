import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import StarBorder from './StarBorder'
import birthdayImage from '../assets/Birthday.png'

const JustForFun = () => {
  const reduceMotion = useReducedMotion()
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px',
  })

  const funProject = {
    title: 'Interactive Birthday Website',
    description:
      'A personal JavaScript and CSS gift for my brother while he was studying abroad. The experience starts with a birthday song, then uses microphone input so candles can be blown out before a handwritten message appears. It is a small study in animation, sound, and interaction — kept here because it still makes me smile.',
    focus: ['JavaScript', 'CSS', 'Animation', 'Microphone interaction'],
    link: 'https://drive.google.com/file/d/1r4kOBKsYTwK5rtcXafuuOZA43o2b2DHC/view?usp=sharing',
  }

  return (
    <section id="just-for-fun" className="relative scroll-mt-28 px-4 py-16 sm:px-6" aria-label="Fun experiments">
      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={inView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-8 text-center"
        >
          <p className="section-kicker">Aside</p>
          <h2 className="font-display text-3xl tracking-tight text-parchment sm:text-4xl">
            Fun experiments
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">
            A quiet corner for playful ideas and little experiments.
          </p>
        </motion.div>

        <motion.article
          ref={ref}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={inView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="glass-strong rounded-2xl border border-lavender/15 p-6 md:p-8"
        >
          <div className="mb-6 h-48 w-full overflow-hidden rounded-xl bg-ink-soft shadow-editorial md:h-56">
            <img
              src={birthdayImage}
              alt={funProject.title}
              className="h-full w-full object-cover object-top"
              loading="lazy"
              decoding="async"
            />
          </div>

          <h3 className="mb-3 font-display text-2xl italic text-parchment md:text-3xl">
            {funProject.title}
          </h3>
          <p className="mb-5 text-sm leading-relaxed text-muted md:text-base">{funProject.description}</p>

          <div className="mb-6 flex flex-wrap gap-2">
            {funProject.focus.map((item) => (
              <span
                key={item}
                className="rounded-full border border-lavender/25 bg-surface/70 px-3 py-1.5 text-xs text-parchment md:text-sm"
              >
                {item}
              </span>
            ))}
          </div>

          <StarBorder
            as="a"
            href={funProject.link}
            target="_blank"
            rel="noopener noreferrer"
            color="#BFA0EC"
            speed="5s"
            className="inline-block"
          >
            Live Demo
          </StarBorder>
        </motion.article>
      </div>
    </section>
  )
}

export default JustForFun
