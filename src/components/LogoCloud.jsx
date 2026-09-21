import { mediaUrl } from '../utils/mediaUrl'
import Reveal from './Reveal'
import RevealLines from './RevealLines'

const logos = [
  { src: mediaUrl('images/logo-salesforce.svg'), alt: 'Salesforce', className: 'w-32', wrapClassName: 'row-span-2 sm:min-h-full' },
  { src: mediaUrl('images/logo-vmware.svg'), alt: 'VMware', className: 'w-40 object-contain' },
  { src: mediaUrl('images/logo-bmc.svg'), alt: 'BMC', className: 'w-32' },
  { src: mediaUrl('images/logo-symantec.svg'), alt: 'Symantec', className: 'w-44' },
  { src: mediaUrl('images/logo-honeywell.svg'), alt: 'Honeywell', className: 'w-40' },
]

export default function LogoCloud() {
  return (
    <section id="work" className="px-6 pt-40 pb-44 sm:px-10">
      <RevealLines as="p" className="text-center text-[17px] tracking-tight text-black sm:text-[21px]">
        Some brands I have worked with ....
      </RevealLines>

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
        {logos.map((logo, i) => (
          <Reveal
            key={logo.alt}
            duration={1800}
            delay={120 + i * 180}
            className={`flex min-h-[230px] items-center justify-center rounded-xl bg-[#d9d9d9] p-8 ${logo.wrapClassName ?? ''}`}
          >
            <img src={logo.src} alt={logo.alt} className={`max-w-full ${logo.className}`} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
