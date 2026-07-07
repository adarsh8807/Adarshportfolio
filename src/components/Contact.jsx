import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend, FiCheck } from 'react-icons/fi'
import { profile } from '../constants/data'

const initialForm = { name: '', email: '', subject: '', message: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please enter your name.'
  if (!form.email.trim()) errors.email = 'Please enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address.'
  if (!form.subject.trim()) errors.subject = 'Please add a subject.'
  if (!form.message.trim()) errors.message = 'Please write a short message.'
  return errors
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('loading')
    // NOTE: wire this up to your own backend, Formspree, or EmailJS endpoint.
    setTimeout(() => {
      setStatus('success')
      setForm(initialForm)
      setTimeout(() => setStatus('idle'), 3500)
    }, 1400)
  }

  const fields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Jane Doe' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'jane@example.com' },
    { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Internship opportunity' },
  ]

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="section-tag mb-2">// 07. contact</p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-14">Let's talk</h2>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10">
          {/* info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-ink-muted leading-relaxed">
              Have an opportunity, a project, or just want to say hi? My inbox is open.
            </p>

            {[
              { icon: FiMail, label: profile.email, href: `mailto:${profile.email}` },
              { icon: FiPhone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
              { icon: FiMapPin, label: profile.location, href: null },
            ].map(({ icon: Icon, label, href }) => (
              <div key={label} className="flex items-center gap-4 glass rounded-2xl p-4">
                <div className="w-10 h-10 rounded-xl bg-glow-gradient flex items-center justify-center shrink-0">
                  <Icon className="text-white" />
                </div>
                {href ? (
                  <a href={href} className="text-ink hover:text-accent-cyan transition-colors">
                    {label}
                  </a>
                ) : (
                  <span className="text-ink">{label}</span>
                )}
              </div>
            ))}

            <div className="flex gap-4 pt-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-accent-cyan hover:shadow-glow transition-all"
              >
                <FiGithub />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-accent-cyan hover:shadow-glow transition-all"
              >
                <FiLinkedin />
              </a>
            </div>
          </motion.div>

          {/* form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            noValidate
            className="glass rounded-2xl p-6 sm:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {fields.slice(0, 2).map((f) => (
                <div key={f.name}>
                  <label htmlFor={f.name} className="block text-sm text-ink-muted mb-1.5">
                    {f.label}
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.name]}
                    onChange={handleChange}
                    aria-invalid={!!errors[f.name]}
                    className="w-full bg-white/5 border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-accent-blue transition-colors"
                  />
                  {errors[f.name] && <p className="text-xs text-red-400 mt-1">{errors[f.name]}</p>}
                </div>
              ))}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm text-ink-muted mb-1.5">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Internship opportunity"
                value={form.subject}
                onChange={handleChange}
                aria-invalid={!!errors.subject}
                className="w-full bg-white/5 border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-accent-blue transition-colors"
              />
              {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-ink-muted mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me a bit about the role or project..."
                value={form.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
                className="w-full bg-white/5 border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-accent-blue transition-colors resize-none"
              />
              {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-glow-gradient text-white font-medium shadow-glow hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {status === 'loading' ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FiSend /> Send Message
                </>
              )}
            </button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center gap-2 text-sm text-accent-cyan"
                >
                  <FiCheck /> Message sent — I'll get back to you soon.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
