import About from '../components/About'
import Benefits from '../components/Benefits'
import CTA from '../components/CTA'
import FAQ from '../components/FAQ'
import Hero from '../components/Hero'
import LogoCloud from '../components/LogoCloud'

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <About />
        <LogoCloud />
        <Benefits />
        <FAQ />
        <CTA />
      </main>
    </>
  )
}
