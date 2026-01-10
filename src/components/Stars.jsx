import React, { useMemo } from 'react'
import './Stars.css'

const Stars = () => {
  // Reduce stars from 50 to 30 for better performance
  const stars = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => (
      <div key={i} className="star"></div>
    ))
  }, [])

  return (
    <div className="star-container">
      {stars}
    </div>
  )
}

export default Stars

