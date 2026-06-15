import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/smoothScroll'
import { PROJECTS } from '../data/projects'
import SectionEyebrow from './SectionEyebrow'

/* Carousel slot geometry by signed distance from the active card. */
const SLOTS = {
  '-2': { x: '-88%', z: -260, ry: 42, opacity: 0.25, scale: 0.82 },
  '-1': { x: '-52%', z: -90, ry: 32, opacity: 0.6, scale: 0.9 },
  0: { x: '0%', z: 70, ry: 0, opacity: 1, scale: 1 },
  1: { x: '52%', z: -90, ry: -32, opacity: 0.6, scale: 0.9 },
  2: { x: '88%', z: -260, ry: -42, opacity: 0.25, scale: 0.82 },
}

const signedOffset = (i, active, len) => {
  let raw = (i - active + len) % len
  if (raw > len / 2) raw -= len
  return Math.max(-2, Math.min(2, raw))
}

/* Generated SVG "media" per project — stands in for screenshots/video. */
function Art({ type, accent }) {
  const stroke = { stroke: accent, strokeWidth: 1.5, fill: 'none' }
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden="true">
      <rect width="320" height="180" fill="#100F0C" />
      {type === 'bars' &&
        [28, 64, 100, 136, 172, 208, 244, 280].map((x, i) => (
          <rect
            key={x}
            x={x}
            y={150 - (30 + ((i * 37) % 90))}
            width="16"
            height={30 + ((i * 37) % 90)}
            fill={i === 4 ? accent : 'rgba(234,227,209,0.2)'}
          />
        ))}
      {type === 'orbits' && (
        <>
          {[28, 52, 76].map((r) => (
            <circle key={r} cx="160" cy="90" r={r} {...stroke} strokeOpacity="0.4" />
          ))}
          <circle cx="160" cy="90" r="8" fill={accent} />
          <circle cx="212" cy="68" r="5" fill="rgba(234,227,209,0.6)" />
          <circle cx="110" cy="130" r="4" fill={accent} />
        </>
      )}
      {type === 'waves' &&
        [60, 90, 120].map((y, i) => (
          <path
            key={y}
            d={`M0 ${y} Q 40 ${y - 26}, 80 ${y} T 160 ${y} T 240 ${y} T 320 ${y}`}
            {...stroke}
            stroke={i === 1 ? accent : 'rgba(234,227,209,0.3)'}
          />
        ))}
      {type === 'pulse' && (
        <>
          <path
            d="M0 90 H90 L110 50 L135 130 L155 70 L170 100 L185 90 H320"
            {...stroke}
          />
          {[14, 28, 42].map((r) => (
            <circle key={r} cx="160" cy="90" r={r} stroke="rgba(234,227,209,0.25)" fill="none" strokeWidth="1" />
          ))}
        </>
      )}
    </svg>
  )
}

/* Pointer tilt wrapper — rAF-throttled, transform-only (no layout reads in loop). */
function Tilt({ children, disabled }) {
  const el = useRef(null)
  const frame = useRef(0)

  const onMove = (e) => {
    if (disabled || prefersReducedMotion()) return
    const node = el.current
    if (!node) return
    cancelAnimationFrame(frame.current)
    const rect = node.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    frame.current = requestAnimationFrame(() => {
      node.style.transform = `rotateY(${px * 10}deg) rotateX(${py * -8}deg)`
    })
  }
  const onLeave = () => {
    cancelAnimationFrame(frame.current)
    if (el.current) el.current.style.transform = 'rotateY(0deg) rotateX(0deg)'
  }

  return (
    <div onPointerMove={onMove} onPointerLeave={onLeave} className="h-full w-full">
      <div
        ref={el}
        className="h-full w-full transition-transform duration-300 ease-out will-change-transform"
      >
        {children}
      </div>
    </div>
  )
}

function ProjectModal({ project, onClose }) {
  const panel = useRef(null)
  const backdrop = useRef(null)
  const closeBtn = useRef(null)

  useLayoutEffect(() => {
    closeBtn.current?.focus()
    if (prefersReducedMotion()) return
    // gsap.context + revert (not kill): StrictMode double-mounts effects, and a
    // killed `.from()` would leave the panel stuck at its hidden start values.
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .from(backdrop.current, { opacity: 0, duration: 0.35, ease: 'power2.out' })
        .from(
          panel.current,
          { opacity: 0, scale: 0.88, y: 24, duration: 0.5, ease: 'power3.out' },
          0.05,
        )
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes do projeto ${project.title}`}
    >
      {/* Blur-only backdrop — no dark veil */}
      <div
        ref={backdrop}
        className="absolute inset-0 cursor-pointer backdrop-blur-xl"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panel}
        className="relative w-full max-w-2xl border border-line bg-ink-deep/90 p-6 sm:p-10"
        style={{ boxShadow: `0 0 80px -20px ${project.accent}55` }}
      >
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center text-cream-dim transition-colors duration-200 hover:text-cream focus:outline-none focus-visible:ring-1 focus-visible:ring-cream"
          aria-label="Fechar detalhes do projeto"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <span className="label" style={{ color: project.accent }}>
          {project.kind}
        </span>
        <h3 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-cream sm:text-4xl">
          {project.title}
        </h3>

        <div className="mt-6 aspect-video w-full overflow-hidden border border-line">
          <Art type={project.art} accent={project.accent} />
        </div>

        <p className="mt-6 font-body leading-relaxed text-cream-dim">{project.description}</p>

        <div className="mt-5 border-l-2 pl-4" style={{ borderColor: project.accent }}>
          <span className="label">Desafio resolvido</span>
          <p className="mt-1 font-body text-sm leading-relaxed text-cream">{project.challenge}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line px-3 py-1 font-body text-xs text-cream-dim"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function FeaturedWork() {
  const root = useRef(null)
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(null)
  const swipe = useRef(null)
  const len = PROJECTS.length

  const go = (dir) => setActive((a) => (a + dir + len) % len)

  /* Sync the section glow with the active project's accent. */
  useEffect(() => {
    const accent = PROJECTS[active].accent
    if (prefersReducedMotion()) {
      root.current?.style.setProperty('--work-accent', accent)
      return
    }
    const tween = gsap.to(root.current, {
      '--work-accent': accent,
      duration: 0.9,
      ease: 'power2.inOut',
    })
    return () => tween.kill()
  }, [active])

  /* Scroll reveal: cards surface from depth, delayed by their Z position. */
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.work-reveal').forEach((el, i) => {
        const depth = Math.abs(signedOffset(i, 0, len))
        gsap.from(el, {
          opacity: 0,
          z: -200,
          y: 40,
          duration: 1,
          delay: depth * 0.18,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 65%' },
        })
      })
      gsap.from('.work-eyebrow, .work-title', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
    }, root)
    return () => ctx.revert()
  }, [len])

  const onPointerDown = (e) => (swipe.current = e.clientX)
  const onPointerUp = (e) => {
    if (swipe.current === null) return
    const dx = e.clientX - swipe.current
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
    swipe.current = null
  }

  return (
    <section
      ref={root}
      id="trabalhos"
      className="relative w-full overflow-hidden bg-ink px-6 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40"
      style={{ '--work-accent': PROJECTS[0].accent }}
      aria-label="Trabalhos em destaque"
    >
      {/* Accent glow synced to the active project */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25 transition-opacity"
        style={{
          background:
            'radial-gradient(70% 55% at 50% 42%, var(--work-accent), transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Giant index — blends against the moving gradient */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display font-black text-cream opacity-20 mix-blend-difference"
        style={{ fontSize: 'clamp(10rem, 30vw, 24rem)', lineHeight: 1 }}
        aria-hidden="true"
      >
        0{active + 1}
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="work-eyebrow mb-6">
          <SectionEyebrow index="03" title="Trabalhos" />
        </div>
        <h2
          className="work-title mb-12 max-w-3xl font-display font-semibold uppercase leading-[0.98] tracking-tightest text-cream sm:mb-16"
          style={{ fontSize: 'clamp(1.9rem, 4.6vw, 3.8rem)' }}
        >
          Projetos com profundidade — literalmente.
        </h2>

        {/* 3D stage */}
        <div
          className="relative h-[400px] select-none sm:h-[460px]"
          style={{ perspective: '1200px' }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          {PROJECTS.map((project, i) => {
            const offset = signedOffset(i, active, len)
            const slot = SLOTS[offset]
            const isActive = offset === 0
            return (
              <div
                key={project.id}
                className="work-card absolute left-1/2 top-1/2 h-[320px] w-[78vw] max-w-[420px] sm:h-[360px]"
                style={{
                  transform: `translate(-50%, -50%) translateX(${slot.x}) translateZ(${slot.z}px) rotateY(${slot.ry}deg) scale(${slot.scale})`,
                  opacity: slot.opacity,
                  zIndex: 10 - Math.abs(offset),
                  transition:
                    'transform 0.7s cubic-bezier(0.32, 0.72, 0.25, 1), opacity 0.7s ease',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity',
                }}
              >
                <div className="work-reveal h-full w-full">
                  <Tilt disabled={!isActive}>
                    <button
                      type="button"
                      onClick={() => (isActive ? setOpen(project) : setActive(i))}
                      className="group relative block h-full w-full cursor-pointer border-0 bg-ink-deep p-0 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-cream"
                      aria-label={
                        isActive
                          ? `Abrir detalhes de ${project.title}`
                          : `Focar projeto ${project.title}`
                      }
                    >
                      {/* Animated dashed border instead of drop shadows */}
                      <svg
                        className="dash-border pointer-events-none absolute inset-0 h-full w-full"
                        aria-hidden="true"
                      >
                        <rect
                          fill="none"
                          stroke={isActive ? project.accent : 'rgba(234,227,209,0.25)'}
                          strokeWidth="1.5"
                          strokeDasharray="7 11"
                          style={{
                            x: '1px',
                            y: '1px',
                            width: 'calc(100% - 2px)',
                            height: 'calc(100% - 2px)',
                            transition: 'stroke 0.5s ease',
                          }}
                        />
                      </svg>

                      <div className="flex h-full flex-col p-5">
                        <div className="min-h-0 flex-1 overflow-hidden">
                          <Art type={project.art} accent={project.accent} />
                        </div>
                        <div className="flex items-end justify-between pt-4">
                          <div>
                            <span className="label" style={{ color: project.accent }}>
                              {project.kind}
                            </span>
                            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-cream sm:text-2xl">
                              {project.title}
                            </h3>
                          </div>
                          <span className="label hidden text-[0.6rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block">
                            {isActive ? 'Abrir ↗' : 'Focar'}
                          </span>
                        </div>
                      </div>
                    </button>
                  </Tilt>
                </div>
              </div>
            )
          })}
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex h-11 w-11 cursor-pointer items-center justify-center border border-line text-cream-dim transition-colors duration-200 hover:border-cream/40 hover:text-cream focus:outline-none focus-visible:ring-1 focus-visible:ring-cream"
            aria-label="Projeto anterior"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <span className="label tabular-nums">
            0{active + 1} / 0{len}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            className="flex h-11 w-11 cursor-pointer items-center justify-center border border-line text-cream-dim transition-colors duration-200 hover:border-cream/40 hover:text-cream focus:outline-none focus-visible:ring-1 focus-visible:ring-cream"
            aria-label="Próximo projeto"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </section>
  )
}
