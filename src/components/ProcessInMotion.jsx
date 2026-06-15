import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/smoothScroll'
import { useDotGridWave } from '../lib/canvasFx'
import SectionEyebrow from './SectionEyebrow'

/* Single organic sine-ish path, drawn in a 1200x340 viewBox. */
const WAVE_PATH =
  'M 10 200 C 130 60, 230 60, 330 180 S 530 320, 640 190 S 830 40, 930 150 S 1110 290, 1190 170'

/*
 * Steps live at fractions of the path length; cards sit asymmetrically
 * (above / below, with shifted anchors) — never the alternating cliché.
 * `card.place` anchors the card above or below the marker; `card.shiftX` is the
 * horizontal anchor in % of card width (-50 = centered, -88 = right-aligned so
 * edge markers never push the card outside the viewport).
 */
const STEPS = [
  {
    at: 0.05,
    title: 'Descoberta',
    detail: 'Entendo o problema, o público e o tom antes de qualquer pixel. Sem briefing claro, nenhum efeito salva.',
    card: { place: 'top', shiftX: -12 },
    icon: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="m20 20-4.5-4.5" />
      </>
    ),
  },
  {
    at: 0.27,
    title: 'Protótipo',
    detail: 'Micro-interações testadas cedo, em protótipos navegáveis — animação se decide no rascunho, não no final.',
    card: { place: 'bottom', shiftX: -50 },
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M4 10h16M10 10v10" />
      </>
    ),
  },
  {
    at: 0.5,
    title: 'Código',
    detail: 'Componentes limpos e tipados, estados previsíveis. A base sólida é o que deixa o motion respirar.',
    card: { place: 'top', shiftX: -50 },
    icon: (
      <>
        <path d="m8 7-5 5 5 5" />
        <path d="m16 7 5 5-5 5" />
        <path d="m13 4-2 16" />
      </>
    ),
  },
  {
    at: 0.73,
    title: 'Motion',
    detail: 'Cada animação tem propósito narrativo: guiar o olho, dar feedback, criar memória. Nada se mexe à toa.',
    card: { place: 'bottom', shiftX: -50 },
    icon: (
      <>
        <path d="M5 19c0-8 3-14 7-14s7 6 7 14" />
        <circle cx="12" cy="19" r="2" />
      </>
    ),
  },
  {
    at: 0.95,
    title: 'Entrega',
    detail: 'Performance auditada, acessibilidade revisada, deploy sem susto — e monitoramento depois do lançamento.',
    card: { place: 'top', shiftX: -88 },
    icon: (
      <>
        <path d="M4 12.5 9.5 18 20 6" />
      </>
    ),
  },
]

export default function ProcessInMotion() {
  const root = useRef(null)
  const pathRef = useRef(null)
  const stageRef = useRef(null)
  const canvas = useRef(null)
  const [points, setPoints] = useState([])
  const [activeStep, setActiveStep] = useState(null)

  useDotGridWave(canvas)

  /* Resolve marker positions from the path geometry (viewBox space → %). */
  useLayoutEffect(() => {
    const path = pathRef.current
    if (!path) return
    const total = path.getTotalLength()
    setPoints(
      STEPS.map((step) => {
        const p = path.getPointAtLength(total * step.at)
        return { x: (p.x / 1200) * 100, y: (p.y / 340) * 100 }
      }),
    )
  }, [])

  /* Self-drawing line scrubbed by scroll + marker pop-ins. */
  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const total = path.getTotalLength()

    if (prefersReducedMotion()) {
      path.style.strokeDasharray = 'none'
      return
    }

    path.style.strokeDasharray = total
    path.style.strokeDashoffset = total

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top 80%',
          end: 'bottom 35%',
          scrub: 1,
        },
      })

      gsap.utils.toArray('.process-marker').forEach((marker, i) => {
        gsap.from(marker, {
          scale: 0,
          rotationY: 220,
          duration: 0.8,
          delay: i * 0.05,
          ease: 'back.out(2.2)',
          scrollTrigger: { trigger: marker, start: 'top 85%' },
        })
      })

      gsap.from('.process-eyebrow, .process-title', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
    }, root)

    return () => ctx.revert()
  }, [points.length])

  /* Close the floating card on Escape, outside click, or scrolling away. */
  useEffect(() => {
    if (activeStep === null) return
    const onKey = (e) => e.key === 'Escape' && setActiveStep(null)
    const onPointer = (e) => {
      if (!e.target.closest('.process-card') && !e.target.closest('.process-marker'))
        setActiveStep(null)
    }
    const io = new IntersectionObserver(
      ([entry]) => !entry.isIntersecting && setActiveStep(null),
      { threshold: 0.1 },
    )
    io.observe(stageRef.current)
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    return () => {
      io.disconnect()
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [activeStep])

  return (
    <section
      ref={root}
      id="processo"
      className="relative w-full overflow-hidden bg-ink px-6 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40"
      aria-label="Processo de trabalho"
    >
      {/* Mouse-reactive dot grid */}
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl">
        <div className="process-eyebrow mb-6">
          <SectionEyebrow index="04" title="Processo" />
        </div>
        <h2
          className="process-title mb-16 max-w-3xl font-display font-semibold uppercase leading-[0.98] tracking-tightest text-cream sm:mb-24"
          style={{ fontSize: 'clamp(1.9rem, 4.6vw, 3.8rem)' }}
        >
          Método em movimento, do briefing ao deploy.
        </h2>

        {/* Wave stage — markers are positioned in path space */}
        <div ref={stageRef} className="relative mx-auto w-full" style={{ aspectRatio: '1200 / 340' }}>
          <svg viewBox="0 0 1200 340" fill="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            {/* Ghost of the full path, so the journey is visible before drawing */}
            <path d={WAVE_PATH} stroke="rgba(234,227,209,0.08)" strokeWidth="1.5" />
            <path
              ref={pathRef}
              d={WAVE_PATH}
              stroke="rgba(234,227,209,0.65)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          {points.map((point, i) => {
            const step = STEPS[i]
            const isOpen = activeStep === i
            return (
              <div
                key={step.title}
                className="absolute"
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
              >
                <button
                  type="button"
                  onClick={() => setActiveStep(isOpen ? null : i)}
                  className={`process-marker group relative flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border bg-ink-deep transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-cream ${
                    isOpen
                      ? 'border-cream text-cream'
                      : 'border-line text-cream-dim hover:border-cream/50 hover:text-cream'
                  }`}
                  style={{ willChange: 'transform' }}
                  aria-expanded={isOpen}
                  aria-label={`Etapa ${i + 1}: ${step.title}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    {step.icon}
                  </svg>
                  {/* Solid pill behind the label so the wave never cuts through the text */}
                  <span className="label absolute -bottom-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-ink px-3 py-1 text-[0.6rem] lg:block">
                    {step.title}
                  </span>
                </button>

                {/* Floating detail card — anchored above/below the marker, arrow pointing back */}
                {isOpen && (
                  <div
                    className="process-card absolute z-20 w-64 border border-line bg-ink-deep/70 p-5 backdrop-blur-md sm:w-72"
                    style={{
                      left: 0,
                      top: step.card.place === 'top' ? -34 : 34,
                      '--shift': `${step.card.shiftX}%`,
                      '--rise': step.card.place === 'top' ? '-100%' : '0%',
                      transform: 'translate(var(--shift), var(--rise))',
                      animation: 'card-pop 0.35s cubic-bezier(0.34, 1.4, 0.64, 1) both',
                    }}
                    role="region"
                    aria-label={`Detalhes da etapa ${step.title}`}
                  >
                    <span
                      className="card-arrow absolute h-3 w-3 rotate-45 border-line bg-ink-deep/70"
                      style={
                        step.card.place === 'top'
                          ? { bottom: '-7px', left: `calc(${-step.card.shiftX}% - 6px)`, borderRight: '1px solid', borderBottom: '1px solid', borderColor: 'rgba(234,227,209,0.12)' }
                          : { top: '-7px', left: `calc(${-step.card.shiftX}% - 6px)`, borderLeft: '1px solid', borderTop: '1px solid', borderColor: 'rgba(234,227,209,0.12)' }
                      }
                      aria-hidden="true"
                    />
                    <button
                      type="button"
                      onClick={() => setActiveStep(null)}
                      className="absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center text-cream-dim transition-colors duration-200 hover:text-cream focus:outline-none focus-visible:ring-1 focus-visible:ring-cream"
                      aria-label="Fechar detalhes"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </button>
                    <span className="label text-[0.6rem]">Etapa 0{i + 1}</span>
                    <h3 className="mt-1 font-display text-lg font-bold uppercase tracking-tight text-cream">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-cream-dim">
                      {step.detail}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile helper: the labels are hidden, so list the steps below */}
        <div className="mt-14 flex flex-wrap justify-center gap-x-6 gap-y-2 lg:hidden">
          {STEPS.map((step, i) => (
            <button
              key={step.title}
              type="button"
              onClick={() => setActiveStep(activeStep === i ? null : i)}
              className={`label cursor-pointer transition-colors duration-200 ${
                activeStep === i ? 'text-cream' : 'hover:text-cream'
              }`}
            >
              0{i + 1} — {step.title}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        /* --shift/--rise keep the anchor while the pop animation plays. */
        @keyframes card-pop {
          from { opacity: 0; transform: translate(var(--shift, 0%), var(--rise, 0%)) scale(0.85) translateY(8px); }
          to { opacity: 1; transform: translate(var(--shift, 0%), var(--rise, 0%)) scale(1) translateY(0); }
        }
        /* On smaller screens the wave stage is tiny — float the card centered instead. */
        @media (max-width: 1023px) {
          .process-card {
            position: fixed !important;
            left: 50% !important;
            top: 50% !important;
            bottom: auto !important;
            transform: translate(-50%, -50%) !important;
            animation: none !important;
            width: min(85vw, 20rem);
            z-index: 50;
          }
          .process-card .card-arrow { display: none; }
        }
      `}</style>
    </section>
  )
}
