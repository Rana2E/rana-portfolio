import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import LogoLoop from './LogoLoop'
import Stars from './Stars'
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss,
  SiJavascript,
  SiFramer,
  SiVite,
  SiGit,
  SiGithub,
  SiVercel,
  SiFlutter,
  SiPython,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiLaravel,
  SiAngular
} from 'react-icons/si'

/**
 * Skills Section
 * Displays skills organized by category
 */
const Skills = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const techLogos = [
    // Core Frontend
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { node: <SiHtml5 />, title: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { node: <SiCss3 />, title: "CSS", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    // UI & Styling
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiBootstrap />, title: "Bootstrap", href: "https://getbootstrap.com" },
    { node: <SiFramer />, title: "Framer Motion", href: "https://www.framer.com/motion/" },
    // Frameworks
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiVite />, title: "Vite", href: "https://vitejs.dev" },
    { node: <SiLaravel />, title: "Laravel", href: "https://laravel.com" },
    { node: <SiAngular />, title: "Angular", href: "https://angular.io" },
    // Tools
    { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
    { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
    { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
    // Mobile
    { node: <SiFlutter />, title: "Flutter", href: "https://flutter.dev" },
    // Supporting
    { node: <SiPython />, title: "Python", href: "https://www.python.org" },
  ]

  const skillCategories = [
    {
      title: 'Core Frontend',
      skills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
    },
    {
      title: 'UI & Styling',
      skills: ['Tailwind CSS', 'Bootstrap', 'Framer Motion', 'Responsive UI Design'],
    },
    {
      title: 'Frameworks',
      skills: ['Next.js', 'Vite', 'Laravel', 'Angular'],
    },
    {
      title: 'Tools',
      skills: ['Git', 'GitHub', 'Vercel', 'API Integration'],
    },
    {
      title: 'Mobile',
      skills: ['Flutter'],
    },
    {
      title: 'Supporting',
      skills: ['Python', 'Odoo ERP (Installation & Custom Modules)'],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 relative overflow-hidden bg-black" aria-label="Skills section">
      <Stars />
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/8 via-purple-900/8 to-pink-900/8 animate-gradient"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-4 text-center gradient-text"
        >
          Skills
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-gray-400 mb-12 text-lg"
        >
          Technologies I work with
        </motion.p>

        {/* Logo Loop Section */}
        <div ref={ref} style={{ height: '200px', position: 'relative', overflow: 'hidden', marginBottom: '3rem' }}>
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={48}
            gap={40}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#1f2937"
            ariaLabel="Technology partners"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-strong rounded-2xl p-6 hover:scale-105 transition-transform duration-300 bg-gray-950/80"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="px-4 py-2 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/40 rounded-full text-sm text-gray-300 backdrop-blur-sm"
                    whileHover={{ scale: 1.1, borderColor: 'rgba(139, 92, 246, 0.6)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

