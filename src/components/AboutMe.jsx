import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Stars from './Stars'
import RotatingText from './RotatingText'
import meImage from '../assets/Me.jpeg'

/**
 * About Me Section
 * Two-column layout with image placeholder and text content
 */
const AboutMe = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px',
  })

  return (
    <section id="about" className="py-20 px-4 relative" aria-label="About me section">
      <Stars />
      <div className="max-w-6xl mx-auto relative z-10">
        
        <div ref={ref} className="flex flex-col md:flex-row gap-8 items-start">
          {/* Profile Image - Smaller */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            className="w-full md:w-64 flex-shrink-0 aspect-square rounded-2xl overflow-hidden glass-strong relative group"
            style={{ willChange: 'opacity, transform' }}
          >
            <img 
              src={meImage} 
              alt="Rana Ehab Hamadah"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </motion.div>

          {/* Text content - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
            className="flex-1 space-y-8"
            style={{ willChange: 'opacity, transform' }}
          >
            <div>
              <h3 className="text-4xl font-bold mb-6 text-purple-300">
                About Me
              </h3>
              <p className="text-xl text-gray-100 leading-relaxed mb-6 font-light">
                I'm a <span className="text-purple-300 font-semibold">Software Engineer</span> with a strong passion for building high-quality digital products and solving complex technical challenges.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="glass-strong rounded-xl p-6 border border-purple-500/20">
                <p className="text-lg text-gray-300 leading-relaxed">
                  My experience spans modern <span className="text-purple-300 font-semibold">mobile development</span>, <span className="text-purple-300 font-semibold">web applications</span>, <span className="text-purple-300 font-semibold">ERP systems</span>, and <span className="text-purple-300 font-semibold">full product delivery</span>. Throughout various projects, I have been involved in everything from designing user experiences and developing scalable applications to <span className="text-purple-300 font-semibold">integrating business systems</span> and <span className="text-purple-300 font-semibold">deploying production-ready solutions</span>.
                  I thrive in environments that require <span className="text-purple-300 font-semibold">continuous learning</span>, <span className="text-purple-300 font-semibold">adaptability</span>, and <span className="text-purple-300 font-semibold">ownership</span>. Rather than limiting myself to a single technology or specialization, I focus on understanding problems deeply and delivering <span className="text-purple-300 font-semibold">reliable</span> solutions that create value for both users and organizations.
                </p>
              </div>
              
              <p className="text-lg text-gray-300 leading-relaxed">
              I build softwares that are not only functional, but meaningful, scalable, and impactful.
              </p>
      
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="px-4 py-2 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/40 rounded-full text-sm text-gray-300 backdrop-blur-sm inline-flex items-center min-h-[2.5rem]">
                  <RotatingText
                    texts={['Software Engineer',
                            'Frontend Engineer',
                            'Full-Stack Engineer',
                            'Flutter Developer',
                            'Web Developer',
                            'ERP Developer']}
                    mainClassName="inline-block"
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                  />
                </span>
              </div>
        
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe

