import { useEffect, useState } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import LiveCodeEditor from './components/LiveCodeEditor'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Services from './components/Services'
import Certificates from './components/Certificates'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import CustomCursor from './components/CustomCursor'
import SideRails from './components/SideRails'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-base text-ink font-body min-h-screen selection:bg-accent-blue">
      <div className="grain-overlay" aria-hidden="true" />
      <Loader visible={loading} />
      <CustomCursor />
      <ScrollProgress />
      <SideRails />
      <Navbar />

      <main>
        <Hero />
        <About />

        <section className="relative py-10 px-6">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <p className="section-tag mb-2">// live from the editor</p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">Watch it compile</h2>
          </div>
          <LiveCodeEditor />
        </section>

        <Skills />
        <Experience />
        <Projects />
        <Services />
        <Certificates />
        <Testimonials />
        <FAQ />
        <CTA />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  )
}
