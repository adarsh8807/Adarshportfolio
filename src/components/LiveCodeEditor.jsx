import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// A small "IDE window" that types out a real snippet character by character,
// then runs a fake compile step and prints output — the live editor / compiler
// piece for the site. Everything here is just state + timers, no real
// execution, so it's cheap to run and safe to loop forever.
const SNIPPET = [
  { t: 'comment', text: '// Adarsh Pandey — full stack developer' },
  { t: 'comment', text: '// this is compiled live, right in the browser' },
  { t: 'blank' },
  { t: 'keyword', text: 'function ', inline: [{ t: 'fn', text: 'buildFeature' }, { t: 'plain', text: '(idea) {' }] },
  {
    t: 'plain',
    indent: 1,
    inline: [
      { t: 'keyword', text: 'const ' },
      { t: 'plain', text: 'plan = idea.split(' },
      { t: 'string', text: "'->'" },
      { t: 'plain', text: ')' },
    ],
  },
  { t: 'plain', indent: 1, inline: [{ t: 'keyword', text: 'return ' }, { t: 'plain', text: 'plan.' }, { t: 'fn', text: 'map' }, { t: 'plain', text: '(step => ' }, { t: 'fn', text: 'ship' }, { t: 'plain', text: '(step))' }] },
  { t: 'plain', text: '}' },
  { t: 'blank' },
  { t: 'comment', text: '// React on the front, Spring Boot / Node on the back' },
  { t: 'plain', inline: [{ t: 'fn', text: 'buildFeature' }, { t: 'plain', text: "('idea -> api -> ui -> ship')" }] },
]

function Line({ line }) {
  if (line.t === 'blank') return <div className="h-4" />
  if (line.t === 'comment') {
    return (
      <div className="text-ink-dim" style={{ paddingLeft: `${(line.indent || 0) * 1.25}rem` }}>
        {line.text}
      </div>
    )
  }
  if (line.inline) {
    return (
      <div style={{ paddingLeft: `${(line.indent || 0) * 1.25}rem` }}>
        {line.inline.map((chunk, i) => (
          <span
            key={i}
            className={
              chunk.t === 'keyword'
                ? 'text-accent-violet'
                : chunk.t === 'fn'
                ? 'text-accent-blue'
                : chunk.t === 'string'
                ? 'text-accent-cyan'
                : 'text-ink'
            }
          >
            {chunk.text}
          </span>
        ))}
      </div>
    )
  }
  return (
    <div className="text-accent-violet" style={{ paddingLeft: `${(line.indent || 0) * 1.25}rem` }}>
      {line.text}
    </div>
  )
}

export default function LiveCodeEditor() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [status, setStatus] = useState('typing') // typing -> compiling -> done
  const containerRef = useRef(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true
          runSequence()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function runSequence() {
    let line = 0
    const typeNext = () => {
      line += 1
      setVisibleLines(line)
      if (line < SNIPPET.length) {
        setTimeout(typeNext, 220)
      } else {
        setStatus('compiling')
        setTimeout(() => setStatus('done'), 900)
      }
    }
    setTimeout(typeNext, 400)
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="glass rounded-2xl overflow-hidden max-w-2xl mx-auto"
    >
      {/* title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line/60">
        <span className="w-3 h-3 rounded-full bg-red-400/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
        <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
        <span className="ml-3 font-mono text-xs text-ink-dim">buildFeature.js — live</span>
      </div>

      {/* code body */}
      <div className="p-6 font-mono text-sm leading-relaxed min-h-[220px]">
        {SNIPPET.slice(0, visibleLines).map((line, i) => (
          <Line key={i} line={line} />
        ))}
        {visibleLines < SNIPPET.length && (
          <span className="inline-block w-2 h-4 -mb-1 bg-accent-cyan animate-blink" />
        )}
      </div>

      {/* fake terminal / compiler output */}
      <div className="border-t border-line/60 px-6 py-4 font-mono text-xs bg-black/20">
        {status === 'typing' && <span className="text-ink-dim">waiting for input…</span>}
        {status === 'compiling' && (
          <span className="text-accent-cyan flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping" />
            compiling…
          </span>
        )}
        {status === 'done' && (
          <span className="text-emerald-400">
            ✓ compiled in 128ms — <span className="text-ink-dim">idea → api → ui → ship</span>
          </span>
        )}
      </div>
    </motion.div>
  )
}
