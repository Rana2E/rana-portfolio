import React from 'react'
import './Stars.css'

const Stars = () => {
  return (
    <div className="star-container">
      {Array.from({ length: 50 }, (_, i) => (
        <div key={i} className="star"></div>
      ))}
    </div>
  )
}

export default Stars

