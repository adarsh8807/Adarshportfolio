import { motion } from 'framer-motion'
import {
  FiCode,
  FiServer,
  FiDatabase,
  FiTool,
} from 'react-icons/fi'
import { skills } from '../constants/data'

const categoryIcons = {
  Frontend: FiCode,
  Backend: FiServer,
  Database: FiDatabase,
  Tools: FiTool,
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="section-tag mb-2">// 02. skills</p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-14">What I work with</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skills).map(([category, items], ci) => {
            const Icon = categoryIcons[category] || FiCode
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.08 }}
                className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow group"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Icon className="text-accent-cyan text-xl" />
                  <h3 className="font-display font-semibold">{category}</h3>
                </div>

                <div className="space-y-4">
                  {items.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-ink-muted">{skill.name}</span>
                        <span className="font-mono text-xs text-ink-dim">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full rounded-full bg-glow-gradient group-hover:shadow-glow"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
