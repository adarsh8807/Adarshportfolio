import { motion } from 'framer-motion'
import { FiLayout, FiServer, FiLayers, FiShare2 } from 'react-icons/fi'
import { services } from '../constants/data'

const icons = [FiLayout, FiServer, FiLayers, FiShare2]

export default function Services() {
  return (
    <section id="services" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="section-tag mb-2">// 05. services</p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-14">How I can help</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length]
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-6 hover:shadow-glow-violet transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-glow-gradient flex items-center justify-center mb-5">
                  <Icon className="text-white text-lg" />
                </div>
                <h3 className="font-display font-semibold mb-2">{s.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
