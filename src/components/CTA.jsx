import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { profile } from '../constants/data'

export default function CTA() {
  return (
    <section className="relative py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl glass-strong px-8 py-16 text-center"
      >
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-accent-blue/25 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-accent-violet/25 rounded-full blur-[100px]" />

        <p className="section-tag mb-4 relative">// let's build something</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-5 relative">
          Got a role or a project in mind?
        </h2>
        <p className="text-ink-muted max-w-xl mx-auto mb-8 relative">
          I'm currently open to internships, full-time roles, and select freelance work. Let's talk about what you're building.
        </p>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="relative inline-flex items-center gap-2 px-7 py-3 rounded-full bg-glow-gradient text-white font-medium shadow-glow hover:opacity-90 transition-opacity"
        >
          Get in touch <FiArrowRight />
        </a>
      </motion.div>
    </section>
  )
}
