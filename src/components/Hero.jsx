import { Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi'
import HeroScene from '../canvas/HeroScene'
import { profile } from '../constants/data'

function useTypewriter(words, speed = 90, pause = 1400) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    let timeout

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), speed)
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), speed / 2)
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setWordIndex((i) => i + 1)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, speed, pause])

  return text
}

export default function Hero() {
  const typed = useTypewriter(profile.roles)

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* single deliberate glow, sourced from where the machine sits, not a symmetric backdrop */}
      <div className="absolute top-1/3 right-0 w-[32rem] h-[32rem] bg-accent-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* left */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {profile.availableForWork && (
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass mb-5 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Available for work
            </span>
          )}
          <p className="section-tag mb-4">// hello, world</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-4">
            I'm {profile.name.split(' ')[0]}
            <br />
            <span className="text-gradient">{typed}</span>
            <span className="text-accent-cyan animate-blink">|</span>
          </h1>
          <p className="text-ink-muted text-base sm:text-lg max-w-md mb-8 leading-relaxed">
            {profile.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-6 py-3 rounded-full bg-glow-gradient text-white font-medium shadow-glow hover:opacity-90 transition-opacity"
            >
              See My Work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-6 py-3 rounded-full border border-line text-ink hover:border-accent-blue/60 transition-colors"
            >
              Let's Talk
            </a>
            <a
              href={profile.resumeUrl}
              download={`${profile.name.replace(/\s+/g, '_')}_Resume.pdf`}
              className="text-sm text-ink-muted hover:text-accent-cyan underline underline-offset-4 decoration-line transition-colors"
            >
              Resume ↓
            </a>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: FiGithub, href: profile.github, label: 'GitHub' },
              { icon: FiLinkedin, href: profile.linkedin, label: 'LinkedIn' },
              { icon: FiMail, href: `mailto:${profile.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-ink-muted hover:text-accent-cyan hover:shadow-glow transition-all"
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>

        {/* right — 3D canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="h-[380px] sm:h-[460px] md:h-[520px]"
        >
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center text-ink-dim font-mono text-sm">
                loading scene...
              </div>
            }
          >
            <HeroScene />
          </Suspense>
          <p className="mt-2 text-center text-xs font-mono text-ink-dim">
            <span className="text-accent-cyan">›</span> click the monitor to power it on
          </p>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-ink-dim"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <span className="font-mono text-xs">scroll</span>
        <FiArrowDown />
      </motion.a>
    </section>
  )
}
