import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/smoothScroll'

const NAME = 'RAFAEL MOREIRA'

const PHRASES = [
  'Disponível para cometer loucuras front-end.',
  'Turnos: dia, noite e inspiração.',
  'Transformo café em interfaces vivas.',
  'Pixel-perfect até no detalhe que ninguém vê.',
]

const CREDITS = [
  { name: 'React 18', role: 'componentes' },
  { name: 'Vite 5', role: 'build' },
  { name: 'Tailwind CSS 3', role: 'estilo' },
  { name: 'GSAP 3 + ScrollTrigger', role: 'motion' },
  { name: 'Lenis', role: 'scroll suave' },
]

export default function FooterKinetic() {
  const root = useRef(null)
  const nameRef = useRef(null)
  const [phrase, setPhrase] = useState(0)
  const [credits, setCredits] = useState(false)
  const scattered = useRef(false)

  /* Elastic rise on scroll reveal. */
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from(nameRef.current, {
        yPercent: 70,
        opacity: 0,
        duration: 1.6,
        ease: 'elastic.out(1, 0.55)',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      })
      gsap.from('.footer-sub', {
        opacity: 0,
        y: 18,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  /* Rotating phrase every 5s — crossfade via key remount. */
  useEffect(() => {
    const interval = setInterval(() => setPhrase((p) => (p + 1) % PHRASES.length), 5000)
    return () => clearInterval(interval)
  }, [])

  /* Hover: letters scatter, then snap back with an elastic regroup. Gated to
     true hover/fine-pointer devices so a tap on mobile never leaves the letters
     scattered (and clipped) with no way to "un-hover". */
  const canHover = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const scatter = () => {
    if (prefersReducedMotion() || !canHover() || scattered.current) return
    scattered.current = true
    gsap.to('.kinetic-letter', {
      x: () => gsap.utils.random(-22, 22),
      y: () => gsap.utils.random(-22, 22),
      rotation: () => gsap.utils.random(-18, 18),
      duration: 0.45,
      ease: 'power3.out',
      stagger: { each: 0.012, from: 'random' },
    })
  }
  const regroup = () => {
    if (prefersReducedMotion() || !canHover()) return
    scattered.current = false
    gsap.to('.kinetic-letter', {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.45)',
      stagger: { each: 0.01, from: 'random' },
    })
  }

  /* Close credits on Escape / outside click. */
  useEffect(() => {
    if (!credits) return
    const onKey = (e) => e.key === 'Escape' && setCredits(false)
    const onClick = (e) => {
      if (!e.target.closest('.credits-pop') && !e.target.closest('.credits-btn')) setCredits(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onClick)
    }
  }, [credits])

  return (
    <footer
      ref={root}
      className="relative w-full overflow-hidden bg-ink-deep px-6 pb-10 pt-24 sm:px-8 sm:pt-32"
      aria-label="Rodapé"
    >
      {/* Subtle static noise, jittering */}
      <div
        className="static-noise pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Kinetic signature — the negative margins extend the overflow clip so
            the scatter effect isn't cropped, while keeping the reveal mask. */}
        <div className="overflow-hidden px-4 pb-4 pt-6 -mx-4 -mt-6">
          {/*
            The sweep gradient is clipped per-letter (not on the h2): transformed
            descendants break the parent's background-clip:text in Chromium.
            Negative animation-delays phase-shift each letter so the light still
            travels across the whole name.
          */}
          <h2
            ref={nameRef}
            onMouseEnter={scatter}
            onMouseLeave={regroup}
            className="cursor-default select-none whitespace-nowrap text-center font-display font-black uppercase leading-none tracking-tightest text-cream"
            style={{ fontSize: 'clamp(1.6rem, 9vw, 9.5rem)' }}
          >
            {NAME.split('').map((char, i) => (
              <span
                key={i}
                className="kinetic-letter kinetic-name inline-block will-change-transform"
                style={{ animationDelay: `${-i * 0.35}s` }}
              >
                {char === ' ' ? ' ' : char}
              </span>
            ))}
            <span className="caret-blink ml-2 inline-block align-baseline text-cream" aria-hidden="true">
              ▍
            </span>
          </h2>
        </div>

        {/* Rotating tagline */}
        <div className="footer-sub mt-6 flex h-6 items-center justify-center overflow-hidden">
          <p
            key={phrase}
            className="font-body text-sm text-cream-dim"
            style={{ animation: 'fade-slide 0.6s ease-out both' }}
          >
            {PHRASES[phrase]}
          </p>
        </div>

        {/* Bottom row: signature meta + creative credits */}
        <div className="footer-sub mt-16 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-line pt-6">
          <span className="label text-[0.6rem]">Rafael Moreira — {new Date().getFullYear()}</span>

          <div className="relative">
            {credits && (
              <div className="credits-pop absolute bottom-full right-0 z-20 mb-3 w-60 border border-line bg-ink/95 p-4 backdrop-blur-md" role="region" aria-label="Créditos criativos">
                <span className="label text-[0.6rem]">Construído com</span>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {CREDITS.map((lib) => (
                    <li key={lib.name} className="flex items-baseline justify-between gap-3">
                      <span className="font-body text-xs font-semibold text-cream">{lib.name}</span>
                      <span className="font-body text-[0.65rem] text-taupe">{lib.role}</span>
                    </li>
                  ))}
                </ul>
                <span
                  className="absolute -bottom-[7px] right-6 h-3 w-3 rotate-45 border-b border-r bg-ink/95"
                  style={{ borderColor: 'rgba(234,227,209,0.12)' }}
                  aria-hidden="true"
                />
              </div>
            )}
            <button
              type="button"
              onClick={() => setCredits((c) => !c)}
              className="credits-btn label cursor-pointer py-2 transition-colors duration-200 hover:text-cream focus:outline-none focus-visible:ring-1 focus-visible:ring-cream"
              aria-expanded={credits}
            >
              Créditos criativos
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-slide {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </footer>
  )
}