import React from 'react'
import { HiMail, HiDocumentText, HiPhone } from 'react-icons/hi'
import { SiGithub, SiLinkedin } from 'react-icons/si'
import StarBorder from './StarBorder'
import CopyContact, { CopyFeedback } from './CopyContact'
import useClipboard from '../hooks/useClipboard'
import { SITE } from '../data/site'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const emailClip = useClipboard()

  return (
    <>
      <section id="contact" className="relative scroll-mt-28 px-4 py-20 sm:px-6" aria-label="Contact">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="section-kicker">Contact</p>
          <h2 className="section-title">Let’s work together.</h2>
          <p className="section-lede">
            I&apos;m available for software engineering roles and selected freelance work across
            mobile, full-stack web, and business systems.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <span className="relative inline-flex">
              <StarBorder
                as="button"
                type="button"
                color="#BFA0EC"
                speed="5s"
                onClick={() => emailClip.copy(SITE.email)}
                aria-label="Copy email address"
              >
                Copy Email
              </StarBorder>
              <CopyFeedback
                copied={emailClip.copied}
                error={emailClip.error}
                copiedMessage="Email copied to clipboard"
              />
            </span>
            <a
              href={SITE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-line px-6 py-3.5 text-[15px] text-parchment transition-colors hover:border-lavender/50 hover:text-lavender"
            >
              <HiDocumentText className="h-5 w-5" />
              Download Résumé
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-8 text-sm text-muted">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-parchment"
            >
              <SiGithub className="h-5 w-5" />
              GitHub
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-parchment"
            >
              <SiLinkedin className="h-5 w-5" />
              LinkedIn
            </a>
            <CopyContact
              value={SITE.email}
              label={SITE.email}
              copiedMessage="Email copied to clipboard"
              ariaLabel="Copy email address"
              className="inline-flex items-center gap-2 transition-colors hover:text-parchment"
              icon={<HiMail className="h-5 w-5" />}
            />
            <CopyContact
              value={SITE.phone}
              label={SITE.phoneLabel}
              copiedMessage="Phone number copied"
              ariaLabel="Copy phone number"
              className="inline-flex items-center gap-2 transition-colors hover:text-parchment"
              icon={<HiPhone className="h-5 w-5" />}
            />
          </div>
        </div>
      </section>

      <footer className="relative border-t border-line px-4 py-8">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-muted sm:flex-row">
          <p>© {currentYear} {SITE.name}</p>
          <p>{SITE.location}</p>
        </div>
      </footer>
    </>
  )
}

export default Footer
