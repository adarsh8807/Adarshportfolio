import { motion } from 'framer-motion'
import { FiDownload } from 'react-icons/fi'
import profileImg from '../assets/profile.jpeg'
import { about, profile } from '../constants/data'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="section-tag mb-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          // 01. about
        </motion.p>
        <motion.h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ delay: 0.05 }}
        >
          Who I am
        </motion.h2>

        <div className="grid lg:grid-cols-[340px_1fr] gap-14 items-start">
          {/* photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto lg:mx-0 w-64 sm:w-80"
          >
            <div className="absolute -inset-3 bg-glow-gradient rounded-3xl opacity-30 blur-2xl" />
            <div className="relative glass rounded-3xl p-3 animate-float-slow">
              <img
                src={profileImg}
                alt={`Portrait of ${profile.name}`}
                className="rounded-2xl w-full object-cover aspect-[4/5]"
              />
              <div className="absolute top-6 right-6 flex gap-1.5">
                <span className="window-dot bg-red-400/70" />
                <span className="window-dot bg-yellow-400/70" />
                <span className="window-dot bg-green-400/70" />
              </div>
            </div>
          </motion.div>

          {/* bio + education */}
          <div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="space-y-4 text-ink-muted leading-relaxed mb-10"
            >
              {about.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="text-ink font-medium">{about.objective}</p>
            </motion.div>

            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-glow-gradient text-white font-medium shadow-glow hover:opacity-90 transition-opacity mb-14"
            >
              <FiDownload /> Download Resume
            </a>

            <div className="space-y-6">
              <p className="font-mono text-sm text-accent-cyan">// education</p>
              {about.education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-5 border-l-2 border-l-accent-blue"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-display font-semibold text-lg">{edu.title}</h3>
                    <span className="font-mono text-xs text-accent-cyan">{edu.year}</span>
                  </div>
                  <p className="text-ink-muted text-sm mb-1">{edu.place}</p>
                  <p className="text-ink-dim text-sm">{edu.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
