import { useEffect } from 'react'
import { prefersReducedMotion } from './smoothScroll'

/**
 * Shared canvas-loop scaffolding: handles DPR sizing, mouse tracking in canvas
 * space, pausing via IntersectionObserver when off-screen, and rAF cleanup.
 * `draw(ctx, state)` runs every frame while visible.
 */
function runCanvasLoop(canvas, setup, draw) {
  const ctx = canvas.getContext('2d')
  let raf = 0
  let visible = false
  const state = {
    w: 0,
    h: 0,
    mouse: { x: -9999, y: -9999 },
    data: null,
    t: 0,
  }

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = canvas.getBoundingClientRect()
    state.w = rect.width
    state.h = rect.height
    canvas.width = Math.round(rect.width * dpr)
    canvas.height = Math.round(rect.height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    state.data = setup(state)
  }

  const onMove = (e) => {
    const rect = canvas.getBoundingClientRect()
    state.mouse.x = e.clientX - rect.left
    state.mouse.y = e.clientY - rect.top
  }
  const onLeave = () => {
    state.mouse.x = -9999
    state.mouse.y = -9999
  }

  const loop = () => {
    state.t += 1
    ctx.clearRect(0, 0, state.w, state.h)
    draw(ctx, state)
    raf = requestAnimationFrame(loop)
  }

  const io = new IntersectionObserver(([entry]) => {
    const nowVisible = entry.isIntersecting
    if (nowVisible && !visible) {
      visible = true
      raf = requestAnimationFrame(loop)
    } else if (!nowVisible && visible) {
      visible = false
      cancelAnimationFrame(raf)
    }
  })

  resize()
  io.observe(canvas)
  window.addEventListener('resize', resize)
  // Listen on the parent section so motion reacts before the cursor is on the canvas.
  const host = canvas.parentElement ?? canvas
  host.addEventListener('pointermove', onMove)
  host.addEventListener('pointerleave', onLeave)

  return () => {
    cancelAnimationFrame(raf)
    io.disconnect()
    window.removeEventListener('resize', resize)
    host.removeEventListener('pointermove', onMove)
    host.removeEventListener('pointerleave', onLeave)
  }
}

/**
 * Subtle drifting particle field (Creative Stack background). Cream dots wander
 * slowly; the ones near the cursor get gently pushed away and brighten.
 */
export function useParticleField(canvasRef, { count = 70 } = {}) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion()) return

    return runCanvasLoop(
      canvas,
      ({ w, h }) =>
        Array.from({ length: count }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: 0.8 + Math.random() * 1.4,
        })),
      (ctx, { w, h, mouse, data }) => {
        for (const p of data) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist2 = dx * dx + dy * dy
          // Gentle repulsion inside a 120px radius.
          if (dist2 < 14400) {
            const dist = Math.sqrt(dist2) || 1
            const force = ((120 - dist) / 120) * 0.35
            p.x += (dx / dist) * force
            p.y += (dy / dist) * force
          }
          p.x += p.vx
          p.y += p.vy
          if (p.x < -5) p.x = w + 5
          if (p.x > w + 5) p.x = -5
          if (p.y < -5) p.y = h + 5
          if (p.y > h + 5) p.y = -5

          const near = dist2 < 14400 ? (1 - Math.sqrt(dist2) / 120) * 0.25 : 0
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(234, 227, 209, ${0.1 + near})`
          ctx.fill()
        }
      },
    )
  }, [canvasRef, count])
}

/**
 * Dot-grid that bulges away from the cursor in a soft wave (Process background).
 */
export function useDotGridWave(canvasRef, { gap = 36 } = {}) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion()) return

    return runCanvasLoop(
      canvas,
      ({ w, h }) => {
        const dots = []
        for (let x = gap / 2; x < w; x += gap)
          for (let y = gap / 2; y < h; y += gap) dots.push({ ox: x, oy: y })
        return dots
      },
      (ctx, { mouse, data, t }) => {
        for (const d of data) {
          const dx = d.ox - mouse.x
          const dy = d.oy - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          let x = d.ox
          let y = d.oy
          let alpha = 0.08
          // Wave displacement within 160px of the cursor + idle shimmer.
          if (dist < 160) {
            const force = Math.sin(((160 - dist) / 160) * Math.PI * 0.5) * 14
            x += (dx / (dist || 1)) * force
            y += (dy / (dist || 1)) * force
            alpha = 0.08 + ((160 - dist) / 160) * 0.3
          } else {
            alpha = 0.06 + 0.03 * Math.sin(t * 0.02 + d.ox * 0.05 + d.oy * 0.05)
          }
          ctx.beginPath()
          ctx.arc(x, y, 1, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(234, 227, 209, ${alpha})`
          ctx.fill()
        }
      },
    )
  }, [canvasRef, gap])
}
