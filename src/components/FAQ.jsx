import { useState } from 'react'
import { mediaUrl } from '../utils/mediaUrl'
import Reveal from './Reveal'
import RevealLines from './RevealLines'

const iconPlus = mediaUrl('images/icon-plus.svg')

const faqs = [
  {
    q: 'How do you balance UX with business metrics ?',
    a: "By treating them as one problem, not two - every flow I design has a metric it's meant to move, and every metric has a user story behind it.",
  },
  {
    q: 'Do you approach design from a growth hacking perspective ?',
    a: 'I borrow the experimentation mindset, but ground it in real user research rather than pure funnel optimization.',
  },
  {
    q: 'How do you deal with ever changing AI world ?',
    a: 'By staying hands-on: prototyping with new tools regularly so my instincts about what AI can and cannot do stay current.',
  },
  {
    q: 'How would you resolve conflicts ?',
    a: 'Get everyone looking at the same evidence - user data, business goals, technical constraints - and the disagreement usually narrows on its own.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="px-6 py-36 sm:px-10">
      <div className="border-t border-black" />
      <div className="pt-[8px] sm:pt-[16px]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[10rem_1fr] sm:gap-10">
          <RevealLines as="h2" className="text-3xl font-medium tracking-tight text-black sm:text-4xl">
            FAQs
          </RevealLines>

          <div className="divide-y divide-black sm:ml-auto sm:w-[85%]">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <Reveal
                  key={faq.q}
                  as="div"
                  duration={700}
                  delay={80 + i * 80}
                  className="pt-3 pb-4 first:pt-0 sm:grid sm:grid-cols-[3rem_1fr_1.5rem] sm:items-start sm:gap-4"
                >
                  <span className="hidden text-sm text-black/60 sm:block">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-4 text-left sm:contents"
                  >
                    <RevealLines
                      as="span"
                      className="sm:translate-x-[60px] -translate-y-[6px] text-lg font-normal tracking-tight text-black sm:col-start-2 sm:text-2xl"
                    >
                      {faq.q}
                    </RevealLines>
                    <img
                      src={iconPlus}
                      alt=""
                      className={`mt-1 size-6 shrink-0 -translate-y-[6px] transition-transform sm:col-start-3 ${isOpen ? 'rotate-45' : ''}`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out sm:col-start-2 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <RevealLines
                        as="p"
                        className="mt-3 sm:translate-x-[60px] text-[17.6px] leading-snug text-black/70"
                      >
                        {faq.a}
                      </RevealLines>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
