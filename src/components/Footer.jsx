import React from 'react'
import { HiMail, HiPhone } from 'react-icons/hi'
import { SiGithub, SiLinkedin } from 'react-icons/si'
import Stars from './Stars'

/**
 * Footer Section
 * Simple footer with links and copyright
 */
const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="footer" className="py-12 px-4 bg-black border-t border-gray-900 relative">
      <Stars />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Contact Information */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-gray-200 mb-2">Contact me</h3>
            <a
              href="mailto:RanaEhabHamadah@gmail.com"
              className="text-gray-400 hover:text-purple-300 transition-colors flex items-center gap-3 group"
            >
              <HiMail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>RanaEhabHamadah@gmail.com</span>
            </a>
            <a
              href="tel:+966542709910"
              className="text-gray-400 hover:text-purple-300 transition-colors flex items-center gap-3 group"
            >
              <HiPhone className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>0542709910</span>
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-gray-200 mb-2">Links</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://github.com/Rana2E"
              target="_blank"
              rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
            >
                <SiGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/rana-ehab-b51204311/"
              target="_blank"
              rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-300 transition-colors flex items-center gap-2 group"
            >
                <SiLinkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
            </a>
            </div>
          </div>

          {/* Location and Copyright */}
          <div className="text-right md:text-left">
            <p className="text-gray-400 text-sm mb-1">
              Location: Jeddah, Saudi Arabia
            </p>
            <p className="text-gray-500 text-sm">
              © {currentYear} Rana Ehab Hamadah. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


