import { Link } from 'react-router-dom'
import RevealLines from './RevealLines'
import Reveal from './Reveal'
import useInView from '../hooks/useInView'
import processAnimationUrl from '../assets/ux-process-animation.html?url'

// The animation is a self-contained page (canvas, plays once, rests on the final
// frame with a replay button). It is mounted only once scrolled into view so it
// starts when the visitor can actually see it, not on page load.
function ProcessAnimation() {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className="mx-auto aspect-[16/9] w-full max-w-3xl">
      {inView && (
        <iframe
          src={`${processAnimationUrl}?clean=1&mark=${encodeURIComponent('Product Design')}`}
          title="Product design process animation"
          scrolling="no"
          className="size-full border-0"
        />
      )}
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-6 pt-20 text-center sm:px-10">
      <h2 className="sr-only">Avinash Patel</h2>
      <ProcessAnimation />

      <div className="mt-8 space-y-4 text-black">
        <RevealLines as="p" delay={80} className="text-xl leading-tight sm:text-2xl">
          As a seasoned Product Designer, I've asked one question:
        </RevealLines>
        <RevealLines
          as="p"
          delay={160}
          className="whitespace-nowrap text-[clamp(1.125rem,4.8vw,2.75rem)] font-medium leading-tight"
        >
          &ldquo;What should this product become?&rdquo;
        </RevealLines>
        <RevealLines as="p" delay={240} className="text-[19.2px] leading-snug text-black/80">
          I'm a product designer, NID-trained, working in enterprise software and the tech
          shaping what's next: AI, automation, platforms. My aim is simple: design that
          grows the business and makes work easier for real people.
        </RevealLines>
        <RevealLines as="p" delay={320} className="pb-5 text-[19.2px] leading-snug text-black/80">
          Still hands-on. Still curious. Still designing what comes next.
        </RevealLines>
      </div>

      <div className="mt-8 flex items-center justify-center gap-5 pb-20">
        <Reveal
          as={Link}
          to="/work"
          delay={400}
          className="rounded-full border border-black px-6 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
        >
          Work
        </Reveal>
        <Reveal
          as={Link}
          to="/resume"
          delay={450}
          className="rounded-full border border-black px-6 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
        >
          Resume
        </Reveal>
      </div>
    </section>
  )
}
