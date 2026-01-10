import React from 'react'
import StarBorder from './StarBorder'

/**
 * Project Card Component
 * Reusable card component for displaying projects
 */
const ProjectCard = ({ project }) => {
  return (
    <article
      className="group relative transition-transform duration-200 hover:-translate-y-1"
      aria-label={`Project: ${project.title}`}
    >
      {/* Gradient border effect - simplified */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-60 blur transition duration-300"></div>
      
      <div className="relative glass-strong rounded-2xl overflow-hidden h-full flex flex-col bg-gray-950/80">
        {/* Project Image */}
        <div className="w-full h-56 bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-cyan-900/30 relative overflow-hidden">
          {/* Simplified shimmer effect - removed for performance */}
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover z-10"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400 text-sm font-medium z-10">Project Image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-2xl font-bold mb-1 gradient-text">{project.title}</h3>
          <div className="flex items-center gap-2 mb-3">
            {project.role && (
              <p className="text-sm text-cyan-400 font-medium">{project.role}</p>
            )}
            {project.note && (
              <span className="text-xs text-gray-400 italic">• {project.note}</span>
            )}
          </div>
          <p className="text-gray-300 mb-4 leading-relaxed flex-1">{project.description}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/40 rounded-full text-sm text-gray-300 backdrop-blur-sm transition-transform duration-200 hover:scale-105 hover:border-purple-500/60"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-2">
            {project.links?.appStore && (
              <StarBorder
                as="a"
                href={project.links.appStore}
                target="_blank"
                rel="noopener noreferrer"
                color="blue"
                speed="5s"
              >
                App Store
              </StarBorder>
            )}
            {project.links?.android && (
              <StarBorder
                as="a"
                href={project.links.android}
                target="_blank"
                rel="noopener noreferrer"
                color="green"
                speed="5s"
              >
                Android
              </StarBorder>
            )}
            {project.links?.website && (
              <StarBorder
                as="a"
                href={project.links.website}
                target="_blank"
                rel="noopener noreferrer"
                color="blue"
                speed="5s"
              >
                Project Website
              </StarBorder>
            )}
            {project.links?.demo && (
              <StarBorder
                as="a"
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                color="cyan"
                speed="5s"
              >
                Demo Video
              </StarBorder>
            )}
            {project.links?.github && (
              <StarBorder
                as="a"
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                color="white"
                speed="5s"
              >
                GitHub
              </StarBorder>
            )}
            {project.links?.linkedin && (
              <StarBorder
                as="a"
                href={project.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                color="blue"
                speed="5s"
              >
                LinkedIn
              </StarBorder>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProjectCard

