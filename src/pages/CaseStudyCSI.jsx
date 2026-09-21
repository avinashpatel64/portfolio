import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import CTA from '../components/CTA'
import Reveal from '../components/Reveal'
import RevealLines from '../components/RevealLines'
import useInView from '../hooks/useInView'
import { isCaseStudyUnlocked } from '../utils/caseStudyAccess'
import { mediaUrl } from '../utils/mediaUrl'

const iconPlus = mediaUrl('images/icon-plus.svg')
const heroImg = mediaUrl('images/case-study-csi/hero.png')
const wireframesImg = mediaUrl('images/case-study-csi/wireframes.png')
const dashboardGroundedImg = mediaUrl('images/case-study-csi/dashboard-grounded.png')
const headlessDashboardImg = mediaUrl('images/case-study-csi/headless-dashboard.png')
const incidentRecordImg = mediaUrl('images/case-study-csi/incident-record.png')
const slackShareImg = mediaUrl('images/case-study-csi/slack-share.png')
const omniSupervisorImg = mediaUrl('images/case-study-csi/omni-supervisor.png')
const knowledgeAgentImg = mediaUrl('images/case-study-csi/knowledge-agent.png')
const lightningPanelImg = mediaUrl('images/case-study-csi/lightning-panel.png')
const copilot1Img = mediaUrl('images/case-study-csi/copilot-1.png')
const copilot2Img = mediaUrl('images/case-study-csi/copilot-2.png')
const customChannelsImg = mediaUrl('images/case-study-csi/custom-channels.png')
const rtiSupervisorImg = mediaUrl('images/case-study-csi/rti-supervisor.png')
const marketingHomeImg = mediaUrl('images/case-study-csi/marketing-home.png')
const userTestingImg = mediaUrl('images/case-study-csi/user-testing.png')
const eiFigjamImg = mediaUrl('images/case-study-csi/ei-figjam.png')
const promptImg = mediaUrl('images/case-study-csi/prompt.png')

// Served from object storage rather than bundled because this file exceeds
// Cloudflare Pages' per-file asset limit.
const csiPrototypeVideo = mediaUrl('videos/csi-prototype.mov')

const keyResponsibilities = [
  {
    label: 'AI Product Design',
    title: 'Deep-rooted design fundamentals boosted by AI',
    description: [
      'With the emergence of AI, I see an opportunity to amplify the strengths of human-centered design by combining user empathy, human judgment, and product strategy with AI’s ability to analyze, generate, automate, and accelerate. AI has expanded how I explore problems, evaluate possibilities, and move from insight to execution.',
      'My role has evolved from being a creator of experiences to a strategic orchestrator of product experiences—connecting user needs, business objectives, technology, and AI to shape products that are more useful, adaptive, efficient, and fundamentally human-centered.',
    ],
  },
  {
    label: 'Stakeholder Management',
    title: 'Managing Expectations driving product forward',
    description: [
      'As a seasoned Product Designer leading design across a complex product ecosystem, one of my key challenges—and opportunities—is aligning diverse stakeholder expectations. I collaborate closely with Leadership, Product Managers, Engineering, QA, and integrated teams to balance business objectives, user needs, technical constraints, and delivery timelines.',
      'This requires me to wear multiple hats throughout the product lifecycle—as a Facilitator, User Advocate, Collaborator, and Problem Solver—bringing teams together, creating alignment, and driving design decisions that move the product forward.',
    ],
  },
  {
    label: 'User Research',
    title: 'Follow the user and everything else will follow',
    description: [
      'I strongly believe in the principle, “Follow the user, and everything else will follow.” This belief drives me to stay close to users and ground design decisions in real-world insights through a mix of moderated and unmoderated research. Moderated studies include focused online or in-person conversations, while unmoderated studies help gather broader feedback through platforms like UserTesting.',
      'Beyond formal research, I leverage site visits, PACs, and customer connects to understand users in their real-world context, uncover unmet needs, validate assumptions, and identify opportunities. This continuous engagement helps ensure that design decisions are rooted in real user needs and behaviors rather than assumptions.',
    ],
  },
  {
    label: 'Vision',
    title: 'Defining the future, one step at a time',
    description: [
      'A Vision Demo is more than a showcase of a future product experience—it is a powerful mechanism for creating shared understanding, alignment, and momentum across an organization. As a Senior Designer, I have led and created more Vision Demos than anyone else on my team, using them to make complex ideas tangible and bring diverse stakeholders around a common direction.',
      'I use Vision Demos to visualize the future, challenge existing assumptions, connect cross-functional teams, and turn abstract product strategies into compelling experiences. Ultimately, they serve as a shared north star—helping the product ecosystem align on not just what we are building, but the experience and value we want to create.',
    ],
  },
]

const scenarios = [
  {
    label: 'Retention',
    title: 'Negative Sentiment in Recent Survey',
    description:
      'A subscription platform detects a customer’s usage drop, two unresolved tickets, and negative sentiment in a recent survey. The system flags high churn risk(Insights), triggers a success manager outreach with a tailored remediation plan(Slack Collaboration), and offers a temporary upgrade(Segmented Solution). This way customer’s usage rebounds and the renewal closes on time.',
  },
  {
    label: 'Personalisation',
    title: 'Targeted Experiences',
    description:
      'A retailer segments customers with high likelihood to buy athleisure based on browsing, past purchases, and affinities. The campaign delivers a dynamic homepage and email featuring new arrivals at the preferred price range.',
  },
  {
    label: 'Support',
    title: 'Increase in First Call Resolution',
    description:
      'A telecom provider uses AI to transcribe calls and score sentiment and intent. High-urgency outage calls route to a specialized queue with proactive status updates, while billing inquiries get automated guidance. First-contact resolution rises, average handle time drops, and CSAT improves.',
  },
]

const personas = [
  {
    label: 'Service Supervisor',
    title: 'Intraday Management, Evaluate Performance',
    description:
      'The Service Supervisor manages the day-to-day operations of agents, which involves monitoring conversations, adjusting queue allocations, and resolving escalations. Their primary focus areas are intraday management, evaluating performance, scheduling, and hiring. To accomplish their work, they utilize various tools such as Communication Tools (Teams), CRM (Salesforce), Scheduling Tools (Shiftboard), CCaaS Platforms (NICE), WFM/WEM Tools (Calabrio), and spreadsheets. Some of their key challenges include handling high staff churn, navigating a fragmented technology stack that requires pivoting across multiple tools, monitoring remote team adherence, and managing surges in contact volume without real-time analytics.',
  },
  {
    label: 'Customer Service Rep.',
    title: 'Proactive interaction with high Emotional Intelligence',
    description:
      'The customer support representative is a skilled and proactive communicator who displays high emotional intelligence and self-control when interacting with customers. As a dedicated team player, they actively collaborate with peers, share experiences, and carefully assign requests to the most appropriate agents. Their strong work management abilities allow them to effectively handle time, prioritize data, troubleshoot issues, and escalate cases when necessary. Furthermore, they possess solid business awareness, remaining resilient, adapting quickly to new situations, and maintaining a firm understanding of products, company news, and customer databases.',
  },
]

const highLevelFlow = [
  {
    title: 'Customer Interactions',
    description: 'Reviews, Surveys, Calls, Chats, social, Cases, Email etc',
    arrow: true,
  },
  {
    title: 'Data Analysis & Synthesis',
    description: 'Capabilities of data-cloud were leveraged here',
    arrow: true,
  },
  {
    title: 'Insights Generated',
    description: 'Insights were generated and presented in Dashboard',
    arrow: true,
  },
  { title: 'Actions taken', description: 'Actions like Create Case, Update Knowledge Article etc triggered' },
]

const ecosystemNodes = ['Slack', 'Data Cloud', 'Knowledge', 'Case', 'Incident', 'Omni', 'Tableau', 'Segments']

const actionFlows = [
  { label: 'Slack', title: 'Share specific Insights via Slack', image: slackShareImg, widthPercent: 70 },
  { label: 'Incident', title: 'Create Incident for widespread Issues', image: incidentRecordImg },
  { label: 'Agent Insights', title: 'Leading to statistics for Service Reps', image: omniSupervisorImg },
  { label: 'Knowledge', title: 'Leading to create/update Knowledge Articles', image: knowledgeAgentImg },
]

const dashboardOfFuture = [
  {
    label: 'Proactive',
    title: 'Anticipating and resolving problems before they impact users',
    description:
      'Designing not just for visibility, but for anticipation, prioritization, and action. For example, Imagine an airline operations team managing hundreds of flights across multiple airports. Instead of waiting for passengers to report missed connections, baggage delays, or flight disruptions, a proactive dashboard continuously brings together signals such as flight status, aircraft turnaround, crew availability, weather, baggage movement, connecting passengers, and airport constraints.',
  },
  {
    label: 'Actionable',
    title: 'Actionable Insights without leaving context',
    description:
      'Actionability turns insight into intervention. Collaboration turns intervention into coordinated resolution.The UX challenge is to move from information → insight → recommended action → execution.',
  },
  {
    label: 'Integrated',
    title: 'Integrated for end-to-end solution',
    description:
      'A proactive dashboard is only as effective as the data and systems it connects to. For example In an airline environment, critical information is typically distributed across multiple operational systems—flight operations, crew management, baggage, passenger services, airport systems, maintenance, weather, and customer communication.',
  },
]

const aiUsage = [
  { title: 'Claude Code', description: 'Primary tool used for Prototyping' },
  { title: 'Google Gemini', description: 'Research/Analysis, Image creation' },
  { title: 'Cursor', description: 'Used along with Claude for Proto.' },
  { title: '11Labs/Google Studio', description: 'Used for voice interactions, demos' },
]

const roadblocks = [
  {
    label: 'Integration',
    title: 'Tableau to Slack to Data Cloud to SDLS',
    description:
      'Architecting a seamless, end-to-end user experience required bridging complex cross-platform ecosystems—specifically Data Cloud, Slack, and Tableau—each governed by disparate SDLC timelines and release cadences. Navigating these technical boundaries involved balancing rigid constraints through strategic trade-offs: resolving critical blockers, designing around fixed limitations, and intentionally scoping deferred enhancements for future product roadmaps.',
  },
  {
    label: 'Credit Consumption',
    title: 'Initial consumption surge challenge',
    description:
      'A major customer hurdle was the massive data consumption surge triggered upon initial CSI installation, which drained data credits while loading historical context. This friction locked users out of dashboard insights before they could even begin experiencing the product’s value. To resolve this, we implemented a series of holistic product and experience interventions that drastically curbed credit consumption and streamlined onboarding.',
  },
  {
    label: 'LLM vs SLM',
    title: 'Do we really need LLM for the task ?',
    description:
      'Faced with the temptation to apply generative AI to every traditional touchpoint—from knowledge management to case handling—we grounded our design strategy in technical and operational reality. By analyzing compute costs and scoping model complexity (balancing SLMs and LLMs based on task criticality), we negotiated core architectural trade-offs that optimized performance and directly translated into refined, efficient UI workflows.',
  },
]

const visionDemos = [
  { label: 'Dynamic Island', title: 'Vision demos for Dashboard variations', image: promptImg },
  { label: 'Real Time Insights', title: 'Locate & Resolve the Issue using AI', image: rtiSupervisorImg },
  {
    label: 'Cross Cloud CSI',
    title: 'CSI scenarios for Marketing and Commerce Cloud',
    image: marketingHomeImg,
    widthPercent: 75,
  },
]

const outcomes = [
  {
    title: 'Shipping & Scale',
    description: 'Adopted by 6 pilot accounts during the design partner program.',
  },
  {
    title: 'Business & Operational',
    description: 'Reduced initial-install credit burn by 64%.',
  },
  {
    title: 'Organizational Influence',
    description: 'Vision Demos secured roadmap commitment.',
  },
  {
    title: 'Research & Validation',
    description: 'Concept value testing scored 4.7/5 on perceived usefulness.',
  },
]

const userResearch = [
  { label: 'Moderated', title: 'Concept Value Testing', image: rtiSupervisorImg },
  { label: 'Un Moderated', title: 'Usability Testing via Usertesting.com', image: userTestingImg },
  { label: 'Research Analysis', title: 'Emotional Intelligence', image: eiFigjamImg },
]

const wireframeCrops = [
  { boxW: 892, boxH: 243, imgH: '621.05%', imgLeft: '-2.09%', imgTop: '-37.56%', imgW: '104.44%', span: true },
  { boxW: 593, boxH: 230, imgH: '655.56%', imgLeft: '-50.6%', imgTop: '-304.55%', imgW: '157.27%' },
  {
    boxW: 262,
    boxH: 243,
    imgH: '621.05%',
    imgLeft: '-14.88%',
    imgTop: '-288.52%',
    imgW: '355.7%',
    widthPercent: 70,
  },
  { boxW: 888, boxH: 259, imgH: '582.06%', imgLeft: '-2.36%', imgTop: '-378.48%', imgW: '104.85%', span: true },
  { boxW: 434, boxH: 228, imgH: '662.24%', imgLeft: '-110.04%', imgTop: '-553.83%', imgW: '214.46%' },
  { boxW: 431, boxH: 223, imgH: '676.04%', imgLeft: '-5.41%', imgTop: '-566.41%', imgW: '216.49%' },
  { boxW: 892, boxH: 241, imgH: '625.54%', imgLeft: '-2.15%', imgTop: '-146.75%', imgW: '104.37%', span: true },
]

function ListSection({ heading, items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="px-6 pt-16 pb-[104px] sm:px-10">
      <div className="border-t border-black" />
      <div className="pt-[8px] sm:pt-[16px]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[10rem_1fr] sm:gap-10">
          <RevealLines as="h2" className="text-3xl font-medium tracking-tight text-black sm:text-4xl">
            {heading}
          </RevealLines>

          <div className="divide-y divide-black sm:ml-auto sm:w-[85%]">
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
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-4 text-left sm:contents"
                  >
                    <RevealLines as="span" delay={80 + i * 80} className="text-sm text-black/60 sm:pt-1">
                      {item.label}
                    </RevealLines>
                    <RevealLines
                      as="span"
                      delay={110 + i * 80}
                      className="translate-x-[30px] text-lg font-normal tracking-tight text-black sm:text-2xl"
                    >
                      {item.title}
                    </RevealLines>
                    <img
                      src={iconPlus}
                      alt=""
                      className={`mt-1 size-6 shrink-0 transition-transform sm:mt-0 ${isOpen ? 'rotate-45' : ''}`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out sm:col-start-2 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <RevealLines as="p" className="mt-3 translate-x-[30px] text-base leading-snug text-black/70">
                        {item.description}
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

function TextSection({ heading, bold = 0, headingClassName = '', children }) {
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

          <div className="sm:ml-auto sm:w-[85%]">
            <RevealLines
              as="p"
              delay={80}
              bold={bold}
              className="text-lg font-normal tracking-tight text-black sm:text-2xl"
            >
              {children}
            </RevealLines>
          </div>
        </div>
      </div>
    </section>
  )
}

function ColumnSection({ heading, items, cards = false, headingClassName = '' }) {
  if (cards) {
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
              {item.arrow && (
                <svg
                  className="absolute bottom-6 right-6 size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8a8a8a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              )}
            </Reveal>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="px-6 pt-16 pb-[104px] sm:px-10">
      <div className="border-t border-black" />
      <div className="pt-[8px] sm:pt-[16px]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[10rem_1fr] sm:gap-10">
          <RevealLines as="h2" className="text-3xl font-medium tracking-tight text-black sm:text-4xl">
            {heading}
          </RevealLines>

          <div className="grid grid-cols-1 gap-8 sm:ml-auto sm:w-[85%] sm:grid-cols-4 sm:gap-6">
            {items.map((item, i) => (
              <div key={item.title}>
                <RevealLines as="h3" delay={80 + i * 80} className="text-lg font-medium tracking-tight text-black">
                  {item.title}
                </RevealLines>
                <RevealLines as="p" delay={130 + i * 80} className="mt-2 text-sm leading-snug text-black/60">
                  {item.description}
                </RevealLines>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function MediaSection({ heading, label, title, image, imageClassName = '', video, children }) {
  return (
    <section className="px-6 pt-16 pb-[104px] sm:px-10">
      <div className="border-t border-black" />
      <div className="pt-[8px] sm:pt-[16px]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[10rem_1fr] sm:gap-10">
          <RevealLines as="h2" className="text-3xl font-medium tracking-tight text-black sm:text-4xl">
            {heading}
          </RevealLines>

          <div className="sm:ml-auto sm:w-[85%]">
            {(label || title) && (
              <div className="grid gap-1 pb-6 sm:grid-cols-[8rem_1fr] sm:items-baseline sm:gap-4">
                {label && (
                  <RevealLines as="span" delay={80} className="text-sm text-black/60">
                    {label}
                  </RevealLines>
                )}
                {title && (
                  <RevealLines
                    as="span"
                    delay={110}
                    className="translate-x-[30px] text-lg font-medium tracking-tight text-black sm:text-2xl"
                  >
                    {title}
                  </RevealLines>
                )}
              </div>
            )}
            {image && (
              <Reveal
                duration={700}
                delay={160}
                className="overflow-hidden rounded-xl border border-black/10 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)]"
              >
                <img src={image} alt={title || heading} className={`w-full object-cover ${imageClassName}`} />
              </Reveal>
            )}
            {video && (
              <Reveal
                duration={700}
                delay={160}
                className="overflow-hidden rounded-xl border border-black/10 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)]"
              >
                <video src={video} controls preload="metadata" className="w-full object-cover" />
              </Reveal>
            )}
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

function WireframeCrop({ box, className = '' }) {
  const { boxW, boxH, imgH, imgLeft, imgTop, imgW, widthPercent } = box
  return (
    <div
      className={`overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)] ${className} ${widthPercent ? 'sm:w-[70%]' : ''}`}
      style={{ aspectRatio: `${boxW} / ${boxH}` }}
    >
      <div className="relative size-full overflow-hidden">
        <img
          src={wireframesImg}
          alt="Wireframe detail"
          className="absolute max-w-none"
          style={{ height: imgH, width: imgW, left: imgLeft, top: imgTop }}
        />
      </div>
    </div>
  )
}

function WireframesCluster() {
  return (
    <section className="px-6 pt-16 pb-[104px] sm:px-10">
      <div className="border-t border-black" />
      <div className="pt-[8px] sm:pt-[16px]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[10rem_1fr] sm:gap-10">
          <RevealLines as="h2" className="text-3xl font-medium tracking-tight text-black sm:text-4xl">
            Wireframes
          </RevealLines>

          <div className="grid grid-cols-1 gap-4 sm:ml-auto sm:w-[85%] sm:grid-cols-2">
            {wireframeCrops.map((box, i) => (
              <Reveal
                key={i}
                duration={700}
                delay={80 + i * 60}
                className={box.span ? 'sm:col-span-2' : ''}
              >
                <WireframeCrop box={box} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FlowsWithImages({ heading, items, headingClassName = '' }) {
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

          <div className="flex flex-col gap-10 sm:ml-auto sm:w-[85%]">
            {items.map((item, i) => (
              <Reveal
                key={`${i}-${item.label}-${item.title}`}
                as="div"
                duration={700}
                delay={80 + i * 80}
                className={i > 0 ? 'mt-5 border-t border-black pt-3' : ''}
              >
                <div className="grid gap-1 pb-4 sm:grid-cols-[8rem_1fr] sm:items-baseline sm:gap-4">
                  <RevealLines as="span" delay={80 + i * 80} className="text-sm text-black/60">
                    {item.label}
                  </RevealLines>
                  <RevealLines
                    as="span"
                    delay={110 + i * 80}
                    className="translate-x-[30px] text-lg font-normal tracking-tight text-black sm:text-2xl"
                  >
                    {item.title}
                  </RevealLines>
                </div>
                {item.image && (
                  <div
                    className={`overflow-hidden rounded-xl ${
                      item.widthPercent === 75
                        ? 'sm:w-[75%]'
                        : item.widthPercent
                          ? 'sm:w-[70%]'
                          : ''
                    }`}
                  >
                    <img src={item.image} alt={item.title} className="w-full object-cover" />
                  </div>
                )}
                {item.images && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-stretch">
                    {item.images.map((src, j) => (
                      <div key={j} className="h-full overflow-hidden rounded-xl border border-black/10">
                        <img
                          src={src}
                          alt={`${item.title} ${j + 1}`}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Ecosystem() {
  const radius = 42
  return (
    <section className="px-6 pt-16 pb-[104px] sm:px-10">
      <div className="border-t border-black" />
      <div className="pt-[8px] sm:pt-[16px]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[10rem_1fr] sm:gap-10">
          <RevealLines
            as="h2"
            className="whitespace-nowrap text-3xl font-medium tracking-tight text-black sm:text-4xl"
          >
            CSI Ecosystem
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
              {ecosystemNodes.map((node, i) => {
                const angle = (i / ecosystemNodes.length) * 2 * Math.PI - Math.PI / 2
                const x = 50 + radius * Math.cos(angle)
                const y = 50 + radius * Math.sin(angle)
                return (
                  <line
                    key={node}
                    x1="50"
                    y1="50"
                    x2={x}
                    y2={y}
                    stroke="black"
                    strokeWidth="0.4"
                    strokeDasharray="2.5 2.5"
                    vectorEffect="non-scaling-stroke"
                  />
                )
              })}
            </svg>

            <div className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black bg-white text-2xl font-medium tracking-tight text-black">
              CSI
            </div>
            {ecosystemNodes.map((node, i) => {
              const angle = (i / ecosystemNodes.length) * 2 * Math.PI - Math.PI / 2
              const x = 50 + radius * Math.cos(angle)
              const y = 50 + radius * Math.sin(angle)
              return (
                <div
                  key={node}
                  className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-black bg-white px-4 py-2 text-sm font-medium tracking-tight text-black sm:text-base"
                  style={{ left: `${x}%`, top: `${y}%` }}
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

export default function CaseStudyCSI() {
  const [lineRef, lineInView] = useInView()

  if (!isCaseStudyUnlocked()) {
    return <Navigate to="/work" replace />
  }

  return (
    <main>
      <section className="px-6 pt-5 pb-[120px] sm:px-10">
        <div className="flex items-center gap-1 text-sm text-black">
          <RevealLines as={Link} to="/work" className="underline decoration-from-font underline-offset-2">
            Work
          </RevealLines>
          <span> / </span>
          <RevealLines as="span" delay={40} className="text-black/40">
            Customer Signals Intelligence
          </RevealLines>
        </div>

        <div className="mt-10 grid gap-10 pt-10 pb-20 sm:grid-cols-[3fr_5fr] sm:items-end">
          <RevealLines
            as="h1"
            delay={80}
            className="text-[42px] font-medium leading-[1.05] tracking-tight text-black sm:text-[56px]"
          >
            Customer Signals Intelligence
          </RevealLines>
          <RevealLines
            as="p"
            delay={160}
            justify
            className="text-justify text-base font-normal leading-snug text-[#8a8a8a] sm:text-lg"
          >
            CSI transforms fragmented customer data into meaningful insights about user
            behaviour, needs, and experiences. The goal is to help teams uncover pain points,
            anticipate customer needs, and make informed decisions—enabling more relevant,
            personalised experiences while improving customer satisfaction and business
            outcomes.
          </RevealLines>
        </div>

        <div className="mt-16 flex flex-col items-center">
          <div className="relative w-full">
            {/* Peek window: clips the frame so only its top (screen) shows, cropped at the line below */}
            <Reveal
              duration={700}
              delay={240}
              className="relative mx-auto aspect-[907/589] w-[70%] overflow-hidden rounded-t-3xl"
            >
              <div className="absolute inset-x-0 top-0 aspect-[907/644] w-full overflow-hidden rounded-3xl border-2 border-white/50 bg-black shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.1)]">
                <div className="absolute inset-[16px] overflow-hidden rounded-2xl bg-white">
                  <img
                    src={heroImg}
                    alt="Customer Signals Intelligence dashboard"
                    className="size-full object-contain object-top"
                  />
                </div>
              </div>
            </Reveal>

            {/* Divider: starts at the iPad's own width, grows to the full section width once scrolled into view */}
            <div
              ref={lineRef}
              className="hero-divider absolute inset-x-0 bottom-0 mx-auto h-px bg-black"
              style={{ width: lineInView ? '100%' : '70%' }}
            />
          </div>
        </div>
      </section>

      <ListSection heading="Key Responsibilities" items={keyResponsibilities} />
      <TextSection heading="The Problem" bold={3} headingClassName="whitespace-nowrap">
        “How might we transform fragmented, fast-paced customer interactions into clear,
        real-time emotional and behavioral insights so that support agents can dynamically
        adapt their responses to reduce churn, while supervisors can instantly identify
        operational risks without suffering from information overload?”
      </TextSection>
      <ListSection heading="Scenarios" items={scenarios} />
      <ListSection heading="Persona" items={personas} />
      <ColumnSection
        heading="High level Flow"
        items={highLevelFlow}
        cards
        headingClassName="whitespace-nowrap text-2xl sm:text-3xl"
      />
      <Ecosystem />
      <FlowsWithImages heading="User Research" items={userResearch} headingClassName="whitespace-nowrap" />
      <WireframesCluster />
      <ListSection heading="Dashboard Goal" items={dashboardOfFuture} />
      <MediaSection heading="Headless Dashboard" image={headlessDashboardImg} imageClassName="opacity-75" />
      <MediaSection heading="Dashboard grounded" image={dashboardGroundedImg} />
      <ColumnSection
        heading="Artificial Intelligence Usage"
        items={aiUsage}
        cards
        headingClassName="whitespace-nowrap"
      />
      <FlowsWithImages heading="Interaction Flows" items={actionFlows} />
      <FlowsWithImages heading="Agentforce flows" items={[
        {
          label: 'Agentforce Actions',
          title: 'Using Agentforce for neumerous use-cases',
          images: [lightningPanelImg, copilot1Img, copilot2Img],
        },
      ]} />
      <MediaSection heading="Prototyping" label="Claude Code + Cursor" title="Creating prototypes using Claude & Cursor" video={csiPrototypeVideo} />
      <ListSection heading="Roadblocks Cleared" items={roadblocks} />
      <MediaSection heading="Setup" label="CSI Setup" title="Steps to activate Customer Signals Intelligence" image={customChannelsImg} />
      <FlowsWithImages heading="Vision Demos" items={visionDemos} headingClassName="whitespace-nowrap" />
      <ColumnSection heading="Outcomes" items={outcomes} cards />

      <CTA />
    </main>
  )
}
