import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ProjectCard from './ProjectCard'
import rewaqImage from '../assets/rewaq.webp'
import unitokImage from '../assets/unitok.webp'
import borikatImage from '../assets/borikat.webp'
import esnadImage from '../assets/esnad.webp'

const Projects = () => {
  const reduceMotion = useReducedMotion()
  const { ref, inView } = useInView({
    threshold: 0.08,
    triggerOnce: true,
    rootMargin: '50px',
  })

  const projects = [
    {
      title: 'UniTok — University Social Media Platform',
      role: 'Co-Founder & Flutter Engineer',
      description:
        'Contributed to the development of a published university social media platform, working on Flutter features, real-time communication, API integrations, authentication, profiles, feed interactions, and Android-specific debugging.',
      techStack: ['Flutter', 'Dart', 'REST APIs', 'WebSockets'],
      image: unitokImage,
      imageHeight: 'h-56 sm:h-64 md:h-72 lg:h-80',
      layout: 'md:col-span-2 lg:col-span-8',
      links: {
        appStore: 'https://apps.apple.com/sa/app/unitok-app/id6745688652',
        website: 'https://home.unitokapp.com/',
        linkedin: 'https://www.linkedin.com/in/unitok/',
      },
      caseStudy: {
        overview:
          'UniTok is a university social media platform built for student engagement, with a published iOS presence on the App Store.',
        objective:
          'Ship a mobile product that feels native to university life — with profiles, feed interaction, and real-time communication — while staying reliable on Android and respectful of Arabic and RTL interfaces.',
        role:
          'As co-founder and Flutter engineer, I contributed to product development, Flutter functionality, API integration, real-time messaging, debugging, and Git-based collaboration through pull requests and code reviews.',
        implementation: [
          'Authentication and API integration',
          'Real-time chat functionality',
          'User profiles and post interactions',
          'Android-specific scrolling and rendering fixes',
          'Arabic text and RTL interface improvements',
        ],
        outcome:
          'The application is published on the App Store, with continued product work through 2026.',
      },
    },
    {
      title: 'Rwaq X — Graduation Project',
      role: 'Collaborative Graduation Project',
      description:
        'A collaborative mobile and web project focused on employee well-being, workplace interaction, and engagement.',
      techStack: ['Flutter', 'Dart', 'PHP', 'Blade'],
      image: rewaqImage,
      imageHeight: 'h-44 sm:h-52 md:h-56 lg:h-64',
      layout: 'lg:col-span-4',
      links: {
        demo: 'https://drive.google.com/file/d/1_w0jkJsi3KPXoKdIbLsJ_8tSnfNewW1F/view?usp=sharing',
        github: 'https://github.com/trsjmx/Rewaq-x',
      },
      caseStudy: {
        overview:
          'Rwaq X is a university graduation project combining a Flutter mobile experience with a PHP/Blade web surface for workplace well-being and engagement.',
        objective:
          'Give employees a more human workplace experience through interaction, community, and engagement tools across mobile and web.',
        role:
          'I contributed to the mobile and web frontend as part of a collaborative team, working in Flutter and Dart alongside PHP and Blade.',
        implementation: [
          'Flutter mobile interface for day-to-day workplace interaction',
          'Web views built with PHP and Blade',
          'Shared product direction around well-being and engagement',
        ],
        outcome:
          'Completed as a graduation project, with a public repository and a recorded demo.',
      },
    },
    {
      title: 'Postgraduate Research Services Platform',
      role: 'Freelance Full-Stack Developer',
      description:
        'Designed and developed a Laravel-based platform for postgraduate academic services, including four role-based user interfaces, secure authentication, document management, notifications, and production payment integration.',
      techStack: ['Laravel', 'PHP', 'MySQL', 'Role-based access control', 'Payment APIs'],
      image: esnadImage,
      imageHeight: 'h-56 sm:h-64 md:h-72 lg:h-80',
      imagePosition: 'object-[center_10%] sm:object-[center_18%]',
      layout: 'md:col-span-2 lg:col-span-7',
      links: {
        website: 'https://esnadhub.com/',
        websiteLabel: 'Live Site',
      },
      caseStudy: {
        overview:
          'A production Laravel platform supporting postgraduate academic services for multiple user types.',
        objective:
          'Give students and staff a reliable way to request services, manage documents, and complete payments through role-appropriate interfaces.',
        role:
          'I designed and developed the platform end to end as a freelance full-stack engineer.',
        implementation: [
          'Four role-based user interfaces',
          'Secure authentication and access control',
          'Document management and notifications',
          'Production payment integration on MySQL-backed Laravel',
        ],
        outcome:
          'The platform is live in production with public access to the service site.',
      },
    },
    {
      title: 'Borikat — Madinah Tourism Guide',
      role: 'Collaborative Web Project',
      description:
        'A collaborative web platform highlighting landmarks and cultural destinations in Al-Madinah.',
      techStack: ['PHP', 'HTML', 'CSS'],
      image: borikatImage,
      imageHeight: 'h-44 sm:h-48',
      layout: 'lg:col-span-5',
      links: {
        github: 'https://github.com/Rana2E/Borikat',
        demo: 'https://drive.google.com/file/d/1fcku6r60jcb7blUXfU9awgIc4BdBLAHI/view?usp=sharing',
      },
    },
  ]

  return (
    <section id="projects" className="relative scroll-mt-28 overflow-hidden px-4 py-20 sm:px-6" aria-label="Projects">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={inView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-12 text-center"
        >
          <p className="section-kicker">Selected Work</p>
          <h2 className="section-title">Projects with a point of view.</h2>
          <p className="section-lede">
            Featured work first — published mobile software, a production platform, and collaborative
            academic builds.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className={project.layout}
              style={{ contentVisibility: 'auto', containIntrinsicSize: '560px' }}
            >
              {/* No eager decode — even the first card waits until near viewport */}
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
