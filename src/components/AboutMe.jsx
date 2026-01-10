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
                I'm a <span className="text-purple-300 font-semibold">Frontend Developer</span> who enjoys turning designs into complete, real-world experiences that are simple, clear, and easy to use.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="glass-strong rounded-xl p-6 border border-purple-500/20">
                <p className="text-lg text-gray-300 leading-relaxed">
                  I care about <span className="text-purple-300 font-semibold">pleasing the user's eye</span> while focusing on helping them move smoothly through the interface and reach their goal within the website or application. For me, <span className="text-purple-300 font-semibold">good design</span> is one where everything flows naturally and feels effortless.
                </p>
              </div>
              
              <p className="text-lg text-gray-300 leading-relaxed">
               <span className="text-gray-100 font-semibold"></span> I believe that <span className="text-purple-300 font-semibold">simple, clear interfaces</span> create the best results.
              </p>
      
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="px-4 py-2 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/40 rounded-full text-sm text-gray-300 backdrop-blur-sm inline-flex items-center min-h-[2.5rem]">
                  <RotatingText
                    texts={['Detail-Oriented', 'Quality-Focused', 'Continuous Learner']}
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
              
              <p className="text-lg text-gray-300 leading-relaxed pt-2">
                I'm <span className="text-gray-100 font-semibold">detail-oriented</span>, prefer building things properly rather than rushing, and I genuinely enjoy my work. I'm always eager to <span className="text-purple-300 font-semibold">learn, grow, and continuously improve</span> as a developer.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe

