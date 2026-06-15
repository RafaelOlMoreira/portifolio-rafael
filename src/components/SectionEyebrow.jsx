/** Numbered section label — same pattern introduced in About: (NN) — Title. */
export default function SectionEyebrow({ index, title, className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="label">({index})</span>
      <span className="h-px w-12 bg-line" />
      <span className="label">{title}</span>
    </div>
  )
}
