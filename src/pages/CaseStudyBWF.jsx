import { useState } from 'react'
import { Link } from 'react-router-dom'
import CTA from '../components/CTA'
import Reveal from '../components/Reveal'
import RevealLines from '../components/RevealLines'
import useInView from '../hooks/useInView'
import { mediaUrl } from '../utils/mediaUrl'
import heroImg from '../assets/images/case-study-bwf/hero.png'
import understandImg from '../assets/images/case-study-bwf/understand.png'
import entityRelationshipsImg from '../assets/images/case-study-bwf/entity-relationships.png'
import researchImg from '../assets/images/case-study-bwf/research.png'
import patternProfileCardsImg from '../assets/images/case-study-bwf/pattern-profile-cards.png'
import patternProgressiveDisclosureImg from '../assets/images/case-study-bwf/pattern-progressive-disclosure.png'
import patternActivityTrailImg from '../assets/images/case-study-bwf/pattern-activity-trail.png'
import patternTaskFlowsImg from '../assets/images/case-study-bwf/pattern-task-flows.png'
import patternInviteToChatImg from '../assets/images/case-study-bwf/pattern-invite-to-chat.png'
import liveChatImg from '../assets/images/case-study-bwf/live-chat.png'
import caseRedesignImg from '../assets/images/case-study-bwf/case-redesign.png'
import searchInteractionsImg from '../assets/images/case-study-bwf/search-interactions.png'
import monitoringDashboardImg from '../assets/images/case-study-bwf/monitoring-dashboard.png'

const iconPlus = mediaUrl('images/icon-plus.svg')

const scenarioExamples = [
  {
    title: 'New Hire Onboarding',
    description: 'Multiple teams, sequential/parallel Tasks, One overarching goal',
  },
  { title: 'Spot Bonus Request', description: 'Approval Process going through company policies' },
  {
    title: 'Maternity Leave',
    description: 'Not only leave but guiding Employee through new chapter of life',
  },
  { title: 'Visa Letter Request', description: 'Business Travel and processes attached' },
]

const personas = [
  {
    label: 'Case Agent',
    title: 'Create, Manage and Resolve Cases',
    description:
      'The frontline role, and the one the interface is built around. Agents open cases for employee requests, work them through to resolution, and keep the knowledge base current so the next identical request costs less than the last. Most of their day is spent inside a single case, moving between the requester, the tasks that resolve it, and the trail of what has already happened. Every pattern further down this page - profile cards, progressive disclosure, task flows - exists to reduce how much of that case they have to hold in their head at once.',
  },
  {
    label: 'Case Manager',
    title: 'Manage team of Agents and act as a escalation point',
    description:
      'A case manager runs a team of agents and is the escalation point when a case stalls or an internal customer pushes back. They can do everything an agent can, but spend their time one level up: reading reports on team performance, queue health, and how well the knowledge base is holding up. The monitoring dashboard at the end of this case study is theirs, and it is built to answer what needs attention now rather than what happened last quarter.',
  },
  {
    label: 'Business Analyst',
    title: 'Configure Application based upon business requirements',
    description:
      'The analyst configures the product rather than using it to serve customers. They set up each line of business - HR, Facilities, Legal, Travel - and define the case templates, task flows, assignment rules and notifications that make the same request behave differently in one department than another. They sit between business owners, process owners and support teams, so the configuration surface has to stay legible to someone who is not an engineer. Every field added here multiplies across every case an agent later opens, which is what made the entity relationships worth mapping first.',
  },
]

const keyInteractions = [
  { title: 'Create/Update Case', description: 'Teams centre of attention feature' },
  { title: 'Live Chat', description: 'High value interactions with live customers' },
  { title: 'Collaboration', description: 'Various profiles come to picture to resolve cases' },
  { title: 'Team Productivity', description: 'Case Manager’s biggest task and challenge' },
]

const designDirections = [
  {
    title: 'Expanding Ecosystem',
    description: 'More Activities > More Tasks > More Relationships > More fields',
  },
  { title: 'Competition', description: 'Catching up with ServiceNow and Others.' },
  { title: 'Platform Constraints', description: 'Dependencies, Priorities and Outcomes' },
  { title: 'Shared Interactions', description: 'Live Chat was central to both ITSM and BWF' },
]

const roadblocks = [
  {
    label: 'New Pattern',
    title: 'New Interaction patterns for the Product/Company',
    description:
      'Created and evolved new interaction patterns for the product, including Card States, Progressive Disclosure, Activity Trail enhancements, and end-to-end Task Flows. Defined interaction behaviors, states, and edge cases to create consistent and intuitive experiences across different product scenarios. Collaborated closely with front-end developers throughout the design and implementation process to ensure these patterns were technically feasible, consistently implemented, and compliant with accessibility standards. Worked through design and development iterations to address usability, responsiveness, keyboard navigation, focus states, and other accessibility considerations, helping establish scalable interaction patterns that could be reused across the product.',
  },
  {
    label: 'User Research',
    title: 'Moderated User Research for Live Chat and others',
    description:
      'Moderated sessions with HR specialists, chat agents and their leads, on-site and remote, across BMC teams and customer organisations. One finding shaped the design above all: completing and editing tickets consumed an estimated thirty percent of an agent’s working time, which is what made templates, progressive disclosure and faster editing worth building.',
  },
  {
    label: 'Design Strategy',
    title: 'Strategic Initiatives like UX 20/80 for product direction',
    description:
      'UX 20/80 targeted the fifth of the application’s interactions that account for four fifths of its use. The work ran as a loop: identify the key screens and interactions, zoom out to flow level so the whole journey is streamlined rather than a single screen, surface the pain points along it, improve the experience, then validate and iterate.',
  },
]

const outcomes = [
  {
    title: 'UX 20/80 Direction',
    description: 'The highest-use interactions got design focus first, setting product direction',
  },
  {
    title: 'Case Manager Productivity',
    description: 'Clearer view of team workload for case managers',
  },
  {
    title: 'Less Context Switching',
    description: 'Requester context sits beside the chat, so no more tab switching',
  },
  {
    title: 'Research-backed Decisions',
    description: 'Moderated research shaped the chat and case interactions before build',
  },
]

const platformNodes = [
  'Omnichannel',
  'Business Workflows',
  'ITSM',
  'Knowledge Mgt.',
  'Reporting',
  'Self Service',
  'CSP',
  'Digital Workplace',
]

const interactionPatterns = [
  { label: 'Profile Cards', src: patternProfileCardsImg, alt: 'Profile card states, one leading to the next' },
  {
    label: 'Progressive Disclosure',
    src: patternProgressiveDisclosureImg,
    alt: 'A collapsed row expanding to reveal its detail',
  },
  {
    label: 'Activity Trail',
    src: patternActivityTrailImg,
    alt: 'Chronological activity trail on a case',
    // Shrunk within its own column so the other two patterns keep their size.
    imgClass: 'sm:w-[90%]',
  },
]

function Section({ heading, headingClassName = '', children }) {
  return (
    <section className="px-6 pt-16 pb-[104px] sm:px-10">
      <div className="border-t border-black" />
      <div className="pt-[8px] sm:pt-[16px]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[10rem_1fr] sm:gap-10">
          <RevealLines
            as="h2"
            className={`text-3xl font-medium tracking-tight text-black sm:text-4xl ${headingClassName}`}
          >
            {heading}
          </RevealLines>
          <div className="sm:ml-auto sm:w-[85%]">{children}</div>
        </div>
      </div>
    </section>
  )
}

function LabelledRows({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="divide-y divide-black">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <Reveal
            key={item.title}
            as="div"
            duration={700}
            delay={80 + i * 80}
            className="py-4 first:pt-0 last:pb-0 sm:grid sm:grid-cols-[8rem_1fr_1.5rem] sm:items-start sm:gap-4"
          >
            {/* Below sm the row is not a grid, so the button stacks label over title
                and the icon is pinned top-right (pr-8 reserves its space). At sm the
                button becomes `contents` and all three drop into the grid columns. */}
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="relative flex w-full flex-col items-start pr-8 text-left sm:contents"
            >
              <RevealLines
                as="span"
                delay={80 + i * 80}
                className="block text-sm text-black/60 sm:pt-1"
              >
                {item.label}
              </RevealLines>
              <RevealLines
                as="span"
                delay={110 + i * 80}
                className="mt-1 block text-lg font-normal tracking-tight text-black sm:mt-0 sm:pl-[30px] sm:text-2xl"
              >
                {item.title}
              </RevealLines>
              <img
                src={iconPlus}
                alt=""
                className={`absolute right-0 top-0 size-6 shrink-0 transition-transform sm:static sm:col-start-3 ${isOpen ? 'rotate-45' : ''}`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out sm:col-start-2 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <RevealLines
                  as="p"
                  className="mt-3 text-base leading-snug text-black/70 sm:pl-[30px]"
                >
                  {item.description}
                </RevealLines>
              </div>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}

function CardGrid({ heading, items, headingClassName = '' }) {
  return (
    <section className="px-6 pt-16 pb-[104px] sm:px-10">
      <RevealLines
        as="h2"
        className={`text-xl font-medium tracking-tight text-black sm:text-2xl ${headingClassName}`}
      >
        {heading}
      </RevealLines>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal
            key={item.title}
            as="div"
            duration={700}
            delay={80 + i * 60}
            className="relative flex min-h-[220px] flex-col justify-between rounded-xl border border-black p-6"
          >
            <RevealLines as="h3" delay={140 + i * 60} className="text-xl font-medium tracking-tight text-black">
              {item.title}
            </RevealLines>
            <RevealLines as="p" delay={190 + i * 60} className="text-sm leading-snug text-black/60">
              {item.description}
            </RevealLines>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// DRAFT COPY - these notes are placeholders written from what each screenshot
// shows. Replace with your own account before publishing.
function SectionNote({ children, delay = 220 }) {
  return (
    <RevealLines
      as="p"
      delay={delay}
      justify
      className="mt-6 text-justify text-base font-normal leading-snug text-[#8a8a8a] sm:text-lg"
    >
      {children}
    </RevealLines>
  )
}

// `bordered` off for diagrams that already sit on white and read better without
// a frame around them.
function SectionImage({ src, alt, delay = 160, className = '', bordered = true, rounded = true }) {
  const frame = bordered
    ? 'border border-black/10 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)]'
    : ''
  return (
    <Reveal
      duration={700}
      delay={delay}
      className={`overflow-hidden ${rounded ? 'rounded-lg' : ''} ${frame} ${className}`}
    >
      <img src={src} alt={alt} className="h-auto w-full" />
    </Reveal>
  )
}

// The design lays the platform out as loosely placed pills joined by lines. Rendered
// as a ring around the centre node instead: the same relationships, but a layout that
// survives being resized, matching the CSI ecosystem diagram.
function PlatformEcosystem() {
  const radius = 42
  return (
    <section className="px-6 pt-16 pb-[104px] sm:px-10">
      <div className="border-t border-black" />
      <div className="pt-[8px] sm:pt-[16px]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[10rem_1fr] sm:gap-10">
          <RevealLines as="h2" className="text-3xl font-medium tracking-tight text-black sm:text-4xl">
            Platform App Ecosystem
          </RevealLines>

          <Reveal
            duration={700}
            delay={80}
            className="relative mx-auto mt-10 aspect-square w-full max-w-[520px] sm:ml-auto sm:w-[85%]"
          >
            <svg
              className="absolute inset-0 size-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {platformNodes.map((node, i) => {
                const angle = (i / platformNodes.length) * 2 * Math.PI - Math.PI / 2
                return (
                  <line
                    key={node}
                    x1="50"
                    y1="50"
                    x2={50 + radius * Math.cos(angle)}
                    y2={50 + radius * Math.sin(angle)}
                    stroke="black"
                    strokeWidth="0.4"
                    strokeDasharray="2.5 2.5"
                    vectorEffect="non-scaling-stroke"
                  />
                )
              })}
            </svg>

            {/* Same pill as the surrounding nodes, a size up, rather than a circle. */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-black bg-white px-6 py-3 text-base font-medium tracking-tight text-black sm:text-lg">
              Platform
            </div>
            {platformNodes.map((node, i) => {
              const angle = (i / platformNodes.length) * 2 * Math.PI - Math.PI / 2
              return (
                <div
                  key={node}
                  className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-black bg-white px-4 py-2 text-sm font-medium tracking-tight text-black sm:text-base"
                  style={{
                    left: `${50 + radius * Math.cos(angle)}%`,
                    top: `${50 + radius * Math.sin(angle)}%`,
                  }}
                >
                  {node}
                </div>
              )
            })}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function CaseStudyBWF() {
  const [lineRef, lineInView] = useInView()

  return (
    <main>
      <section className="px-6 pt-5 pb-[120px] sm:px-10">
        <div className="flex items-center gap-1 text-sm text-black">
          <RevealLines as={Link} to="/work" className="underline decoration-from-font underline-offset-2">
            Work
          </RevealLines>
          <span> / </span>
          <RevealLines as="span" delay={40} className="text-black/40">
            Business Workflows
          </RevealLines>
        </div>

        <div className="mt-10 grid gap-10 pt-10 pb-20 sm:grid-cols-[3fr_5fr] sm:items-end">
          <RevealLines
            as="h1"
            delay={80}
            className="text-[42px] font-medium leading-[1.05] tracking-tight text-black sm:text-[56px]"
          >
            Business Workflows
          </RevealLines>
          <RevealLines
            as="p"
            delay={160}
            justify
            className="text-justify text-base font-normal leading-snug text-[#8a8a8a] sm:text-lg"
          >
            Business Workflows (BWF) is a service management solution designed to help service
            delivery owners across all lines of business (LOBs) - such as HR, Facilities, and
            Procurement - manage, automate, and scale their service delivery to achieve peak
            operational efficiency. By breaking down traditional silos, BWF transforms enterprise
            service delivery into an employee-centric, multi-channel experience. It empowers
            organizations to eliminate manual tracking, streamline knowledge sharing, and unleash
            workforce productivity.
          </RevealLines>
        </div>

        <div className="mt-16 flex flex-col items-center">
          <div className="relative w-full">
            {/* 907/516 is derived from this screenshot's 1.75 aspect ratio:
                bezel + (width - 2*bezel) / 1.75, so the image's bottom edge lands flush
                with the divider. Re-derive it if the hero image is ever swapped. */}
            <Reveal
              duration={700}
              delay={240}
              className="relative mx-auto aspect-[907/516] w-[70%] overflow-hidden rounded-t-3xl"
            >
              <div className="absolute inset-x-0 top-0 aspect-[907/644] w-full overflow-hidden rounded-3xl border-2 border-white/50 bg-black p-[1.7641%] shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.1)]">
                <div className="size-full overflow-hidden rounded-lg bg-white">
                  <img
                    src={heroImg}
                    alt="Business Workflows case management dashboard"
                    className="size-full object-contain object-top"
                  />
                </div>
              </div>
            </Reveal>

            <div
              ref={lineRef}
              className="hero-divider absolute inset-x-0 bottom-0 mx-auto h-px bg-black"
              style={{ width: lineInView ? '100%' : '70%' }}
            />
          </div>
        </div>
      </section>

      <Section heading="The Problem" headingClassName="whitespace-nowrap">
        <RevealLines
          as="p"
          delay={80}
          bold={3}
          className="text-lg font-normal tracking-tight text-black sm:text-2xl"
        >
          “How might we empower lines of business (LOBs) like HR and Procurement to scale service
          delivery and streamline operations so that we can eliminate heavy manual tracking,
          fragmented knowledge sharing, and adoption barriers, thereby reducing support team
          administrative overhead through unified automation?”
        </RevealLines>
      </Section>

      <CardGrid heading="Scenario Examples" items={scenarioExamples} />

      <Section heading="Persona">
        <LabelledRows items={personas} />
      </Section>

      <CardGrid heading="Key Interactions" items={keyInteractions} />

      <PlatformEcosystem />

      <Section heading="Understand">
        <SectionImage src={understandImg} alt="Service request journey mapped end to end" />
        <SectionNote>
          This was not a blank page. The product already existed, so the work began with reading:
          the interfaces that had accumulated over releases, the documentation behind them, and
          the decisions already made. Understanding it meant coming at the product from several
          directions at once - how an agent works a case, how an analyst configures one, what
          engineering had already committed to - and building the relationships that make those
          answers available later.
        </SectionNote>
      </Section>

      <CardGrid heading="Design Directions" items={designDirections} />

      <Section heading="Entity Relationships">
        <SectionImage
          src={entityRelationshipsImg}
          alt="How a case relates to tasks, activities and related records"
          bordered={false}
          className="sm:w-[78%]"
        />
        <SectionNote>
          A case is not one record but a hub: people, details, tasks, resources, access and
          activity all hang off it, and each of those branches again. Mapping every relationship
          first made it clear which fields had to be visible on the case itself and which could be
          deferred, which is the decision the rest of this work rests on.
        </SectionNote>
      </Section>

      <Section heading="Research">
        <SectionImage src={researchImg} alt="Research findings synthesised from agent interviews" />
        <SectionNote>
          Sessions were synthesised into an experience map covering what agents do, feel and think
          at each stage of a request, from assignment through clarification to resolution. Laying
          it out this way located the friction in time rather than by feature, which is how the
          ticket completion problem surfaced as the one worth solving first.
        </SectionNote>
      </Section>

      <Section heading="Interaction Patterns">
        <div className="flex flex-col gap-8">
          {/* fr ratios mirror the Figma widths so the patterns keep their relative scale. */}
          <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-[168fr_345fr_353fr]">
            {interactionPatterns.map((p, i) => (
              <div key={p.label}>
                <RevealLines
                  as="h3"
                  delay={80 + i * 60}
                  className="mb-3 text-sm font-normal tracking-tight text-black/60"
                >
                  {p.label}
                </RevealLines>
                <SectionImage
                  src={p.src}
                  alt={p.alt}
                  delay={120 + i * 60}
                  bordered={false}
                  rounded={false}
                  className={p.imgClass ?? ''}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-[247fr_234fr]">
            <div>
              <RevealLines as="h3" delay={260} className="mb-3 text-sm font-normal tracking-tight text-black/60">
                Task Flows
              </RevealLines>
              <SectionImage
                src={patternTaskFlowsImg}
                alt="Task flow states across a case lifecycle"
                delay={300}
                bordered={false}
                rounded={false}
              />
            </div>
            <div>
              <RevealLines as="h3" delay={320} className="mb-3 text-sm font-normal tracking-tight text-black/60">
                Invite to Chat
              </RevealLines>
              <SectionImage
                src={patternInviteToChatImg}
                alt="Invite to chat dialog with per-agent role selection"
                delay={360}
                bordered={false}
                rounded={false}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section heading="Roadblocks Cleared">
        <LabelledRows items={roadblocks} />
      </Section>

      <Section heading="Live Chat">
        <SectionImage src={liveChatImg} alt="Live chat alongside the customer profile" />
        <SectionNote>
          Live Chat was critical enough to start from user research, and varied enough to span
          products like ITSM, BWF and others. The agent's needs stayed the same, but each product
          brought its own context window, dependencies and timeline. The work was to hold one
          interaction steady while the context around it kept changing.
        </SectionNote>
      </Section>

      <Section heading="Case Redesign">
        <SectionImage src={caseRedesignImg} alt="The redesigned case view" />
        <SectionNote>
          The redesigned case groups what an agent needs to read from what they need to act on:
          summary and categorisation up top, people and tasks in the body, activity down the right.
          Progressive disclosure keeps the long tail of fields reachable without making every case
          look as complex as the most complex one.
        </SectionNote>
      </Section>

      <Section heading="Search Interactions">
        <SectionImage src={searchInteractionsImg} alt="Search results with an inline case preview" />
        <SectionNote>
          Search returns cases, tasks, knowledge articles and templates in a single result list,
          with a full preview beside it. An agent can confirm they have the right record before
          opening it, which matters when the answer is more often a knowledge article than a case.
        </SectionNote>
      </Section>

      <Section heading="Monitoring Dashboard">
        <SectionImage src={monitoringDashboardImg} alt="Agent monitoring dashboard" />
        <SectionNote>
          The supervisor view puts queue health across the top, agent by agent load below it, and
          chat volume and session time as charts alongside. It is built to answer who needs help
          right now rather than what happened last week.
        </SectionNote>
      </Section>

      <CardGrid heading="Outcomes" items={outcomes} />

      <CTA />
    </main>
  )
}
