import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/smoothScroll'
import { useParticleField } from '../lib/canvasFx'
import SectionEyebrow from './SectionEyebrow'

/*
 * Irregular hexagon pairs (same vertex count so clip-path can transition).
 * `shape` = resting state, `hover` = morph target.
 */
const POLYGONS = [
  {
    shape: 'polygon(8% 0%, 92% 4%, 100% 38%, 94% 96%, 10% 100%, 0% 55%)',
    hover: 'polygon(2% 6%, 98% 0%, 94% 44%, 100% 92%, 4% 96%, 6% 50%)',
  },
  {
    shape: 'polygon(0% 12%, 88% 0%, 100% 30%, 100% 88%, 14% 100%, 2% 64%)',
    hover: 'polygon(6% 4%, 94% 6%, 96% 38%, 92% 96%, 6% 94%, 0% 52%)',
  },
  {
    shape: 'polygon(12% 4%, 100% 0%, 96% 52%, 100% 94%, 8% 100%, 0% 42%)',
    hover: 'polygon(4% 0%, 92% 8%, 100% 46%, 94% 100%, 2% 92%, 8% 48%)',
  },
]

const TECHS = [
  {
    name: 'JavaScript',
    tagline: 'A linguagem que move tudo aqui',
    featured: true,
    icon: (
      <>
        <path d="M8 4c-2 0-2.5 1.2-2.5 3v2.4c0 1.4-.6 2.4-2.2 2.6 1.6.2 2.2 1.2 2.2 2.6V17c0 1.8.5 3 2.5 3" />
        <path d="M16 4c2 0 2.5 1.2 2.5 3v2.4c0 1.4.6 2.4 2.2 2.6-1.6.2-2.2 1.2-2.2 2.6V17c0 1.8-.5 3-2.5 3" />
      </>
    ),
  },
  {
    name: 'React',
    tagline: 'Estados que dançam',
    icon: (
      <>
        <circle cx="12" cy="12" r="1.6" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </>
    ),
  },
  {
    name: 'TypeScript',
    tagline: 'Tipos que dormem tranquilos',
    icon: (
      <>
        <path d="M9 7 4 12l5 5" />
        <path d="m15 7 5 5-5 5" />
      </>
    ),
  },
  {
    name: 'GSAP',
    tagline: 'Timelines com batimento',
    icon: (
      <>
        <path d="M2 12h4l2.5-6 3.5 12 3-8 1.5 2H22" />
      </>
    ),
  },
  {
    name: 'Tailwind',
    tagline: 'Design na velocidade do pensamento',
    icon: (
      <>
        <path d="M3 10c1.5-3.5 4-4.5 6.5-3.4 1.4.6 2 1.8 3.1 2.5 1.7 1 3.5.7 4.9-1.1" />
        <path d="M6 16c1.5-3.5 4-4.5 6.5-3.4 1.4.6 2 1.8 3.1 2.5 1.7 1 3.5.7 4.9-1.1" />
      </>
    ),
  },
  {
    name: 'Vite',
    tagline: 'Builds antes do café esfriar',
    icon: (
      <>
        <path d="m13 2-9 13h6l-1 7 9-13h-6l1-7z" />
      </>
    ),
  },
  {
    name: 'Node.js',
    tagline: 'JavaScript além do navegador',
    icon: (
      <>
        <path d="M12 2 3.5 7v10L12 22l8.5-5V7L12 2z" />
        <path d="M12 22V12" />
        <path d="M12 12 3.5 7" />
        <path d="m12 12 8.5-5" />
      </>
    ),
  },
]

// Entrance vectors: each card flies in from a different angle (not just fade-up).
const ENTRY = [
  { x: -90, y: 40, rotation: -8 },
  { x: 60, y: -70, rotation: 6 },
  { x: 100, y: 30, rotation: 9 },
  { x: -50, y: -80, rotation: -5 },
  { x: 0, y: 100, rotation: 4 },
  { x: 90, y: -40, rotation: -7 },
  { x: -100, y: -20, rotation: 7 },
]

function PolyCard({ tech, index }) {
  const poly = POLYGONS[index % POLYGONS.length]
  return (
    <button
      type="button"
      className={`poly-card stack-card group block w-full border-0 bg-transparent p-0 text-left will-reveal focus:outline-none ${
        tech.featured ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''
      }`}
      style={{ '--shape': poly.shape, '--shape-hover': poly.hover }}
      aria-label={`${tech.name} — ${tech.tagline}`}
    >
      <div className="poly-frame group-hover:scale-[1.05] group-focus-visible:scale-[1.05]">
        <div
          className={`poly-inner flex flex-col items-center justify-center gap-3 bg-ink px-6 text-center ${
            tech.featured ? 'min-h-[280px] py-14 lg:min-h-[420px]' : 'min-h-[200px] py-10'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`stack-icon text-cream-dim transition-colors duration-300 group-hover:text-cream ${
              tech.featured ? 'h-14 w-14' : 'h-9 w-9'
            }`}
            aria-hidden="true"
          >
            {tech.icon}
          </svg>
          <span
            className={`font-display font-bold uppercase tracking-tight text-cream ${
              tech.featured ? 'text-3xl lg:text-4xl' : 'text-xl'
            }`}
          >
            {tech.name}
          </span>
          <span className="font-body text-xs text-taupe sm:text-sm">{tech.tagline}</span>
        </div>
      </div>
    </button>
  )
}

export default function CreativeStack() {
  const root = useRef(null)
  const canvas = useRef(null)
  useParticleField(canvas)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.from('.stack-eyebrow', {
        opacity: 0,
        x: -20,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })

      gsap.utils.toArray('.stack-card').forEach((card, i) => {
        const v = ENTRY[i % ENTRY.length]
        gsap.from(card, {
          opacity: 0,
          x: v.x,
          y: v.y,
          rotation: v.rotation,
          duration: 1.1,
          delay: (i % 3) * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id="stack"
      className="relative w-full overflow-hidden bg-ink px-6 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40"
      aria-label="Creative Stack"
    >
      {/* Particle field (subtle, mouse-reactive) */}
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl">
        <div className="stack-eyebrow mb-6">
          <SectionEyebrow index="02" title="Creative Stack" />
        </div>

        <h2
          className="mb-14 max-w-3xl font-display font-semibold uppercase leading-[0.98] tracking-tightest text-cream sm:mb-20"
          style={{ fontSize: 'clamp(1.9rem, 4.6vw, 3.8rem)' }}
        >
          Ferramentas afiadas, usadas com intenção.
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {TECHS.map((tech, i) => (
            <PolyCard key={tech.name} tech={tech} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
