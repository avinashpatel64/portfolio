import { Link } from 'react-router-dom'
import RevealLines from './RevealLines'

export default function CTA() {
  return (
    <section id="contact" className="px-6 py-24 text-center sm:px-10">
      <RevealLines
        as="h2"
        className="mx-auto max-w-3xl text-3xl font-normal leading-tight tracking-tight text-black sm:text-5xl"
      >
        Interested in Working Together ?
      </RevealLines>
      <RevealLines
        as={Link}
        to="/contact"
        delay={140}
        className="mt-10 inline-block rounded-full bg-black px-8 py-2 text-sm font-medium text-white transition hover:opacity-80"
      >
        Get In Touch
      </RevealLines>
    </section>
  )
}
