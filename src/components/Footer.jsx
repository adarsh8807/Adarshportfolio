import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from 'react-icons/fi'
import { navLinks, profile } from '../constants/data'

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-line pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
        <div>
          <a href="#home" className="font-mono text-lg font-semibold inline-block mb-4">
            <span className="text-ink-dim">&lt;</span>
            <span className="text-gradient">{profile.name.split(' ')[0]}</span>
            <span className="text-ink-dim"> /&gt;</span>
          </a>
          <p className="text-ink-muted text-sm leading-relaxed max-w-xs">
            Full-stack developer building fast, dependable web apps — currently open to internships and full-time roles.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs text-accent-cyan mb-4">// navigate</p>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(link.href)
                  }}
                  className="text-sm text-ink-muted hover:text-accent-cyan transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs text-accent-cyan mb-4">// more</p>
          <ul className="space-y-3">
            {['Testimonials', 'FAQ'].map((name) => (
              <li key={name}>
                <a
                  href={`#${name.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(`#${name.toLowerCase()}`)
                  }}
                  className="text-sm text-ink-muted hover:text-accent-cyan transition-colors"
                >
                  {name}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.resumeUrl}
                download
                className="text-sm text-ink-muted hover:text-accent-cyan transition-colors"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs text-accent-cyan mb-4">// connect</p>
          <div className="flex flex-col gap-3 mb-5">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-accent-cyan transition-colors"
            >
              <FiMail /> {profile.email} <FiArrowUpRight className="text-xs" />
            </a>
          </div>
          <div className="flex gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-ink-muted hover:text-accent-cyan transition-colors"
            >
              <FiGithub size={15} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-ink-muted hover:text-accent-cyan transition-colors"
            >
              <FiLinkedin size={15} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-line pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-ink-dim text-xs font-mono">
          © {year} {profile.name}. All rights reserved.
        </p>
        <p className="text-ink-dim text-xs font-mono">Built with React, Three.js &amp; Tailwind CSS.</p>
      </div>

      <p className="max-w-7xl mx-auto mt-4 text-[11px] text-ink-dim/70 font-mono leading-relaxed">
        3D model:{' '}
        <a
          href="https://sketchfab.com/3d-models/gaming-desktop-pc-d1d8282c9916438091f11aeb28787b66"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-line hover:text-accent-cyan"
        >
          "Gaming Desktop PC"
        </a>{' '}
        by{' '}
        <a
          href="https://sketchfab.com/Yolala1232"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-line hover:text-accent-cyan"
        >
          Yolala1232
        </a>
        , licensed under CC-BY-4.0.
      </p>
    </footer>
  )
}
