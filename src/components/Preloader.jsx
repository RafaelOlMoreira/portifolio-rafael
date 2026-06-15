import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/smoothScroll'

/**
 * Full-screen intro overlay: a count-up from 00 to 100 while the brand word
 * fades in, then the whole panel wipes upward to reveal the hero.
 * Calls onComplete() so the hero can start its own reveal timeline.
 */
export default function Preloader({ onComplete }) {
  const root = useRef(null)
  const counter = useRef(null)
  const word = useRef(null)
  const bar = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      onComplete?.()
      gsap.set(root.current, { display: 'none' })
      return
    }

    const ctx = gsap.context(() => {
      const count = { v: 0 }
      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => onComplete?.(),
      })

      tl.to(word.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0)
        .to(
          count,
          {
            v: 100,
            duration: 1.8,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (counter.current)
                counter.current.textContent = String(Math.round(count.v)).padStart(2, '0')
            },
          },
          0.1,
        )
        .to(bar.current, { scaleX: 1, duration: 1.8, ease: 'power2.inOut' }, 0.1)
        .to([counter.current, word.current], { opacity: 0, duration: 0.4 }, '+=0.15')
        .to(
          root.current,
          { yPercent: -100, duration: 1, ease: 'power4.inOut' },
          '-=0.1',
        )
        .set(root.current, { display: 'none' })
    }, root)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-deep"
      aria-hidden="true"
    >
      <div
        ref={word}
        className="font-display text-cream font-black uppercase tracking-tightest opacity-0 translate-y-4"
        style={{ fontSize: 'clamp(2.5rem, 9vw, 7rem)', lineHeight: 1 }}
      >
        PORTFOLIO
      </div>

      <div className="mt-8 h-px w-[min(60vw,420px)] overflow-hidden bg-line">
        <div
          ref={bar}
          className="h-full w-full origin-left scale-x-0 bg-cream"
        />
      </div>

      <div
        ref={counter}
        className="mt-5 font-body text-sm font-medium tracking-widelabel text-cream-dim"
      >
        00
      </div>
    </div>
  )
}
