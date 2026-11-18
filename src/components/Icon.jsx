// Thin svg wrapper so sections share one icon style (CSS targets .icon svg).
export default function Icon({ d, children, viewBox = '0 0 24 24' }) {
  return (
    <svg viewBox={viewBox} aria-hidden="true">
      {d ? <path d={d} /> : children}
    </svg>
  )
}
