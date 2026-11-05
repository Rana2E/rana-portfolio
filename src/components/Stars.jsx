import React, { useMemo } from 'react'
import './Stars.css'

const Stars = ({ variant = 'section' }) => {
  const stars = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => (
      <div key={i} className="star" />
    ))
  }, [])

  return (
    <div
      className={variant === 'fixed' ? 'star-container star-container--fixed' : 'star-container'}
      aria-hidden="true"
    >
      {stars}
    </div>
  )
}

export default Stars
