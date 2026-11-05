import React, { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import MonogramMark from './MonogramMark'

/**
 * Full monogram presentation wrapper (shared letterforms via MonogramMark).
 */
const Monogram = () => {
  const reduceMotion = useReducedMotion()
  const stageRef = useRef(null)
  const frameRef = useRef(0)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (reduceMotion) return undefined

    const stage = stageRef.current
    if (!stage) return undefined

    const tick = () => {
      const cur = currentRef.current
      const tgt = targetRef.current
      cur.x += (tgt.x - cur.x) * 0.06
      cur.y += (tgt.y - cur.y) * 0.06
      stage.style.transform = `translate3d(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px, 0)`
      frameRef.current = window.requestAnimationFrame(tick)
    }

    const onMove = (event) => {
      if (!window.matchMedia('(min-width: 1024px)').matches) {
        targetRef.current = { x: 0, y: 0 }
        return
      }
      const w = window.innerWidth || 1
      const h = window.innerHeight || 1
      targetRef.current = {
        x: ((event.clientX / w) - 0.5) * 12,
        y: ((event.clientY / h) - 0.5) * 8,
      }
    }

    const onLeave = () => {
      targetRef.current = { x: 0, y: 0 }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave, { passive: true })
    frameRef.current = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      window.cancelAnimationFrame(frameRef.current)
    }
  }, [reduceMotion])

  return (
    <motion.div
      className="monogram"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <div className="monogram__tone">
        <div ref={stageRef} className="monogram__stage">
          <div className={reduceMotion ? 'monogram__float' : 'monogram__float monogram__float--live'}>
            <MonogramMark className="monogram__mark" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Monogram
