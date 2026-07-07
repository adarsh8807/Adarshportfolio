import { motion } from 'framer-motion'
import { FiAward } from 'react-icons/fi'
import { certifications } from '../constants/data'

export default function Certificates() {
  return (
    <section id="certifications" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="section-tag mb-2">// 06. certifications</p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-14">Certifications</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl overflow-hidden hover:shadow-glow transition-shadow"
            >
              <div className="h-36 overflow-hidden">
                <img src={cert.image} alt={cert.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2 text-accent-cyan">
                  <FiAward />
                  <span className="font-mono text-xs">{cert.year}</span>
                </div>
                <h3 className="font-display font-semibold mb-1">{cert.title}</h3>
                <p className="text-ink-muted text-sm mb-4">{cert.org}</p>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-accent-blue hover:text-accent-violet transition-colors"
                >
                  View certificate →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
