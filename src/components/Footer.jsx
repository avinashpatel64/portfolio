import RevealLines from './RevealLines'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-black py-5">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs tracking-tight text-black">
        <div className="flex items-center gap-4">
          <RevealLines as="span" staggerMs={60}>
            © Avinash Patel.
          </RevealLines>
          <RevealLines as="span" delay={60} staggerMs={60}>
            {String(year)}
          </RevealLines>
        </div>
        <RevealLines as="span" delay={120} staggerMs={60}>
          All Rights Reserved
        </RevealLines>
      </div>
    </footer>
  )
}
