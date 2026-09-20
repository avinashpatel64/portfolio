import useInView from '../hooks/useInView'
import RevealLines from './RevealLines'
import heroScreen from '../assets/images/hero-screen.png'

export default function Hero() {
  const [lineRef, lineInView] = useInView()

  return (
    <section id="home" className="px-6 sm:px-10">
      <RevealLines
        as="h1"
        delay={80}
        duration={1200}
        lines={['Hi, I am Avinash,', 'a Seasoned Product Designer']}
        className="pt-25 text-center text-[42px] font-medium leading-[1.05] tracking-tight text-black sm:text-[64px] lg:text-[81px] lg:tracking-[-4px]"
      />
      <RevealLines
        as="p"
        delay={160}
        className="mt-4 pb-10 text-center text-lg font-normal text-black sm:text-2xl"
      >
        Welcome to my work site ...
      </RevealLines>

      <div className="relative mt-16 flex justify-center">
        {/* Peek window: clips the iPad frame so only its top (screen) shows, cropped at the line below */}
        <div
          className="animate-fade-up-img relative aspect-[907/589] w-full max-w-[907px] overflow-hidden rounded-t-3xl"
          style={{ animationDelay: '600ms' }}
        >
          <div className="absolute inset-x-0 top-0 aspect-[907/644] w-full overflow-hidden rounded-3xl border-2 border-white/50 bg-black shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.1)]">
            <div className="absolute inset-[16px] overflow-hidden rounded-2xl bg-white">
              <img
                src={heroScreen}
                alt="Product design work sample screenshot"
                className="size-full object-contain object-top"
              />
            </div>
          </div>
        </div>

        {/* Divider: starts at the iPad's own width, grows to the full section width once scrolled into view */}
        <div
          ref={lineRef}
          className="hero-divider absolute inset-x-0 bottom-0 mx-auto h-px bg-black"
          style={{ width: lineInView ? '100%' : 'min(100%, 907px)' }}
        />
      </div>
    </section>
  )
}
