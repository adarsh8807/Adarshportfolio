import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono text-sm text-accent-cyan mb-4">
            <span className="text-ink-dim">$</span> booting portfolio<span className="animate-blink">_</span>
          </div>
          <div className="w-56 h-[3px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-glow-gradient"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
