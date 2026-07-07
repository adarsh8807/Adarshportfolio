import { motion } from 'framer-motion'
import { FiMessageSquare } from 'react-icons/fi'
import { testimonials } from '../constants/data'

function initials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="section-tag mb-2">// 08. testimonials</p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-14">What people say</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 flex flex-col hover:shadow-glow transition-shadow"
            >
              <FiMessageSquare className="text-accent-cyan text-xl mb-4" />
              <p className="text-ink-muted text-sm leading-relaxed mb-6 flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-glow-gradient flex items-center justify-center text-white text-xs font-semibold shrink-0">
                  {initials(t.name)}
                </div>
                <div>
                  <p className="font-display text-sm font-semibold">{t.name}</p>
                  <p className="text-ink-dim text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
