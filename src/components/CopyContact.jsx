import React from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { HiCheck } from 'react-icons/hi'
import useClipboard from '../hooks/useClipboard'

export const CopyFeedback = ({ copied, error, copiedMessage }) => {
  const reduceMotion = useReducedMotion()
  const feedback = copied
    ? copiedMessage
    : error
      ? 'Couldn’t copy. Please try again.'
      : null

  return (
    <AnimatePresence>
      {feedback && (
        <motion.span
          role="status"
          aria-live="polite"
          initial={reduceMotion ? false : { opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-lavender/25 bg-ink/95 px-2.5 py-1 text-[0.7rem] tracking-wide text-parchment shadow-editorial"
        >
          {copied && <HiCheck className="h-3.5 w-3.5 text-lavender" aria-hidden="true" />}
          {feedback}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

const CopyContact = ({
  value,
  label,
  copiedMessage,
  ariaLabel,
  className = '',
  icon,
}) => {
  const { copy, copied, error } = useClipboard()

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={() => copy(value)}
        className={className}
        aria-label={ariaLabel}
      >
        {icon}
        {label}
      </button>
      <CopyFeedback copied={copied} error={error} copiedMessage={copiedMessage} />
    </span>
  )
}

export default CopyContact
