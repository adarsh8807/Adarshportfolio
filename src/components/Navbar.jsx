import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { navLinks, profile } from '../constants/data'
import { useActiveSection } from '../hooks/useActiveSection'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(navLinks.map((l) => l.href.slice(1)))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-strong py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            handleNav('#home')
          }}
          className="font-mono text-lg font-semibold tracking-tight"
        >
          <span className="text-ink-dim">&lt;</span>
          <span className="text-gradient">{profile.name.split(' ')[0]}</span>
          <span className="text-ink-dim"> /&gt;</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 font-mono text-sm">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNav(link.href)
                }}
                className={`relative py-1 transition-colors ${
                  active === link.href.slice(1) ? 'text-accent-cyan' : 'text-ink-muted hover:text-ink'
                }`}
              >
                <span className="text-accent-blue/60 mr-1">0{i + 1}.</span>
                {link.name}
                {active === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-glow-gradient rounded-full"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href={profile.resumeUrl}
            download
            className="font-mono text-sm px-5 py-2 rounded-full border border-accent-blue/50 text-ink hover:bg-accent-blue/10 hover:shadow-glow transition-all"
          >
            Resume
          </a>
        </div>

        <button
          className="md:hidden text-2xl text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong mx-4 mt-3 rounded-2xl overflow-hidden"
          >
            <ul className="flex flex-col p-4 gap-1 font-mono text-sm">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNav(link.href)
                    }}
                    className={`block px-3 py-3 rounded-lg transition-colors ${
                      active === link.href.slice(1)
                        ? 'text-accent-cyan bg-white/5'
                        : 'text-ink-muted'
                    }`}
                  >
                    <span className="text-accent-blue/60 mr-1">0{i + 1}.</span>
                    {link.name}
                  </a>
                </li>
              ))}
              <a
                href={profile.resumeUrl}
                download
                className="mt-2 text-center px-3 py-3 rounded-lg border border-accent-blue/50"
              >
                Resume
              </a>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
