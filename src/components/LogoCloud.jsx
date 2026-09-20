import logoBmc from '../assets/images/logo-bmc.svg'
import logoHoneywell from '../assets/images/logo-honeywell.svg'
import logoSalesforce from '../assets/images/logo-salesforce.svg'
import logoSymantec from '../assets/images/logo-symantec.svg'
import logoVmware from '../assets/images/logo-vmware.svg'
import Reveal from './Reveal'
import RevealLines from './RevealLines'

const logos = [
  { src: logoSalesforce, alt: 'Salesforce', className: 'w-32', wrapClassName: 'row-span-2 sm:min-h-full' },
  { src: logoVmware, alt: 'VMware', className: 'w-40 object-contain' },
  { src: logoBmc, alt: 'BMC', className: 'w-32' },
  { src: logoSymantec, alt: 'Symantec', className: 'w-44' },
  { src: logoHoneywell, alt: 'Honeywell', className: 'w-40' },
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
