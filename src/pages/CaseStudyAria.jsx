import { useState } from 'react'
import { Link } from 'react-router-dom'
import Carousel from '../components/Carousel'
import CTA from '../components/CTA'
import Reveal from '../components/Reveal'
import RevealLines from '../components/RevealLines'
import useInView from '../hooks/useInView'
import { mediaUrl } from '../utils/mediaUrl'

const iconPlus = mediaUrl('images/icon-plus.svg')
const heroImg = mediaUrl('images/case-study-aria/hero.png')
const earlyConceptsImg = mediaUrl('images/case-study-aria/early-concepts.png')
const navigationSubImg = mediaUrl('images/case-study-aria/navigation-sub.png')
const iconographyFlowImg = mediaUrl('images/case-study-aria/iconography-flow.png')
const iconographyGridImg = mediaUrl('images/case-study-aria/iconography-grid.png')
const widgetTabsImg = mediaUrl('images/case-study-aria/widget-tabs-large.png')
const widgetTopActionsImg = mediaUrl('images/case-study-aria/widget-top-actions.png')
const widgetHealthImg = mediaUrl('images/case-study-aria/widget-health-small.png')
const widgetAlertsImg = mediaUrl('images/case-study-aria/widget-alerts-wide.png')

const finalInteractionSlides = [
  {
    src: mediaUrl('images/case-study-aria/final-1-template-empty.png'),
    alt: 'Empty dashboard template ready for widgets',
  },
  {
    src: mediaUrl('images/case-study-aria/final-2-widget-picker.png'),
    alt: 'Suggested widgets panel open beside the dashboard',
  },
  {
    src: mediaUrl('images/case-study-aria/final-3-widget-added.png'),
    alt: 'Dashboard after a widget has been added',
  },
  {
    src: mediaUrl('images/case-study-aria/final-4-metrics-menu.png'),
    alt: 'Metrics menu open, listing the metric widgets available to add',
  },
]

const scenarios = [
  {
    label: 'Complete Picture',
    title: 'Break the silos and create complete picture of ecosystem',
    description:
      'Any widget on any page can be pinned to a dashboard, so one surface presents information from multiple sources in real time rather than forcing an admin to pivot between entity pages to assemble context. A single dashboard can hold flows, alerts, topology and metrics side by side, with each widget still tied back to the entity it came from.',
  },
  {
    label: 'Flexibility',
    title: 'Flexibility to create Persona based dashboards',
    description:
      'Every user builds their own dashboards and shares them with individual users or groups from LDAP, AD or vIDM, with either view or view-and-edit rights. A network admin’s troubleshooting view and an application owner’s service view can coexist instead of competing for space in one fixed layout, and a dashboard that works can be duplicated as a starting point rather than rebuilt.',
  },
  {
    label: 'Search Interactions',
    title: 'Leverage Search Interactions to add specific widgets',
    description:
      'Widgets are found in a searchable Suggested Widgets panel and placed by dragging onto the grid or with a single Add click. Once placed they can be rearranged by drag and their positions persist, with Reset all returning the dashboard to its last saved state.',
  },
]

const personas = [
  {
    label: 'Cloud Admin',
    title: 'Provide Cloud Infrastructure to Application teams',
    description:
      'Owns the capacity and configuration that application teams build on, spanning on-premises, VMC and public cloud. Their dashboard leans on inventory and change — hosts and VMs discovered, applications migrated, intent violations to configure — so the infrastructure handed over is known to be sound.',
  },
  {
    label: 'Network Admin',
    title: 'Troubleshoot Network Performance and Connectivity Issues',
    description:
      'Works from alerts and flows to isolate where a problem actually sits, pivoting from a VM to the host, switch or firewall rule behind it. A troubleshooting dashboard keeps the network map, flow volumes and critical alerts on one surface, with a time range that can be wound back to the moment the issue started.',
  },
  {
    label: 'Application Admin',
    title: 'Manage, Maintain and Oversee Applications for the Org',
    description:
      'Accountable for applications rather than the infrastructure beneath them, so what matters is which tiers talk to each other and what breaks when one of them moves. Their view centres on application topology, member VMs and unprotected flows, with micro-segmentation planning as the route from discovery to policy.',
  },
]

const keyChallenges = [
  { title: 'Add/Remove Metrics', description: 'Varied information Metrics needed to be stitched' },
  { title: 'IA and Navigation', description: 'Categories and Sub-Categories navigation' },
  { title: 'Search and Select', description: 'Search Interactions to bring specific Metrics to dashboard.' },
  {
    title: 'Metric Identifiers',
    description: 'What would be the best Identifier for a Metric to create dashboard?',
  },
]

const roadblocks = [
  {
    label: 'New Pattern',
    title: 'New Interaction Pattern for the Company',
    description:
      'The design system had no pattern for assembling a page out of widgets, so the grid, the size variants, edit-versus-view mode and the empty states all had to be defined rather than borrowed. It also had to absorb the pinboards customers had already built, so migration shaped the design as much as the new interaction did.',
  },
  {
    label: 'Iconography',
    title: 'Created numerous icons for available entities',
    description:
      'The product discovers dozens of entity types across NSX, VMC, public cloud and Kubernetes, and each needed a mark that stayed legible in a topology map, a widget thumbnail and a list row alike. No existing set covered network entities at that granularity, so they were drawn to one grid and stroke weight and tested at the smallest size they would ever appear.',
  },
  {
    label: 'Stakeholder Mgt.',
    title: 'Lot of presentations to convince value',
    description:
      'Dashboard customisation is platform work: costly to build, easy to defer, and hard to argue for against features with a customer name attached. Making the case took repeated demos to product, engineering and field teams, using prototypes rather than slides so the value was something people could try rather than imagine.',
  },
]

const outcomes = [
  {
    title: 'Concept Validated',
    description: 'Design partners confirmed search-to-add removed the biggest setup friction',
  },
  {
    title: 'New Pattern',
    description: 'The widget grid and thumbnail model were reused by other Aria surfaces',
  },
  {
    title: 'Entity Iconography',
    description: 'Entity icons and widget sizes folded into the product’s shared library',
  },
  {
    title: 'Self-serve Setup',
    description:
      'Admins could build a dashboard unaided, without professional-services involvement',
  },
]

// Section shell shared by every band below the hero: a full-width rule, the
// heading in a fixed left column, and the content in the right 85%.
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

// label + title rows with an expand toggle, matching the CSI case study.
// A row opens to reveal `description`; the `+` rotates to an x while open.
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
                className="mt-1 block text-lg font-normal tracking-tight text-black sm:mt-0 sm:translate-x-[30px] sm:text-2xl"
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
                  className="mt-3 text-base leading-snug text-black/70 sm:translate-x-[30px]"
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
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-4">
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

function SectionImage({ src, alt, delay = 160, className = '' }) {
  return (
    <Reveal
      duration={700}
      delay={delay}
      className={`overflow-hidden rounded-lg border border-black/10 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)] ${className}`}
    >
      <img src={src} alt={alt} className="h-auto w-full" />
    </Reveal>
  )
}

export default function CaseStudyAria() {
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
            Aria Operations for Networks
          </RevealLines>
        </div>

        <div className="mt-10 grid gap-10 pt-10 pb-20 sm:grid-cols-[3fr_5fr] sm:items-end">
          <RevealLines
            as="h1"
            delay={80}
            className="text-[42px] font-medium leading-[1.05] tracking-tight text-black sm:text-[56px]"
          >
            Aria Operations for Networks
          </RevealLines>
          <RevealLines
            as="p"
            delay={160}
            justify
            className="text-justify text-base font-normal leading-snug text-[#8a8a8a] sm:text-lg"
          >
            VMware Aria Operations for Networks provides intelligent, unified operations for complex
            software-defined networking and security fabrics. From a UX standpoint, the challenge
            lies in translating multi-cloud telemetry into intuitive visualizations. By simplifying
            network dependencies and security topologies, the platform empowers enterprise teams to
            architect an optimized, highly available, and resilient multi-cloud infrastructure
            without cognitive overload.
          </RevealLines>
        </div>

        <div className="mt-16 flex flex-col items-center">
          <div className="relative w-full">
            {/* Peek window: clips the iPad so only its screen shows, cut off at the rule below.
                907/542 is derived from this screenshot's 1.663 aspect ratio —
                bezel + (width - 2*bezel) / 1.663 — so the image's bottom edge lands flush
                with the divider. Re-derive it if the hero image is ever swapped. */}
            <Reveal
              duration={700}
              delay={240}
              className="relative mx-auto aspect-[907/542] w-[70%] overflow-hidden rounded-t-3xl"
            >
              {/* Percentage padding for the bezel so it keeps the same share of the
                  frame at every viewport; a fixed px value shrinks the screen on phones. */}
              <div className="absolute inset-x-0 top-0 aspect-[907/644] w-full overflow-hidden rounded-3xl border-2 border-white/50 bg-black p-[1.7641%] shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.1)]">
                <div className="size-full overflow-hidden rounded-lg bg-white">
                  <img
                    src={heroImg}
                    alt="Aria Operations for Networks dashboard"
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
          “How might we enable infrastructure administrators to seamlessly curate and synthesize
          disjointed entity views so that they can easily customize multi-entity dashboards and
          monitor complex, interdependent data center relationships (such as virtual machines and
          their underlying hosts) without cognitive overload?”
        </RevealLines>
      </Section>

      <Section heading="Scenarios">
        <LabelledRows items={scenarios} />
      </Section>

      <Section heading="Persona">
        <LabelledRows items={personas} />
      </Section>

      <CardGrid heading="Key Challenges" items={keyChallenges} headingClassName="whitespace-nowrap" />

      <Section heading="Early Concepts">
        <SectionImage src={earlyConceptsImg} alt="Early concept explorations for dashboard customization" />
      </Section>

      <Section heading="Thumbnail Visibility">
        <div className="flex flex-col gap-4">
          {/* Widget sizes kept in their design proportions: the fr ratios mirror the
              Figma widths so the size relationships the section is about survive. */}
          {/* 70% width = the pair rendered 30% smaller, scaled together so the
              size relationship between the two widgets is preserved. */}
          <div className="grid grid-cols-1 items-start gap-4 sm:w-[70%] sm:grid-cols-[654fr_208fr]">
            <SectionImage src={widgetTabsImg} alt="Large tabbed traffic distribution widget" delay={120} />
            <SectionImage src={widgetTopActionsImg} alt="Narrow top actions widget" delay={180} />
          </div>
          <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-[239fr_624fr]">
            <SectionImage src={widgetHealthImg} alt="Small network health widget" delay={240} />
            <SectionImage src={widgetAlertsImg} alt="Wide alerts summary widget" delay={300} />
          </div>
        </div>
      </Section>

      <Section heading="The Turning Point">
        <RevealLines
          as="p"
          delay={80}
          className="text-lg font-normal tracking-tight text-black sm:text-2xl"
        >
          Widgets arrive in very different footprints — a tall tabbed table, a narrow column
          of actions, a squat health tile, a wide alerts strip. Previewing each as a thumbnail
          seemed the obvious move, but at that scale the shapes stopped reading as themselves
          and the set lost its visual consistency. Drag and drop made it worse: a widget
          filling a quarter of the grid and one spanning it whole cannot share the same drop
          affordance, so what a user picked up never matched the space it landed in. The
          catalogue had to become something you navigate and search, not something you scan.
        </RevealLines>
      </Section>

      <Section heading="Navigation/Sub">
        <SectionImage
          src={navigationSubImg}
          alt="Metric list panels showing category and sub-category navigation"
          className="sm:w-[70%]"
        />
      </Section>

      <Section heading="Iconography">
        <div className="flex flex-col gap-4">
          <SectionImage
            src={iconographyFlowImg}
            alt="How an entity visualization is reduced to an icon and then a widget card"
          />
          <SectionImage
            src={iconographyGridImg}
            alt="Icon set created for the available entities"
            delay={240}
          />
        </div>
      </Section>

      <Section heading="Final Interactions">
        <Carousel slides={finalInteractionSlides} label="Final dashboard editing interaction" />
      </Section>

      <Section heading="Roadblocks Cleared">
        <LabelledRows items={roadblocks} />
      </Section>

      <CardGrid heading="Outcomes" items={outcomes} />

      <CTA />
    </main>
  )
}
