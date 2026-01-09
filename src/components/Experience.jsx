import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Stars from './Stars'

/**
 * Experience Section
 * Displays work experience
 */
const Experience = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const experiences = [
    {
      title: 'ERP Trainee',
      company: 'iLines Solutions',
      location: 'Riyadh',
      description: [
        'Gained deep understanding of ERP systems architecture and business process automation',
        'Installed and configured Odoo ERP systems for multiple clients',
        'Developed custom Odoo applications and modules using Python, XML, and Odoo framework',
        'Customized existing modules to meet specific business requirements',
      ],
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 relative overflow-hidden bg-black" aria-label="Experience section">
      <Stars />
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-cyan-900/5 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-4 text-center gradient-text"
        >
          Experience
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-gray-400 mb-12 text-lg"
        >
          Professional journey and growth
        </motion.p>
        
        <div ref={ref} className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-strong rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-2 text-white">{exp.title}</h3>
              <p className="text-purple-300 mb-6 text-lg">
                {exp.company} · {exp.location}
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-300 text-lg">
                {exp.description.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

