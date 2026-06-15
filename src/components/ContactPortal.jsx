import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import emailjs from '@emailjs/browser'
import { prefersReducedMotion } from '../lib/smoothScroll'
import SectionEyebrow from './SectionEyebrow'

const GITHUB_USER = 'RafaelOlMoreira'
const LINKEDIN_URL = `https://www.linkedin.com/in/${GITHUB_USER}`

// EmailJS credentials come from .env (VITE_* vars are inlined at build time).
// When absent, the terminal still runs the full animation in "demo" mode.
const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}
const EMAILJS_READY = Boolean(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* Hand-picked repos shown in the GitHub preview, in this exact order. */
const FEATURED_REPOS = ['hyzor', 'GameBingo', 'crtech-store-readme', 'alanacamposADV']

/* Keyword-triggered replies — the terminal "answers back" while you type. */
const RESPONSES = [
  { match: /(site|landing|p[áa]gina|portf[óo]lio)/i, reply: 'Um site? Ótimo. Que tal um com scroll que conta história?' },
  { match: /(app|aplicativo|saas|dashboard|painel)/i, reply: 'Dashboards e apps são minha praia — dados merecem motion.' },
  { match: /(loja|e-?commerce|venda|produto)/i, reply: 'E-commerce vivo converte mais. Bora animar esse checkout?' },
  { match: /(anima|motion|gsap|efeito|interativ)/i, reply: 'Falou minha língua: animação com propósito narrativo.' },
  { match: /(ol[áa]|oi\b|hey|fala|bom dia|boa tarde|boa noite)/i, reply: 'Olá! Pode mandar a ideia — o terminal aguenta.' },
  { match: /(prazo|urgente|r[áa]pido|semana)/i, reply: 'Prazos apertados pedem escopo esperto. Vamos conversar.' },
]

const INITIAL_LINES = [
  { type: 'sys', text: `$ iniciar-conversa --com rafael` },
  { type: 'bot', text: 'Digite seu melhor projeto para começar uma conversa…' },
]

let uid = 0
const nextId = () => ++uid

/* ---------- Profile preview modals (no social icon row) ---------- */

function ModalShell({ title, onClose, children }) {
  const panel = useRef(null)
  const closeBtn = useRef(null)

  useLayoutEffect(() => {
    closeBtn.current?.focus()
    if (prefersReducedMotion()) return
    // gsap.context + revert (not kill): survives StrictMode double-mount.
    const ctx = gsap.context(() => {
      gsap.from(panel.current, {
        opacity: 0,
        y: 26,
        scale: 0.92,
        duration: 0.45,
        ease: 'power3.out',
      })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 cursor-pointer backdrop-blur-xl" onClick={onClose} aria-hidden="true" />
      <div ref={panel} className="relative w-full max-w-md border border-line bg-ink-deep/95 p-6 sm:p-8">
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-11 w-11 cursor-pointer items-center justify-center text-cream-dim transition-colors duration-200 hover:text-cream focus:outline-none focus-visible:ring-1 focus-visible:ring-cream"
          aria-label="Fechar"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  )
}

function GithubModal({ onClose }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let alive = true
    Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`).then((r) => (r.ok ? r.json() : Promise.reject())),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`).then((r) =>
        r.ok ? r.json() : Promise.reject(),
      ),
    ])
      .then(([user, repos]) => {
        if (!alive) return
        const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]))
        const picked = FEATURED_REPOS.map((n) => byName.get(n.toLowerCase())).filter(Boolean)
        setData({ user, repos: picked.length ? picked : repos.slice(0, 4) })
      })
      .catch(() => alive && setError(true))
    return () => {
      alive = false
    }
  }, [])

  return (
    <ModalShell title="Perfil do GitHub" onClose={onClose}>
      {!data && !error && (
        <p className="font-body text-sm text-cream-dim">
          <span className="caret-blink">▋</span> Buscando perfil no GitHub…
        </p>
      )}

      {error && (
        <div>
          <p className="font-body text-sm text-cream-dim">Não consegui falar com a API agora.</p>
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noreferrer"
            className="label mt-3 inline-block cursor-pointer text-cream underline-offset-4 hover:underline"
          >
            Abrir github.com/{GITHUB_USER} ↗
          </a>
        </div>
      )}

      {data && (
        <div>
          <div className="flex items-center gap-4">
            <img
              src={data.user.avatar_url}
              alt={`Avatar de ${data.user.name}`}
              className="h-14 w-14 rounded-full border border-line"
            />
            <div>
              <h3 className="font-display text-lg font-bold uppercase tracking-tight text-cream">
                {data.user.name}
              </h3>
              <p className="font-body text-xs text-taupe">
                {data.user.bio} · {data.user.public_repos} repositórios
              </p>
            </div>
          </div>

          <ul className="mt-6 flex flex-col gap-2">
            {data.repos.map((repo, i) => (
              <li
                key={repo.id}
                style={{ animation: `fade-slide 0.5s ${0.08 * i}s ease-out both` }}
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex cursor-pointer items-center justify-between gap-3 border border-line px-4 py-3 transition-colors duration-200 hover:border-cream/40"
                >
                  <div className="min-w-0">
                    <span className="block truncate font-body text-sm font-semibold text-cream">
                      {repo.name}
                    </span>
                    {repo.description && (
                      <span className="block truncate font-body text-xs text-taupe">
                        {repo.description}
                      </span>
                    )}
                  </div>
                  <span className="label shrink-0 text-[0.6rem] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    ver ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href={data.user.html_url}
            target="_blank"
            rel="noreferrer"
            className="label mt-5 inline-block cursor-pointer text-cream-dim transition-colors duration-200 hover:text-cream"
          >
            Perfil completo ↗
          </a>
        </div>
      )}
    </ModalShell>
  )
}

function LinkedinModal({ onClose }) {
  return (
    <ModalShell title="Perfil do LinkedIn" onClose={onClose}>
      <span className="label">LinkedIn</span>
      <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-tight text-cream">
        Rafael Oliveira Moreira
      </h3>
      <p className="mt-1 font-body text-sm text-cream-dim">Developer Web Fullstack</p>
      <p className="mt-4 font-body text-sm leading-relaxed text-taupe">
        Conexões, recomendações e histórico profissional — direto na fonte.
      </p>
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex cursor-pointer items-center gap-2 border border-line px-5 py-3 font-body text-sm text-cream transition-colors duration-200 hover:border-cream/40"
      >
        Abrir perfil
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </a>
    </ModalShell>
  )
}

/* ---------- Terminal ---------- */

export default function ContactPortal() {
  const root = useRef(null)
  const outputRef = useRef(null)
  const terminalRef = useRef(null)
  const inputRef = useRef(null)
  const planeRef = useRef(null)
  const checkRef = useRef(null)
  const burstRef = useRef(null)

  const [lines, setLines] = useState(INITIAL_LINES)
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [sending, setSending] = useState('idle') // idle | flying | done
  const [phase, setPhase] = useState('message') // message | email
  const [modal, setModal] = useState(null)
  const [bits, setBits] = useState([])
  const [ripples, setRipples] = useState([])

  const usedReplies = useRef(new Set())
  const lastRipple = useRef(0)
  const draft = useRef({ message: '' }) // holds the project text between the two steps

  const pushLine = (line) => setLines((prev) => [...prev.slice(-9), { ...line, id: nextId() }])

  /* Dynamic replies while the visitor pauses typing (only while describing the
     project — not while typing the e-mail address). */
  useEffect(() => {
    if (phase !== 'message' || !value.trim()) return
    const timer = setTimeout(() => {
      const hit = RESPONSES.find((r) => r.match.test(value) && !usedReplies.current.has(r.reply))
      if (hit) {
        usedReplies.current.add(hit.reply)
        pushLine({ type: 'bot', text: hit.reply })
      }
    }, 900)
    return () => clearTimeout(timer)
  }, [value, phase])

  /* Keep the latest line in view. */
  useEffect(() => {
    const el = outputRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  /* Floating binary digits while the input is focused. */
  useEffect(() => {
    if (!focused || prefersReducedMotion()) return
    const interval = setInterval(() => {
      setBits((prev) => {
        if (prev.length > 24) return prev
        return [
          ...prev,
          { id: nextId(), left: 4 + Math.random() * 92, char: Math.random() > 0.5 ? '1' : '0' },
        ]
      })
    }, 320)
    return () => clearInterval(interval)
  }, [focused])

  const onType = (e) => {
    const next = e.target.value
    const grew = next.length > value.length
    setValue(next)
    /* Each keystroke ripples the terminal background (throttled). */
    const now = performance.now()
    if (grew && now - lastRipple.current > 90 && !prefersReducedMotion()) {
      lastRipple.current = now
      const rect = terminalRef.current.getBoundingClientRect()
      setRipples((prev) => [
        ...prev.slice(-8),
        {
          id: nextId(),
          x: rect.width * (0.15 + Math.random() * 0.7),
          y: rect.height * (0.25 + Math.random() * 0.55),
        },
      ])
    }
  }

  /* Cosmetic send animation (plane flies off → particle burst → check lands).
     Returns a promise so the success message waits for both it and the network. */
  const playSendAnimation = () =>
    new Promise((resolve) => {
      const tl = gsap.timeline({ onComplete: resolve })
      tl.to(planeRef.current, {
        x: 46,
        y: -40,
        rotation: 38,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
      })
      if (burstRef.current) {
        const particles = burstRef.current.children
        tl.set(particles, { opacity: 1, x: 0, y: 0 }, '<0.3')
        for (let i = 0; i < particles.length; i++) {
          const angle = (i / particles.length) * Math.PI * 2
          tl.to(
            particles[i],
            {
              x: Math.cos(angle) * (26 + Math.random() * 16),
              y: Math.sin(angle) * (26 + Math.random() * 16),
              opacity: 0,
              duration: 0.55,
              ease: 'power2.out',
            },
            '<',
          )
        }
      }
      tl.fromTo(
        checkRef.current,
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2.5)' },
        '-=0.3',
      )
    })

  const send = async () => {
    const text = value.trim()
    if (!text || sending === 'flying') return

    // Step 1 — capture the project description, then ask for a contact e-mail.
    if (phase === 'message') {
      pushLine({ type: 'user', text })
      draft.current.message = text
      setValue('')
      setPhase('email')
      pushLine({ type: 'bot', text: 'Boa. Qual o seu melhor e-mail para eu te responder?' })
      return
    }

    // Step 2 — validate the e-mail, then actually send.
    if (!EMAIL_RE.test(text)) {
      pushLine({ type: 'user', text })
      setValue('')
      pushLine({ type: 'bot', text: 'Esse e-mail não parece válido — pode tentar de novo?' })
      return
    }

    pushLine({ type: 'user', text })
    setValue('')
    setSending('flying')

    const anim = prefersReducedMotion() ? Promise.resolve() : playSendAnimation()

    try {
      if (EMAILJS_READY) {
        await emailjs.send(
          EMAILJS.serviceId,
          EMAILJS.templateId,
          {
            message: draft.current.message,
            from_email: text,
            reply_to: text,
            page: 'Portfólio — terminal de contato',
          },
          { publicKey: EMAILJS.publicKey },
        )
      } else {
        // Demo mode: no credentials yet — simulate latency so the UX is complete.
        await new Promise((r) => setTimeout(r, 600))
      }
      await anim
      pushLine({
        type: 'bot',
        text: EMAILJS_READY
          ? 'Mensagem enviada! Em breve te respondo nesse e-mail.'
          : 'Visual pronto — falta plugar as credenciais do EmailJS para enviar de verdade.',
      })
      setSending('done')
    } catch (err) {
      await anim
      pushLine({
        type: 'bot',
        text: 'Algo falhou no envio. Tenta pelo GitHub ou LinkedIn abaixo.',
      })
      setSending('done')
    } finally {
      draft.current.message = ''
      setPhase('message')
      setTimeout(() => {
        if (!prefersReducedMotion()) gsap.set([planeRef.current, checkRef.current], { clearProps: 'all' })
        setSending('idle')
      }, 2000)
    }
  }

  return (
    <section
      ref={root}
      id="contato"
      className="relative w-full overflow-hidden bg-ink px-6 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40"
      aria-label="Contato"
    >
      {/* Focus-reactive gradient */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          focused ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(60% 50% at 50% 55%, rgba(234,227,209,0.07), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-6">
          <SectionEyebrow index="05" title="Contato" />
        </div>
        <h2
          className="mb-12 font-display font-semibold uppercase leading-[0.98] tracking-tightest text-cream sm:mb-16"
          style={{ fontSize: 'clamp(1.9rem, 4.6vw, 3.8rem)' }}
        >
          Abra um canal direto.
        </h2>

        {/* Terminal */}
        <div
          ref={terminalRef}
          className={`terminal-scan relative overflow-hidden border bg-ink-deep/80 transition-colors duration-500 ${
            focused ? 'border-cream/30' : 'border-line'
          }`}
        >
          {/* Keystroke ripples */}
          {ripples.map((r) => (
            <span
              key={r.id}
              className="key-ripple"
              style={{ left: r.x - 45, top: r.y - 45 }}
              onAnimationEnd={() => setRipples((prev) => prev.filter((p) => p.id !== r.id))}
              aria-hidden="true"
            />
          ))}

          {/* Floating binary digits */}
          {bits.map((b) => (
            <span
              key={b.id}
              className="binary-bit"
              style={{ left: `${b.left}%` }}
              onAnimationEnd={() => setBits((prev) => prev.filter((p) => p.id !== b.id))}
              aria-hidden="true"
            >
              {b.char}
            </span>
          ))}

          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-cream/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-cream/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-cream/20" />
            <span className="label ml-3 text-[0.6rem]">conversa — rafael@frontend</span>
          </div>

          {/* Output */}
          <div
            ref={outputRef}
            data-lenis-prevent
            className="max-h-52 overflow-y-auto px-5 py-4 font-body text-sm leading-7"
            aria-live="polite"
          >
            {lines.map((line) => (
              <p
                key={line.id ?? line.text}
                className={
                  line.type === 'user'
                    ? 'text-cream'
                    : line.type === 'bot'
                      ? 'text-cream-dim'
                      : 'text-taupe'
                }
              >
                {line.type === 'user' ? '> ' : line.type === 'bot' ? '· ' : ''}
                {line.text}
              </p>
            ))}
          </div>

          {/* Input row */}
          <div className="flex items-center gap-3 border-t border-line px-5 py-4">
            <span className="font-body text-sm text-taupe" aria-hidden="true">
              ➜
            </span>
            <input
              ref={inputRef}
              type={phase === 'email' ? 'email' : 'text'}
              inputMode={phase === 'email' ? 'email' : 'text'}
              autoComplete={phase === 'email' ? 'email' : 'off'}
              value={value}
              onChange={onType}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder={
                phase === 'email'
                  ? 'Digite seu e-mail e pressione Enter…'
                  : 'Descreva seu projeto e pressione Enter…'
              }
              aria-label={phase === 'email' ? 'Seu e-mail para retorno' : 'Descreva seu projeto'}
              disabled={sending === 'flying'}
              className="min-w-0 flex-1 border-0 bg-transparent font-body text-sm text-cream placeholder:text-taupe/70 focus:outline-none"
            />
            <span className={`caret-blink font-body text-sm text-cream ${focused ? '' : 'opacity-0'}`} aria-hidden="true">
              ▋
            </span>

            {/* Morphing send button */}
            <button
              type="button"
              onClick={send}
              disabled={sending === 'flying'}
              className="relative flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center border border-line text-cream-dim transition-colors duration-200 hover:border-cream/40 hover:text-cream focus:outline-none focus-visible:ring-1 focus-visible:ring-cream disabled:cursor-wait"
              aria-label="Enviar mensagem"
            >
              <svg
                ref={planeRef}
                viewBox="0 0 24 24"
                className="absolute"
                style={{ width: 18, height: 18 }}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              >
                <path d="M21 3 3 11l7 2 2 7 9-17z" />
                <path d="M10 13l11-10" />
              </svg>
              <svg
                ref={checkRef}
                viewBox="0 0 24 24"
                className="absolute opacity-0"
                style={{ width: 18, height: 18 }}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M4 12.5 9.5 18 20 6" />
              </svg>
              {/* Particle burst layer */}
              <span ref={burstRef} className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className="absolute h-1 w-1 rounded-full bg-cream opacity-0" />
                ))}
              </span>
            </button>
          </div>
        </div>

        {/* Profile previews instead of a social icon row */}
        <div className="mt-10 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => setModal('github')}
            className="group flex cursor-pointer items-center gap-3 border border-line px-5 py-3.5 transition-colors duration-200 hover:border-cream/40 focus:outline-none focus-visible:ring-1 focus-visible:ring-cream"
          >
            <span className="font-body text-sm text-cream">GitHub</span>
            <span className="label text-[0.6rem] text-taupe transition-colors duration-200 group-hover:text-cream-dim">
              preview do perfil
            </span>
          </button>
          <button
            type="button"
            onClick={() => setModal('linkedin')}
            className="group flex cursor-pointer items-center gap-3 border border-line px-5 py-3.5 transition-colors duration-200 hover:border-cream/40 focus:outline-none focus-visible:ring-1 focus-visible:ring-cream"
          >
            <span className="font-body text-sm text-cream">LinkedIn</span>
            <span className="label text-[0.6rem] text-taupe transition-colors duration-200 group-hover:text-cream-dim">
              preview do perfil
            </span>
          </button>
        </div>
      </div>

      {modal === 'github' && <GithubModal onClose={() => setModal(null)} />}
      {modal === 'linkedin' && <LinkedinModal onClose={() => setModal(null)} />}

      <style>{`
        @keyframes fade-slide {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  )
}
