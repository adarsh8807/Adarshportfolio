import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { experience } from '../constants/data'

const typeColor = {
  Internship: 'bg-accent-blue',
  Freelance: 'bg-accent-violet',
  Projects: 'bg-accent-cyan',
  Education: 'bg-ink-dim',
}

export default function Experience() {
  // the vertical line now fills in as you scroll through the section,
  // instead of just sitting there as a static gradient
  const trackRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.85', 'end 0.6'],
  })
  const lineHeight = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  })

  return (
    <section id="experience" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="section-tag mb-2">// 03. experience</p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-14">Where I've been</h2>

        <div ref={trackRef} className="relative pl-8 sm:pl-10">
          {/* faint static track so the line has something to grow against */}
          <div className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-line/40" />
          {/* animated fill, driven by scroll position */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[7px] sm:left-[11px] top-2 w-px bg-gradient-to-b from-accent-blue via-accent-violet to-accent-cyan shadow-glow"
          />

          <div className="space-y-10">
            {experience.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, delay: i * 0.08 + 0.15, type: 'spring', stiffness: 260, damping: 18 }}
                  className={`absolute -left-8 sm:-left-10 top-1.5 w-3.5 h-3.5 rounded-full ring-4 ring-base ${
                    typeColor[item.type] || 'bg-accent-blue'
                  }`}
                />
                <div className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="font-display font-semibold text-lg">{item.title}</h3>
                    <span className="font-mono text-xs text-accent-cyan">{item.year}</span>
                  </div>
                  <p className="text-ink-muted text-sm mb-2">
                    {item.org} · <span className="text-ink-dim">{item.type}</span>
                  </p>
                  <p className="text-ink-dim text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
