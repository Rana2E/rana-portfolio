import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import LogoLoop from './LogoLoop'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiGit,
  SiGithub,
  SiFlutter,
  SiPython,
  SiBootstrap,
  SiLaravel,
  SiAngular,
  SiDart,
  SiPhp,
  SiMysql,
  SiPostgresql,
  SiDocker,
  SiFigma,
  SiJira,
  SiPostman,
  SiGithubactions,
} from 'react-icons/si'

const primaryExpertise = [
  {
    title: 'Mobile Development',
    skills: ['Flutter', 'Dart', 'Android debugging', 'REST API integration', 'WebSockets'],
  },
  {
    title: 'Full-Stack Web',
    skills: ['Laravel', 'PHP', 'MySQL', 'Authentication', 'Role-based applications', 'Payment integrations'],
  },
  {
    title: 'ERP & Business Systems',
    skills: ['Odoo ERP', 'Odoo Studio', 'QWeb', 'Automated Actions', 'CRM workflows', 'Business requirements analysis'],
  },
]

const additional = [
  'React',
  'Angular',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Python',
  'PostgreSQL',
  'Tailwind CSS',
  'Bootstrap',
]

const tools = [
  'Git',
  'GitHub',
  'GitHub Actions',
  'Docker',
  'Postman',
  'Jira',
  'Figma',
  'CI/CD',
  'Agile collaboration',
]

const Skills = () => {
  const reduceMotion = useReducedMotion()
  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
    rootMargin: '50px',
  })

  const techLogos = [
    { node: <SiFlutter />, title: 'Flutter', href: 'https://flutter.dev' },
    { node: <SiDart />, title: 'Dart', href: 'https://dart.dev' },
    { node: <SiLaravel />, title: 'Laravel', href: 'https://laravel.com' },
    { node: <SiPhp />, title: 'PHP', href: 'https://www.php.net' },
    { node: <SiMysql />, title: 'MySQL', href: 'https://www.mysql.com' },
    { node: <SiReact />, title: 'React', href: 'https://react.dev' },
    { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
    { node: <SiJavascript />, title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
    { node: <SiAngular />, title: 'Angular', href: 'https://angular.io' },
    { node: <SiPython />, title: 'Python', href: 'https://www.python.org' },
    { node: <SiPostgresql />, title: 'PostgreSQL', href: 'https://www.postgresql.org' },
    { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
    { node: <SiBootstrap />, title: 'Bootstrap', href: 'https://getbootstrap.com' },
    { node: <SiGit />, title: 'Git', href: 'https://git-scm.com' },
    { node: <SiGithub />, title: 'GitHub', href: 'https://github.com' },
    { node: <SiGithubactions />, title: 'GitHub Actions', href: 'https://github.com/features/actions' },
    { node: <SiDocker />, title: 'Docker', href: 'https://www.docker.com' },
    { node: <SiPostman />, title: 'Postman', href: 'https://www.postman.com' },
    { node: <SiJira />, title: 'Jira', href: 'https://www.atlassian.com/software/jira' },
    { node: <SiFigma />, title: 'Figma', href: 'https://www.figma.com' },
  ]

  const fade = (delay = 0) =>
    reduceMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.45, delay, ease: 'easeOut' },
        }

  return (
    <section id="skills" className="relative scroll-mt-28 overflow-hidden px-4 py-20 sm:px-6" aria-label="Skills">
      <div ref={ref} className="section-shell">
        <motion.div className="mb-12 text-center" {...fade(0)}>
          <p className="section-kicker">Capabilities</p>
          <h2 className="section-title">Specialized where it counts.</h2>
          <p className="section-lede">
            The technologies behind what I build.
          </p>
        </motion.div>

        <div className="mb-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {primaryExpertise.map((category, index) => (
            <motion.article
              key={category.title}
              className="glass-strong rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
              {...fade(0.08 + index * 0.06)}
              whileHover={reduceMotion ? undefined : { y: -4 }}
            >
              <p className="mb-2 text-[0.65rem] uppercase tracking-[0.22em] text-cyan">Primary expertise</p>
              <h3 className="mb-4 text-xl font-medium text-parchment">{category.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-lavender/25 bg-ink/50 px-3 py-1.5 text-sm text-parchment"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <motion.article className="glass-strong rounded-2xl p-6" {...fade(0.28)}>
            <h3 className="mb-4 text-lg font-medium text-parchment">Additional technologies</h3>
            <ul className="flex flex-wrap gap-2">
              {additional.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-line bg-surface/60 px-3 py-1.5 text-sm text-muted"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article className="glass-strong rounded-2xl p-6" {...fade(0.34)}>
            <h3 className="mb-4 text-lg font-medium text-parchment">Development tools & collaboration</h3>
            <ul className="flex flex-wrap gap-2">
              {tools.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-line bg-surface/60 px-3 py-1.5 text-sm text-muted"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.article>
        </div>

        <div className="relative mt-12 h-24 overflow-hidden" aria-hidden="false">
          <LogoLoop
            logos={techLogos}
            speed={reduceMotion ? 0 : 90}
            direction="left"
            logoHeight={36}
            gap={36}
            hoverSpeed={0}
            scaleOnHover={!reduceMotion}
            fadeOut
            fadeOutColor="#090B12"
            ariaLabel="Technologies and tools"
          />
        </div>
      </div>
    </section>
  )
}

export default Skills
