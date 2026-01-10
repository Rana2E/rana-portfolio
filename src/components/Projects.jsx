import React from 'react'
import ProjectCard from './ProjectCard'
import rewaqImage from '../assets/rewaq.svg'
import unitokImage from '../assets/unitok.svg'
import borikatImage from '../assets/Borikat.svg'

/**
 * Projects Section
 * Responsive grid layout displaying project cards
 */
const Projects = () => {
  const projects = [
    {
      title: 'Rewaq X',
      role: 'Frontend Web & Application',
      description: 'Humanizing the Workplace – University graduation project featuring a mobile and web-based system to enhance employee engagement through private community feed, AI-driven stress notifications, and rewards system with admin dashboard.',
      techStack: ['Mobile', 'Web', 'Flutter', 'Laravel', 'Ollama', 'HealthKit', 'Apple Watch', 'Dashboard', 'Employee Engagement'],
      image: rewaqImage,
      links: {
        demo: 'https://drive.google.com/file/d/1_w0jkJsi3KPXoKdIbLsJ_8tSnfNewW1F/view?usp=sharing',
        github: 'https://github.com/trsjmx/Rewaq-x',
      },
    },
    {
      title: 'UniTok',
      role: 'Frontend Web & Application',
      description: 'A social media startup designed to foster student engagement. Working across both technical and business aspects, implementing agile feedback loops and engagement strategies to differentiate UniTok from mainstream platforms.',
      techStack: ['Flutter', 'Django', 'Docker', 'MVVM', 'iOS', 'Android', 'Social Media', 'Startup', 'Agile'],
      image: unitokImage,
      links: {
        demo: 'https://drive.google.com/file/d/1tXRsbKC45lB6yqOfkfw05vHE-dY2LQ4-/view?usp=sharing',
        website: 'https://home.unitokapp.com/',
        linkedin: 'https://www.linkedin.com/in/unitok/',
      },
    },
    {
      title: 'Borikat – Madinah Tourism Guide',
      role: 'Frontend',
      description: 'An all-in-one tourism guide for Madina that helps visitors and residents discover landmarks, activities, and entertainment. Makes trip planning easier and highlights the city\'s rich culture and heritage.',
      techStack: ['PHP', 'HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'Laravel'],
      image: borikatImage,
      links: {
        github: 'https://github.com/Rana2E/Borikat',
        demo: 'https://drive.google.com/file/d/1fcku6r60jcb7blUXfU9awgIc4BdBLAHI/view?usp=sharing',
      },
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden bg-black" aria-label="Projects section">
      {/* Simplified background - no stars for better performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-cyan-900/5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-5xl font-bold mb-4 text-center gradient-text">
          Projects
        </h2>
        <p className="text-center text-gray-400 mb-12 text-lg">
          Showcasing innovation and creativity
        </p>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => {
              return (
                <div key={index}>
                  <ProjectCard project={project} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects

