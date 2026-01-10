import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Stars from './Stars'
import StarBorder from './StarBorder'
import birthdayImage from '../assets/Birthday.png'

/**
 * Just for Fun Section
 * Section for playful/experimental projects with simple card layout
 */
const JustForFun = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px',
  })
  const funProject = {
    title: 'Interactive Birthday Website 🎂',
    description: 'A heartfelt interactive web experience created as a personal birthday gift for my brother who was studying abroad. Built with vanilla JavaScript and CSS, the experience begins with a click-to-play birthday song, followed by an interactive candle-blowing feature using microphone input. Users can blow into their microphone to extinguish the candles, then scroll to reveal a personalized birthday message. This project explores animation, sound integration, and user-triggered interactions to create an emotional connection across distances.',
    focus: ['JavaScript', 'CSS', 'Animation', 'Interaction design'],
    link: 'https://drive.google.com/file/d/1r4kOBKsYTwK5rtcXafuuOZA43o2b2DHC/view?usp=sharing',
  }

  return (
    <section id="just-for-fun" className="py-20 px-4 relative">
      <Stars />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-4xl font-bold mb-4 text-center gradient-text"
          style={{ willChange: 'opacity, transform' }}
        >
          Fun Experiments
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
          className="text-center text-gray-400 mb-12"
        >
          Playful projects and experiments
        </motion.p>
        
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
          className="glass-strong rounded-2xl p-6 md:p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
          style={{ willChange: 'opacity, transform' }}
        >
          <div className="flex flex-col">
            {/* Project Image */}
            <div className="w-full rounded-xl overflow-hidden h-48 md:h-64 bg-gray-900/50 flex-shrink-0 shadow-lg mb-6">
              <img 
                src={birthdayImage} 
                alt={funProject.title}
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </div>
            
            {/* Content */}
            <div className="flex flex-col">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{funProject.title}</h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed text-base md:text-lg">{funProject.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {funProject.focus.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/40 rounded-full text-xs md:text-sm text-gray-300 backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
              
              <div>
                <StarBorder
                  as="a"
                  href={funProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="purple"
                  speed="5s"
                  className="inline-block"
                >
                  Live Demo
                </StarBorder>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default JustForFun

