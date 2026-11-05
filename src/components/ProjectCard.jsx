import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import StarBorder from './StarBorder'
import DeferredImage from './DeferredImage'

const ProjectCard = ({ project, className = '', priority = false }) => {
  const imageHeight = project.imageHeight || 'h-56'
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <article
      className={`project-card-shell group relative h-full transition-transform duration-200 hover:-translate-y-1 ${className}`}
      aria-label={`Project: ${project.title}`}
    >
      {/* Opacity-only glow — avoid animating filter:blur during scroll/hover paint */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-lavender/50 via-cyan/40 to-lavender/50 opacity-0 transition-opacity duration-300 group-hover:opacity-70" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-lavender/15 bg-ink-soft/95">
        <div
          className={`relative w-full overflow-hidden bg-gradient-to-br from-surface via-ink to-surface ${imageHeight}`}
        >
          {project.image ? (
            <DeferredImage
              src={project.image}
              alt={`${project.title} preview`}
              className={`z-10 h-full w-full object-cover ${project.imagePosition || ''}`}
              eager={priority}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="z-10 text-sm font-medium text-muted">Project Image</span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-6">
          <h3 className="mb-1 text-xl font-medium text-parchment sm:text-2xl">{project.title}</h3>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {project.role && (
              <p className="text-sm font-medium text-cyan">{project.role}</p>
            )}
            {project.note && (
              <span className="text-xs italic text-muted">• {project.note}</span>
            )}
          </div>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-muted sm:text-base">
            {project.description}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-lavender/25 bg-surface/80 px-2.5 py-1 text-xs text-parchment transition-transform duration-200 hover:scale-105 hover:border-cyan/40 sm:px-3 sm:text-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.links?.appStore && (
              <StarBorder
                as="a"
                href={project.links.appStore}
                target="_blank"
                rel="noopener noreferrer"
                color="#67CCD8"
                speed="5s"
              >
                App Store
              </StarBorder>
            )}
            {project.links?.website && (
              <StarBorder
                as="a"
                href={project.links.website}
                target="_blank"
                rel="noopener noreferrer"
                color="#BFA0EC"
                speed="5s"
              >
                {project.links.websiteLabel || 'Project Website'}
              </StarBorder>
            )}
            {project.links?.demo && (
              <StarBorder
                as="a"
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                color="#67CCD8"
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
                color="#F0EFF4"
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
                color="#67CCD8"
                speed="5s"
              >
                LinkedIn
              </StarBorder>
            )}
          </div>

          {project.caseStudy && (
            <div className="mt-5 border-t border-line pt-4">
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="text-sm font-medium text-lavender transition-colors hover:text-cyan"
                aria-expanded={open}
              >
                {open ? 'Close case study' : 'Read case study'}
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={reduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 pt-4 text-sm leading-relaxed text-muted">
                      <div>
                        <h4 className="mb-1 text-xs uppercase tracking-[0.18em] text-cyan">Overview</h4>
                        <p>{project.caseStudy.overview}</p>
                      </div>
                      <div>
                        <h4 className="mb-1 text-xs uppercase tracking-[0.18em] text-cyan">Objective</h4>
                        <p>{project.caseStudy.objective}</p>
                      </div>
                      <div>
                        <h4 className="mb-1 text-xs uppercase tracking-[0.18em] text-cyan">Role</h4>
                        <p>{project.caseStudy.role}</p>
                      </div>
                      <div>
                        <h4 className="mb-1 text-xs uppercase tracking-[0.18em] text-cyan">
                          Technical implementation
                        </h4>
                        <ul className="list-disc space-y-1 pl-5">
                          {project.caseStudy.implementation.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-1 text-xs uppercase tracking-[0.18em] text-cyan">Outcome</h4>
                        <p>{project.caseStudy.outcome}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
