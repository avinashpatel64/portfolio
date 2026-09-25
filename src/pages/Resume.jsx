import { useState } from 'react'
import CTA from '../components/CTA'
import RevealLines from '../components/RevealLines'
import Reveal from '../components/Reveal'
import { mediaUrl } from '../utils/mediaUrl'

const iconPlus = mediaUrl('images/icon-plus.svg')

const experience = [
  {
    date: 'Mar24-Present',
    title: 'Lead UX Designer, Salesforce',
    description:
      'Set design strategy across Customer Signals Intelligence (CSI) and Survey Feedback Management (SFM), designing AI-driven intelligence that surfaces actionable insights across channels. Lead future-of-Service-Cloud vision work, defining how AI reshapes the service experience - not just the next release.',
  },
  {
    date: 'May22-Dec23',
    title: 'Staff Product Designer, VMware',
    description:
      'Spearheaded strategic initiatives within Aria Operations for Networks. Alongside delivering designs for key sections, took on the added responsibility of guiding the design direction for fellow designers.',
  },
  {
    date: 'Jan16-Apr22',
    title: 'Lead Product Designer, BMC Helix',
    description:
      'Led UX for Business Workflows - enterprise workflow automation. Designed Innovation Suite, an extensible low-code platform for building ITSM products. Owned design across Innovation Labs (IoT, DataOps), taking multiple 0-to-1 products from research to launch.',
  },
  {
    date: 'Apr13-Dec15',
    title: 'UX Lead Clarice/Globant',
    description:
      "Designed critical enterprise products and led the team's design output. Aligned designers, engineering, customers, and executives around buildable, shippable UX.",
  },
  {
    date: 'Apr12-Feb13',
    title: 'UX Lead, Hcentive/Optum',
    description:
      'Led a cross-functional team (interaction, visual, front-end) designing a Health Insurance Exchange (HIX) portal for public and private markets.',
  },
  {
    date: 'Earlier',
    title: 'Design Consultant Texity/Qualcomm ...',
    description:
      'Earlier, Design Consultant, Texity / Qualcomm (2008-2011) and Product Designer, Mangospring (2006-2008) - Research-driven design of enterprise and startup products, concept through ship.',
  },
]

const education = [
  { date: '2004-06', title: 'Information & Digital Design, NID Ahmedabad' },
  { date: '2000-04', title: 'Elex & TC. Engineering, OIST Bhopal' },
]

const domains = ['CRM', 'Analytics', 'Multicloud', 'ITSM', 'Storage', 'Healthcare']

const competencies = [
  'Design Strategy',
  'Interaction Design',
  'AI Product Design',
  'Visual Design',
  'UI Design',
  'Data Visualisation',
]

const competenciesCont = [
  'Service Design',
  'Storytelling',
  'Information Architecture',
  'Task Analysis',
  'Accessibility',
  'Usability Testing',
]

function Timeline({ heading, items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="px-6 py-16 sm:px-10">
      <div className="border-t border-black" />
      <div className="pt-[8px] sm:pt-[16px]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[10rem_1fr] sm:gap-10">
          <RevealLines as="h2" className="text-3xl font-medium tracking-tight text-black sm:text-4xl">
            {heading}
          </RevealLines>

          <div className="divide-y divide-black sm:ml-auto sm:w-[85%]">
            {items.map((item, i) => {
              const isOpen = openIndex === i
              const expandable = Boolean(item.description)
              const titleSpan = (
                <RevealLines
                  as="span"
                  delay={80 + i * 80}
                  className="sm:translate-x-[20px] text-lg font-medium tracking-tight text-black sm:col-start-2 sm:text-2xl"
                >
                  {item.title}
                </RevealLines>
              )
              const icon = (
                <img
                  src={iconPlus}
                  alt=""
                  className={`mt-1 size-6 shrink-0 transition-transform sm:col-start-3 sm:mt-0 ${isOpen ? 'rotate-45' : ''}`}
                />
              )

              return (
                <Reveal
                  key={item.title}
                  as="div"
                  duration={700}
                  delay={80 + i * 80}
                  className="pt-3 pb-4 first:pt-0 sm:grid sm:grid-cols-[8rem_1fr_1.5rem] sm:items-center sm:gap-4"
                >
                  <span className="text-sm text-black/60">{item.date}</span>
                  {expandable ? (
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-start justify-between gap-4 text-left sm:contents"
                    >
                      {titleSpan}
                      {icon}
                    </button>
                  ) : (
                    <div className="flex w-full items-start justify-between gap-4 sm:contents">
                      {titleSpan}
                      {icon}
                    </div>
                  )}
                  {expandable && (
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-in-out sm:col-start-2 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    >
                      <div className="overflow-hidden">
                        <RevealLines
                          as="p"
                          className="mt-3 sm:translate-x-[20px] text-base leading-snug text-black/70"
                        >
                          {item.description}
                        </RevealLines>
                      </div>
                    </div>
                  )}
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function TagColumn({ heading, items, delay, className = '' }) {
  return (
    <Reveal duration={700} delay={delay} className={className}>
      <RevealLines as="h3" className="text-sm font-normal tracking-tight text-black">
        {heading || ' '}
      </RevealLines>
      <ul className="mt-4 space-y-2 text-base leading-snug text-black">
        {items.map((item, i) => (
          <RevealLines as="li" key={item} delay={60 + i * 40}>
            {item}
          </RevealLines>
        ))}
      </ul>
    </Reveal>
  )
}

export default function Resume() {
  return (
    <main>
      <section className="px-6 pt-25 pb-20 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-[3fr_5fr] sm:items-end">
          <div className="flex items-end gap-6">
            <RevealLines
              as="h1"
              className="whitespace-nowrap text-[42px] font-medium leading-none tracking-tight text-black sm:text-[clamp(1.75rem,4.3vw,4.5rem)]"
            >
              Resume
            </RevealLines>
            <Reveal
              as="a"
              href={mediaUrl('Resume-Avinash.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              delay={80}
              className="mb-1 inline-block rounded-full border border-black px-6 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
            >
              Download PDF
            </Reveal>
          </div>

          <RevealLines
            delay={160}
            justify
            className="text-justify text-base font-normal leading-snug text-[#8a8a8a] sm:text-lg"
          >
            Seasoned product designer working in enterprise SaaS - ITSM, workflow automation,
            AI, and platforms. NID-trained, still close to the craft: I set design direction,
            raise the bar for other designers, and turn future vision into shipped products. At
            Salesforce that means AI-driven feedback intelligence for Service Cloud; at BMC it
            meant Innovation Suite, a platform for building ITSM products. Different companies,
            same instinct - see where the product is headed, and take it there.
          </RevealLines>
        </div>
      </section>

      <Timeline heading="Experience" items={experience} />
      <Timeline heading="Education" items={education} />

      <section className="px-6 py-16 sm:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[10rem_1fr] sm:gap-10">
          <div />
          <div className="grid grid-cols-1 gap-8 sm:ml-auto sm:w-[85%] sm:grid-cols-[8rem_1fr] sm:gap-4">
            <TagColumn heading="Domains" items={domains} delay={0} />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <TagColumn
                heading="Competencies"
                items={competencies}
                delay={80}
                className="sm:translate-x-[20px]"
              />
              <TagColumn
                heading=""
                items={competenciesCont}
                delay={160}
                className="sm:-translate-x-[260px]"
              />
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  )
}
