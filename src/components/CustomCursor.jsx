import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(isFinePointer && !prefersReducedMotion)
  }, [])

  useEffect(() => {
    if (!enabled) return

    let ringX = 0
    let ringY = 0
    let mouseX = 0
    let mouseY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`
      }
    }

    const onOver = (e) => {
      const interactive = e.target.closest('a, button, [role="button"], input, textarea')
      if (ringRef.current) {
        ringRef.current.style.width = interactive ? '48px' : '32px'
        ringRef.current.style.height = interactive ? '48px' : '32px'
        ringRef.current.style.borderColor = interactive
          ? 'rgba(168,85,247,0.8)'
          : 'rgba(79,124,255,0.5)'
      }
    }

    let raf
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`
      }
      raf = requestAnimationFrame(animateRing)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(animateRing)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
