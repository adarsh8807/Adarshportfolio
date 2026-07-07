import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { profile } from '../constants/data'

export default function SideRails() {
  return (
    <>
      {/* left: vertical social icons with connecting line */}
      <div className="hidden lg:flex fixed bottom-0 left-8 z-30 flex-col items-center gap-6">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="text-ink-muted hover:text-accent-cyan transition-colors"
        >
          <FiGithub size={18} />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="text-ink-muted hover:text-accent-cyan transition-colors"
        >
          <FiLinkedin size={18} />
        </a>
        <span className="w-px h-24 bg-line" />
      </div>

      {/* right: vertical email tab */}
      <div className="hidden lg:flex fixed bottom-0 right-8 z-30 flex-col items-center gap-6">
        <a
          href={`mailto:${profile.email}`}
          className="font-mono text-xs tracking-widest text-ink-muted hover:text-accent-cyan transition-colors [writing-mode:vertical-rl]"
        >
          {profile.email}
        </a>
        <span className="w-px h-24 bg-line" />
      </div>
    </>
  )
}
