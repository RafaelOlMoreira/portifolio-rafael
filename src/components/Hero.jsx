import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/smoothScroll'

const WORD = 'FRONTEND'

// Shared type metrics so the filled back layer and the outline front layer
// occupy the exact same geometry and align pixel-for-pixel.
// Shared type metrics so the filled back layer and the outline front layer
// occupy the exact same geometry and align pixel-for-pixel.
const WORD_STYLE = { fontSize: 'clamp(3.25rem, 18.5vw, 16rem)' }

/** Renders the word split into individually clip-reveal-able letters. */
function SplitWord({ className, letterClass = '' }) {
  return (
    <span className={className} style={WORD_STYLE} aria-hidden="true">
      {WORD.split('').map((char, i) => (
        <span key={i} className="reveal-clip">
          <span className={`block ${letterClass}`}>{char}</span>
        </span>
      ))}
    </span>
  )
}

export default function Hero({ start }) {
  const root = useRef(null)
  const introRef = useRef(null)

  // Build the intro PAUSED on mount. Because gsap `.from()` tweens render their
  // start values immediately, the elements adopt their hidden state on the very
  // first frame — so nothing flashes in fully-rendered before the animation.
  // The scroll-out parallax is created only once the intro finishes, so it reads
  // the natural (visible) values as its scrub baseline instead of the hidden ones.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context((self) => {
      const buildScrollOut = () =>
        self.add(() => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: root.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.6,
              },
            })
            .to('.hero-word-back', { yPercent: -22, scale: 1.08, opacity: 0.25, ease: 'none' }, 0)
            .to('.hero-outline', { yPercent: -22, scale: 1.08, opacity: 0, ease: 'none' }, 0)
            .to('.hero-photo', { yPercent: -10, scale: 1.05, ease: 'none' }, 0)
            .to('.hero-corner', { opacity: 0, ease: 'none' }, 0)
            .to('.hero-scroll', { opacity: 0, ease: 'none' }, 0)

          ScrollTrigger.refresh()
        })

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power4.out' },
        onComplete: buildScrollOut,
      })

      tl.from('.letter-back', {
        yPercent: 115,
        duration: 1.1,
        stagger: 0.055,
      })
        .from(
          '.hero-photo',
          {
            yPercent: 10,
            scale: 1.12,
            opacity: 0,
            clipPath: 'inset(100% 0% 0% 0%)',
            duration: 1.3,
            ease: 'power3.out',
          },
          0.25,
        )
        .from(
          '.hero-outline',
          { opacity: 0, scale: 1.04, duration: 1, ease: 'power2.out' },
          0.85,
        )
        .from(
          '.hero-corner',
          { yPercent: 120, opacity: 0, duration: 0.9, stagger: 0.08 },
          0.5,
        )
        .from(
          '.hero-scroll',
          { opacity: 0, y: 12, duration: 0.6 },
          1.1,
        )

      introRef.current = tl
    }, root)

    return () => {
      introRef.current = null
      ctx.revert()
    }
  }, [])

  // Release the intro once the preloader hands off (start === true).
  useEffect(() => {
    if (start && introRef.current) introRef.current.play()
  }, [start])

  return (
    <section
      ref={root}
      className="relative h-[100svh] w-full overflow-hidden bg-ink"
      aria-label="Apresentação"
    >
      {/* Atmospheric depth: soft radial glow + top/bottom vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 8%, rgba(234,227,209,0.06), transparent 55%), linear-gradient(to bottom, rgba(0,0,0,0.35), transparent 22%, transparent 70%, rgba(0,0,0,0.55))',
        }}
      />

      {/* ---- Corner meta ----
           Mobile: name top-left + role top-right (bottom stays clear for the
           scroll hint). Desktop keeps the reference layout: role top-left,
           name bottom-left. */}
      <div className="absolute inset-0 z-40 p-6 sm:p-8 lg:p-10">
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <div className="reveal-clip sm:hidden">
              <span className="hero-corner label block">Rafael Oliveira Moreira</span>
            </div>
            <div className="reveal-clip hidden sm:block">
              <span className="hero-corner label block">Frontend Developer</span>
            </div>
            <div className="reveal-clip sm:hidden">
              <span className="hero-corner label block text-right">Frontend Developer</span>
            </div>
          </div>

          <div className="hidden items-end justify-between sm:flex">
            <div className="reveal-clip">
              <span className="hero-corner label block">Rafael Oliveira Moreira</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Layered headline + portrait ---- */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Back layer: filled word (occluded in the centre by the portrait) */}
        <SplitWord
          className="hero-word-back pointer-events-none absolute z-10 flex w-full justify-center px-[2vw] font-display font-black uppercase leading-none text-cream tracking-tightest will-reveal"
          letterClass="letter-back"
        />

        {/* Mid layer: the transparent-cut portrait */}
        <img
          src="/MinhaFoto.png"
          alt="Retrato do desenvolvedor frontend"
          className="hero-photo pointer-events-none absolute bottom-0 z-20 h-[78%] w-auto max-w-none select-none object-contain will-reveal sm:h-[86%] lg:h-[92%]"
          draggable="false"
        />

        {/* Front layer: full outline word sitting exactly over the filled back
            layer. Off-portrait the stroke coincides with the fill (invisible);
            where the portrait occludes the fill, the crisp outline shows through
            — following the silhouette, with every letter border intact. */}
        <SplitWord
          className="hero-outline pointer-events-none absolute z-30 flex w-full justify-center px-[2vw] font-display font-black uppercase leading-none tracking-tightest will-reveal"
          letterClass="letter-front text-stroke"
        />
      </div>

      {/* Hidden accessible heading for screen readers */}
      <h1 className="sr-only">Frontend Developer</h1>

      {/* ---- Scroll hint ----
           Drop shadows + glow lift it off the portrait behind (the photo's dark
           shirt sits underneath and was washing the text out). The glow lives on
           the track container — the moving bar is clipped by overflow-hidden. */}
      <div className="hero-scroll absolute bottom-6 left-1/2 z-40 -translate-x-1/2 sm:bottom-8">
        <div className="flex flex-col items-center gap-2">
          <span
            className="label text-[0.6rem]"
            style={{
              color: 'var(--cream)',
              textShadow: '0 1px 6px rgba(0,0,0,0.9), 0 0 16px rgba(0,0,0,0.7)',
            }}
          >
            Scroll
          </span>
          <span
            className="block h-10 w-px overflow-hidden bg-line"
            style={{
              boxShadow:
                '0 0 10px rgba(234,227,209,0.35), 0 1px 6px rgba(0,0,0,0.85)',
            }}
          >
            <span className="block h-full w-full animate-[scrollline_1.8s_ease-in-out_infinite] bg-cream" />
          </span>
        </div>
      </div>

      <style>{`
        @keyframes scrollline {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  )
}
