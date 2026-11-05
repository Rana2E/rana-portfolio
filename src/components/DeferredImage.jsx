import React, { useEffect, useRef, useState } from 'react'

/**
 * Defers assigning img src until near the viewport so multi‑MB project
 * assets do not all decode at once when the Projects section mounts.
 */
const DeferredImage = ({
  src,
  alt,
  className = '',
  rootMargin = '160px 0px',
  eager = false,
  ...rest
}) => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(eager)

  useEffect(() => {
    if (eager || visible) return undefined
    const node = ref.current
    if (!node) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold: 0.01 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [visible, rootMargin, eager])

  return (
    <div ref={ref} className="h-full w-full">
      {visible ? (
        <img
          src={src}
          alt={alt}
          className={className}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'low'}
          {...rest}
        />
      ) : (
        <div className="h-full w-full bg-surface/60" aria-hidden="true" />
      )}
    </div>
  )
}

export default DeferredImage
