import React from 'react'
import ProjectCard from './ProjectCard'
import rewaqImage from '../assets/rewaq.svg'
import unitokImage from '../assets/unitok.svg'
import borikatImage from '../assets/Borikat.svg'
import esnadImage from '../assets/Esnad.svg'

/**
 * Projects Section
 * Bento-style 2x2 grid with varied card sizes
 */
const Projects = () => {
  const projects = [
    {
      title: 'UniTok',
      role: 'Co-Founder & Frontend Engineer',
      description: 'A social media startup designed to foster student engagement. Working across both technical and business aspects, implementing agile feedback loops and engagement strategies to differentiate UniTok from mainstream platforms.',
      techStack: ['Flutter', 'Django', 'Docker', 'MVVM', 'iOS', 'Android', 'Social Media', 'Startup', 'Agile'],
      image: unitokImage,
      imageHeight: 'h-56 sm:h-64 md:h-72 lg:h-80',
      layout: 'md:col-span-2 lg:col-span-8',
      links: {
        appStore: 'https://apps.apple.com/sa/app/unitok-app/id6745688652',
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
      imageHeight: 'h-44 sm:h-48',
      layout: 'md:col-span-2 lg:col-span-4',
      links: {
        github: 'https://github.com/Rana2E/Borikat',
        demo: 'https://drive.google.com/file/d/1fcku6r60jcb7blUXfU9awgIc4BdBLAHI/view?usp=sharing',
      },
    },
    {
      title: 'Esnad',
      role: 'Freelance Full-Stack Developer',
      description: 'Academic services platform for postgraduate students — service requests, document management, secure payments, and multi-role dashboards for students, specialists, and administrators.',
      techStack: ['Laravel', 'PHP', 'MySQL', 'Moyasar API', 'Tamara API', 'RBAC', 'Admin Dashboard', 'Production Deployment'],
      image: esnadImage,
      imageHeight: 'h-56 sm:h-64 md:h-72 lg:h-80',
      imagePosition: 'object-[center_10%] sm:object-[center_18%]',
      layout: 'md:col-span-2 lg:col-span-7',
      links: {
        website: 'https://esnadhub.com/',
        websiteLabel: 'Live Site',
      },
    },
    {
      title: 'Rewaq X',
      role: 'Frontend Web & Application',
      description: 'Humanizing the Workplace – University graduation project featuring a mobile and web-based system to enhance employee engagement through private community feed, AI-driven stress notifications, and rewards system with admin dashboard.',
      techStack: ['Mobile', 'Web', 'Flutter', 'Laravel', 'Ollama', 'HealthKit', 'Apple Watch', 'Dashboard', 'Employee Engagement'],
      image: rewaqImage,
      imageHeight: 'h-44 sm:h-52 md:h-56 lg:h-60',
      layout: 'lg:col-span-5',
      links: {
        demo: 'https://drive.google.com/file/d/1_w0jkJsi3KPXoKdIbLsJ_8tSnfNewW1F/view?usp=sharing',
        github: 'https://github.com/trsjmx/Rewaq-x',
      },
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden bg-black" aria-label="Projects section">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-cyan-900/5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center gradient-text">
          Projects
        </h2>
        <p className="text-center text-gray-400 mb-12 text-base sm:text-lg">
          Showcasing innovation and creativity
        </p>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {projects.map((project, index) => (
              <div key={index} className={project.layout}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
