import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/smoothScroll'

const HEADING_LINES = [
  'Eu desenho e construo',
  'interfaces que parecem',
  'vivas, não estáticas.',
]

const STATS = [
  { value: '3+', label: 'Anos criando para a web' },
  { value: '17+', label: 'Projetos entregues' },
  { value: '∞', label: 'Atenção aos detalhes' },
]

const STACK = ['React', 'JavaScript', 'GSAP', 'Tailwind', 'Vite', 'Motion', 'WebGL']

export default function About() {
  const root = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // Heading: each line rises out of its clip mask.
      gsap.from('.about-line .inner', {
        yPercent: 110,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.about-heading', start: 'top 78%' },
      })

      // Index marker + eyebrow.
      gsap.from('.about-eyebrow', {
        opacity: 0,
        x: -20,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-eyebrow', start: 'top 85%' },
      })

      // Body copy + meta fade up.
      gsap.from('.about-fade', {
        opacity: 0,
        y: 28,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.about-body', start: 'top 80%' },
      })

      // Stat blocks.
      gsap.from('.about-stat', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.about-stats', start: 'top 85%' },
      })

      // Hairline draws across.
      gsap.from('.about-rule', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.about-rule', start: 'top 90%' },
      })

      ScrollTrigger.refresh()
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id="sobre"
      className="relative w-full bg-ink px-6 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40"
      aria-label="Sobre"
    >
      <div className="mx-auto max-w-7xl">
        {/* Eyebrow / index */}
        <div className="about-eyebrow mb-12 flex items-center gap-4 sm:mb-20">
          <span className="label">(01)</span>
          <span className="h-px w-12 bg-line" />
          <span className="label">Sobre</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Big statement */}
          <h2 className="about-heading col-span-1 font-display text-cream lg:col-span-8">
            {HEADING_LINES.map((line, i) => (
              <span key={i} className="about-line reveal-clip block">
                <span
                  className="inner block font-semibold uppercase leading-[0.98] tracking-tightest"
                  style={{ fontSize: 'clamp(1.9rem, 5.2vw, 4.4rem)' }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h2>

          {/* Body copy + meta */}
          <div className="about-body col-span-1 flex flex-col justify-end gap-8 lg:col-span-4">
            <p className="about-fade max-w-md font-body text-base leading-relaxed text-cream-dim sm:text-lg">
              Sou desenvolvedor frontend focado em transformar produtos comuns em
              experiências que as pessoas lembram. Uno código limpo a motion
              design para dar ritmo, profundidade e personalidade a cada
              interface.
            </p>
            <div className="about-fade flex flex-col gap-1">
              <span className="label">Disponível para projetos</span>
              <span className="flex items-center gap-2 font-body text-sm text-cream">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Aberto a novas oportunidades
              </span>
            </div>
          </div>
        </div>

        {/* Hairline */}
        <div className="about-rule mt-20 h-px w-full origin-left bg-line sm:mt-28" />

        {/* Stats */}
        <div className="about-stats mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="about-stat flex flex-col gap-2">
              <span
                className="font-display font-bold leading-none tracking-tightest text-cream"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}
              >
                {stat.value}
              </span>
              <span className="font-body text-sm text-taupe">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Stack row */}
        <div className="about-stats mt-16 flex flex-wrap items-center gap-x-3 gap-y-3 sm:mt-20">
          {STACK.map((tech) => (
            <span
              key={tech}
              className="about-stat rounded-full border border-line px-4 py-2 font-body text-sm text-cream-dim transition-colors duration-200 hover:border-cream/40 hover:text-cream"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
