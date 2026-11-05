import React from 'react'

/**
 * Exact LinkedIn / portfolio RE lockup — ivory R + lavender E.
 * No frame, circle, or construction lines. Scale via CSS on the SVG.
 */
const MonogramMark = ({ className = '', title = 'RE monogram' }) => (
  <svg
    className={className}
    viewBox="95 85 230 230"
    role="img"
    aria-label={title}
    focusable="false"
  >
    <text
      x="118"
      y="276"
      fill="#F0EFF4"
      fontFamily="Instrument Serif, Georgia, serif"
      fontSize="188"
      fontStyle="italic"
      letterSpacing="-14"
    >
      R
    </text>
    <text
      x="176"
      y="286"
      fill="#BFA0EC"
      fillOpacity="0.94"
      fontFamily="Instrument Serif, Georgia, serif"
      fontSize="188"
      fontStyle="italic"
      letterSpacing="-14"
    >
      E
    </text>
  </svg>
)

export default MonogramMark
