import Reveal from './Reveal'
import RevealLines from './RevealLines'

const items = [
  {
    title: 'Product Design',
    description: 'Connect the dots, build relationships',
  },
  {
    title: 'Innovation',
    description: "Whats Next ? How to reach ?",
  },
  {
    title: 'Travel',
    description: 'Life is a journey, experience it!',
  },
  {
    title: 'Health & Fitness',
    description: 'Healthy body, healthy mind.',
  },
]

export default function Benefits() {
  return (
    <section className="px-6 pt-16 pb-36 sm:px-10">
      <RevealLines as="h2" className="text-center text-[21px] tracking-tight text-black">
        Things that define me ...
      </RevealLines>

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal
            key={item.title}
            delay={80 + i * 60}
            className="flex min-h-[280px] flex-col justify-between rounded-xl border border-black p-6"
          >
            <RevealLines as="h3" delay={140 + i * 60} className="text-2xl tracking-tight text-black">
              {item.title}
            </RevealLines>
            <RevealLines
              as="p"
              delay={190 + i * 60}
              className="text-lg font-normal leading-snug text-black"
            >
              {item.description}
            </RevealLines>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
