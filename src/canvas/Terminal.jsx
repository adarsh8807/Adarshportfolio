import { useEffect, useRef, useState, useCallback } from 'react'
import { profile, about, skills, experience, projects } from '../constants/data'
import './Terminal.css'

const PROMPT = 'guest@dev-pc:~$'

// A little snippet that gets typed out live when the person runs `code` —
// echoes the "watch it compile" section elsewhere on the site, but inside
// the terminal itself.
const CODE_SNIPPET = [
  '// live from the terminal',
  `function ${profile.name.split(' ')[0].toLowerCase()}Stack() {`,
  "  const frontend = ['React', 'Tailwind CSS']",
  "  const backend  = ['Java', 'Spring Boot', 'Node.js']",
  '  return [...frontend, ...backend]',
  '    .reduce((product, tool) => product.ship(tool), new Idea())',
  '}',
]

function bar(level) {
  const filled = Math.round(level / 10)
  return '█'.repeat(filled) + '░'.repeat(10 - filled) + ` ${level}%`
}

function buildHelp() {
  return [
    'Available commands:',
    '  about        — who I am',
    '  skills       — technical skill breakdown',
    '  experience   — work & project history',
    '  projects     — things I have shipped',
    '  contact      — how to reach me',
    '  resume       — get a copy of my resume',
    '  whoami       — current user info',
    '  code         — watch a snippet get written live',
    "  sudo hire-me — you know why you're here",
    '  clear        — clear the screen',
    '  exit         — power off this terminal',
  ]
}

function buildAbout() {
  return [`${profile.name} — ${profile.roles[0]}`, '', ...about.bio]
}

function buildSkills() {
  const lines = []
  Object.entries(skills).forEach(([category, items]) => {
    lines.push(`${category}:`)
    items.forEach((s) => lines.push(`  ${s.name.padEnd(16, ' ')} ${bar(s.level)}`))
    lines.push('')
  })
  return lines
}

function buildExperience() {
  const lines = []
  experience.forEach((e) => {
    lines.push(`[${e.year}] ${e.title} — ${e.org} (${e.type})`)
    lines.push(`  ${e.desc}`)
    lines.push('')
  })
  return lines
}

function buildProjects() {
  const lines = []
  projects.forEach((p, i) => {
    lines.push(`${i + 1}. ${p.title}`)
    lines.push(`   ${p.description}`)
    lines.push(`   stack: ${p.tech.join(', ')}`)
    lines.push('')
  })
  return lines
}

function buildContact() {
  return [
    `email    ${profile.email}`,
    `phone    ${profile.phone}`,
    `location ${profile.location}`,
    `github   ${profile.github}`,
    `linkedin ${profile.linkedin}`,
  ]
}

function buildWhoami() {
  return [
    'guest',
    `  visiting ${profile.name}'s portfolio`,
    `  access level: read-only`,
    `  status: ${profile.availableForWork ? 'open to work — hire me' : 'not currently available'}`,
  ]
}

export default function Terminal({ active, onExit, fullscreen = false }) {
  const [bootDone, setBootDone] = useState(false)
  const [lines, setLines] = useState([])
  const [typing, setTyping] = useState(null) // { text, cls } currently being typed, or null
  const [busy, setBusy] = useState(true)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const queueRef = useRef([]) // pending {text, cls, charDelay} lines to type out
  const timersRef = useRef([])
  const runIdRef = useRef(0) // bumped on every (re)activation to cancel stale timers

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  // Pulls the next queued line and types it out one character at a time,
  // then moves to the line after. This is the "write it live" effect used
  // for every command's output, not just the boot log.
  const typeNext = useCallback((myRun) => {
    if (myRun !== runIdRef.current) return
    const next = queueRef.current.shift()
    if (!next) {
      setTyping(null)
      setBusy(false)
      return
    }
    const { text, cls, charDelay = 12 } = next
    setBusy(true)
    let i = 0
    const step = () => {
      if (myRun !== runIdRef.current) return
      i += 1
      setTyping({ text: text.slice(0, i), cls })
      if (i < text.length) {
        const id = setTimeout(step, charDelay)
        timersRef.current.push(id)
      } else {
        setLines((prev) => [...prev, { text, cls }])
        setTyping(null)
        const id = setTimeout(() => typeNext(myRun), 70)
        timersRef.current.push(id)
      }
    }
    if (text.length === 0) {
      setLines((prev) => [...prev, { text: '', cls }])
      const id = setTimeout(() => typeNext(myRun), 40)
      timersRef.current.push(id)
    } else {
      step()
    }
  }, [])

  const enqueue = useCallback((newLines, cls = '', charDelay) => {
    newLines.forEach((text) => queueRef.current.push({ text, cls, charDelay }))
    typeNext(runIdRef.current)
  }, [typeNext])

  // (re)start whenever the screen powers on
  useEffect(() => {
    if (!active) return
    runIdRef.current += 1
    const myRun = runIdRef.current
    clearTimers()
    queueRef.current = []
    setLines([])
    setTyping(null)
    setBootDone(false)
    setBusy(true)

    enqueue([
      'AXIS-BIOS (C) build 2026.07 — POST OK',
      'CPU: OK   MEM: 32768MB OK   GPU: OK',
      'Loading kernel modules ......... done',
      'Mounting /home/guest ........... done',
      'Starting portfolio-shell v1.0 .. done',
      '',
      `Welcome. You're connected to ${profile.name.split(' ')[0]}'s machine.`,
      "Type 'help' to see what this thing can do.",
      '',
    ], 'boot', 8)

    const doneId = setTimeout(() => {
      if (myRun === runIdRef.current) setBootDone(true)
    }, 2200)
    timersRef.current.push(doneId)

    return clearTimers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  useEffect(() => {
    if (bootDone && !busy && inputRef.current) inputRef.current.focus()
  }, [bootDone, busy])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [lines, typing, input])

  const runCommand = useCallback((raw) => {
    const cmd = raw.trim()
    setLines((prev) => [...prev, { text: `${PROMPT} ${cmd}`, cls: 'echo' }])
    if (!cmd) return

    const lower = cmd.toLowerCase()
    switch (lower) {
      case 'help':
        enqueue(buildHelp())
        break
      case 'about':
        enqueue(buildAbout())
        break
      case 'skills':
        enqueue(buildSkills())
        break
      case 'experience':
        enqueue(buildExperience())
        break
      case 'projects':
        enqueue(buildProjects())
        break
      case 'contact':
        enqueue(buildContact())
        break
      case 'whoami':
        enqueue(buildWhoami())
        break
      case 'code':
        enqueue(CODE_SNIPPET, 'code', 18)
        break
      case 'resume':
        enqueue(['Opening resume in a new tab ...'])
        window.open(profile.resumeUrl, '_blank')
        break
      case 'sudo hire-me':
        enqueue([
          '[sudo] password for guest: ********',
          'Permission granted.',
          "Redirecting to contact — let's talk.",
        ], 'success')
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => onExit?.(), 1400)
        break
      case 'clear':
        queueRef.current = []
        setLines([])
        break
      case 'exit':
        enqueue(['Powering off ...'])
        setTimeout(() => onExit?.(), 500)
        break
      case 'ls':
        enqueue(['about  skills  experience  projects  contact  code  resume.pdf'])
        break
      case 'date':
        enqueue([new Date().toString()])
        break
      default:
        enqueue([`command not found: ${cmd}`, "type 'help' for a list of commands"], 'error')
    }
  }, [enqueue, onExit])

  const handleKeyDown = (e) => {
    if (busy) {
      // let a command run to completion before accepting the next one
      if (e.key === 'Enter') e.preventDefault()
      return
    }
    if (e.key === 'Enter') {
      if (input.trim()) {
        runCommand(input)
        setHistory((h) => [...h, input])
      } else {
        setLines((prev) => [...prev, { text: `${PROMPT} `, cls: 'echo' }])
      }
      setHistoryIndex(-1)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setInput(history[nextIndex])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (history.length === 0) return
      const nextIndex = historyIndex === -1 ? -1 : Math.min(history.length - 1, historyIndex + 1)
      setHistoryIndex(nextIndex)
      setInput(nextIndex === -1 ? '' : history[nextIndex])
    }
  }

  if (!active) {
    return (
      <div className="term-crt term-off">
        <div className="term-scanlines" aria-hidden="true" />
        <div className="term-vignette" aria-hidden="true" />
        <div className="term-standby">
          <span className="term-standby-dot" />
          click monitor to power on
        </div>
      </div>
    )
  }

  return (
    <div className={`term-crt term-on ${fullscreen ? 'term-fullscreen' : ''}`}>
      <div className="term-scanlines" aria-hidden="true" />
      <div className="term-vignette" aria-hidden="true" />
      <div className="term-titlebar">
        <span className="term-dot term-dot-red" />
        <span className="term-dot term-dot-yellow" />
        <span className="term-dot term-dot-green" />
        <span className="term-titletext">portfolio-shell — {profile.name.split(' ')[0]}</span>
        <button
          className="term-close"
          onClick={(e) => {
            e.stopPropagation()
            onExit?.()
          }}
          aria-label="Close terminal"
        >
          ×
        </button>
      </div>
      <div className="term-body" ref={scrollRef} onClick={() => inputRef.current?.focus()}>
        {lines.map((line, i) => (
          <div key={i} className={`term-line term-line-${line.cls || 'default'}`}>
            {line.text || '\u00A0'}
          </div>
        ))}
        {typing && (
          <div className={`term-line term-line-${typing.cls || 'default'}`}>
            {typing.text}
            <span className="term-cursor term-cursor-inline" />
          </div>
        )}
        {bootDone && !busy && (
          <div className="term-line term-inputline">
            <span className="term-prompt">{PROMPT}&nbsp;</span>
            <input
              ref={inputRef}
              className="term-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              inputMode="text"
              placeholder="type a command..."
            />
          </div>
        )}
      </div>
    </div>
  )
}
