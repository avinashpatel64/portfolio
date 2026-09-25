import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CTA from '../components/CTA'
import PasswordModal from '../components/PasswordModal'
import Reveal from '../components/Reveal'
import RevealLines from '../components/RevealLines'
import Toast from '../components/Toast'
import { CSI_PASSWORD, unlockCaseStudy } from '../utils/caseStudyAccess'
import { mediaUrl } from '../utils/mediaUrl'

const projects = [
  {
    title: 'Customer Signals Intelligence',
    image: mediaUrl('images/work-csi.png'),
    caseStudyPath: '/work/customer-signals-intelligence',
    gated: true,
    company: 'Salesforce',
    role: 'AI Product Design, Design Strategy & 0-1 Design',
    summary:
      "CSI transforms customer data into actionable insights that improve experiences, increase retention, and accelerate profitable growth. By unifying signals across channels and applying analytics, brands can understand needs in real time, personalise every interaction, and make better decisions across marketing, sales, service, and product teams.",
  },
  {
    title: 'Aria Operations for Networks',
    image: mediaUrl('images/work-aria.png'),
    caseStudyPath: '/work/aria-operations-for-networks',
    company: 'VMware',
    role: 'Product Design, Data Visualisation & Interaction Design',
    summary:
      'VMware Aria Operations for Networks delivers intelligent operations for software-defined networking and security. It helps customers build an optimised, highly-available, and secure network infrastructure across multi-cloud environments.',
  },
  {
    title: 'Business Workflows',
    image: mediaUrl('images/work-bmc.png'),
    company: 'BMC Helix',
    role: 'Interaction Design, User Research & Design Strategy',
    summary:
      'BMC Helix Business Workflows is a service management solution that enables service delivery owners in all lines of business (LOBs) to manage, automate, and scale service delivery to drive peak efficiency.',
  },
  {
    title: 'Zeus Data Store',
    image: mediaUrl('images/work-zds.jpg'),
    company: 'Symantec',
    role: 'Interaction Design, Information Arch. & Visual Design',
    summary:
      'ZDS is designed to provide a simple, scalable, and high-performance storage experience, allowing users to manage billions of files and petabytes of data through a single namespace. Policy-driven data management further simplifies operations by reducing complexity and eliminating the need for additional third-party tools or hardware.',
  },
  {
    title: 'Niagara Marketplace',
    image: mediaUrl('images/work-niagara.png'),
    company: 'Honeywell',
    role: 'User Research, Interaction Design & Visual Design',
    summary:
      'The Niagara Marketplace connects customers and sellers to a single location to further enhance growth, visibility and IoT capabilities.',
  },
]

function ProjectCase({ title, image, company, role, summary, caseStudyPath, gated }) {
  const navigate = useNavigate()
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handlePasswordSubmit = (password) => {
    setShowPasswordModal(false)
    if (password === CSI_PASSWORD) {
      unlockCaseStudy()
      navigate(caseStudyPath)
    } else {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  return (
    <section className="px-6 py-16 sm:px-10 sm:py-20">
      <div className="grid gap-10 sm:grid-cols-[3fr_5fr]">
        <div className="flex flex-col sm:justify-between">
          <RevealLines
            as="h2"
            className="text-[32px] font-medium leading-[1.05] tracking-tight text-black sm:text-[42px]"
          >
            {title}
          </RevealLines>

          <div className="mt-10 sm:mt-0">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <RevealLines as="h3" delay={80} className="text-sm font-normal tracking-tight text-[#8a8a8a]">
                  Company
                </RevealLines>
                <RevealLines as="p" delay={130} className="mt-2 text-xl font-medium tracking-tight text-black">
                  {company}
                </RevealLines>
              </div>
              <div>
                <RevealLines as="h3" delay={80} className="text-sm font-normal tracking-tight text-[#8a8a8a]">
                  Key Responsibilities
                </RevealLines>
                <RevealLines as="p" delay={130} className="mt-2 text-sm font-medium leading-snug text-black">
                  {role}
                </RevealLines>
              </div>
            </div>

            <div className="mt-6">
              <RevealLines as="h3" delay={180} className="text-sm font-normal tracking-tight text-[#8a8a8a]">
                Summary
              </RevealLines>
              <RevealLines as="p" delay={230} className="mt-2 text-sm leading-snug text-black">
                {summary}
              </RevealLines>
            </div>

            {caseStudyPath ? (
              <Reveal
                as="button"
                type="button"
                onClick={() => (gated ? setShowPasswordModal(true) : navigate(caseStudyPath))}
                delay={280}
                className="mt-8 inline-block rounded-full border border-black px-6 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
              >
                Read Case Study
              </Reveal>
            ) : (
              <Reveal
                as="button"
                type="button"
                delay={280}
                className="mt-8 inline-block rounded-full border border-black px-6 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
              >
                Read Case Study [wip]
              </Reveal>
            )}
          </div>
        </div>

        {/* self-start stops the grid stretching this cell to the text column's height.
            Without it the cell grew tall, and `object-cover` filled that extra height by
            cropping the screenshot's sides — up to 43% of the image at tablet widths.
            h-auto keeps the natural aspect ratio, so the image scales down instead. */}
        <Reveal
          duration={1200}
          delay={120}
          className="self-start overflow-hidden rounded-lg shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)]"
        >
          <img src={image} alt={title} className="h-auto w-full" />
        </Reveal>
      </div>

      {caseStudyPath && (
        <>
          <PasswordModal
            open={showPasswordModal}
            onClose={() => setShowPasswordModal(false)}
            onSubmit={handlePasswordSubmit}
          />
          <Toast message="Wrong password" show={showToast} />
        </>
      )}
    </section>
  )
}

export default function Work() {
  return (
    <main>
      <section className="px-6 pt-25 pb-20 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-[3fr_5fr] sm:items-end">
          <RevealLines
            as="h1"
            className="whitespace-nowrap text-[42px] font-medium leading-none tracking-tight text-black sm:text-[clamp(1.755rem,4.797vw,4.3875rem)]"
          >
            Featured Work
          </RevealLines>
          <RevealLines
            delay={80}
            justify
            wrapperClassName="space-y-4"
            className="text-justify text-base font-normal leading-snug text-[#8a8a8a] sm:text-lg"
          >
            {[
              'Over the years, I’ve had the opportunity to work across a wide range of domains - from CRM, Analytics, Networking, ITSM, Security, and Storage to Healthcare.',
              'My experience has spanned very different environments: from being the third employee at a product startup, where I helped shape things from the ground up, to being one among tens of thousands at an established product company. I’ve worked as a design consultant, led small teams, and contributed as an individual designer across diverse products and challenges. This portfolio showcases a selection of my work, chosen to demonstrate both the breadth of domains and challenges I’ve worked across, and the depth of my approach to design and problem-solving.',
            ]}
          </RevealLines>
        </div>
      </section>

      {projects.map((project) => (
        <ProjectCase key={project.title} {...project} />
      ))}

      <CTA />
    </main>
  )
}
