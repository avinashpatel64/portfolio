import { useEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(0.33, 1, 0.68, 1)'

function ArrowButton({ direction, onClick, disabled }) {
  const isPrev = direction === 'prev'
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrev ? 'Previous slide' : 'Next slide'}
      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-black transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 disabled:cursor-default disabled:text-gray-500 disabled:hover:bg-gray-100"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5"
        aria-hidden="true"
      >
        <path d={isPrev ? 'M19 12H5M12 19l-7-7 7-7' : 'M5 12h14M12 5l7 7-7 7'} />
      </svg>
    </button>
  )
}

// Slides sit in a flex track that is translated by whole multiples of its own
// width, so only `transform` animates — no layout, no paint. A transition
// (rather than keyframes) means a viewer who taps through the indicators
// quickly retargets from wherever the track currently is instead of restarting.
export default function Carousel({ slides, label, aspect = '1728 / 900', className = '' }) {
  const [index, setIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)
  const dragStartX = useRef(null)
  const count = slides.length

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Clamped rather than wrapped: the arrows disable at the ends, and keyboard
  // and swipe should stop there too rather than looping round behind them.
  const go = (i) => setIndex(Math.min(Math.max(i, 0), count - 1))

  const handleKeyDown = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    go(index + (e.key === 'ArrowRight' ? 1 : -1))
  }

  const handlePointerDown = (e) => {
    dragStartX.current = e.clientX
  }

  const handlePointerUp = (e) => {
    if (dragStartX.current === null) return
    const dx = e.clientX - dragStartX.current
    dragStartX.current = null
    // Ignore anything short enough to be a click rather than a swipe.
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1))
  }

  const slideTransition = reduceMotion ? 'none' : `transform 450ms ${EASE}`

  return (
    <div className={className}>
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="overflow-hidden rounded-lg border border-black/10 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
        // pan-y keeps vertical page scrolling native while we handle horizontal drags.
        style={{ aspectRatio: aspect, touchAction: 'pan-y' }}
      >
        <div
          className="flex h-full"
          style={{ transform: `translateX(-${index * 100}%)`, transition: slideTransition }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className="h-full w-full shrink-0"
              aria-hidden={i !== index}
              // Off-screen slides stay out of the tab order.
              inert={i !== index || undefined}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                draggable={false}
                className="h-full w-full object-cover select-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* justify-between pins the arrows to the track's own edges, so they line up
          with the left and right edges of the image above. */}
      <div className="mt-5 flex items-center justify-between">
        <ArrowButton direction="prev" onClick={() => go(index - 1)} disabled={index === 0} />

        <div className="flex items-center gap-2">
        {slides.map((slide, i) => {
          const active = i === index
          return (
            <button
              key={slide.src}
              type="button"
              onClick={() => go(i)}
              aria-label={slide.alt}
              aria-current={active}
              // The pill is 6px tall, which is far too small to tap. Padding gives
              // the button a ~24px touch target while the pill inside stays small.
              className="flex items-center justify-center py-[9px] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
            >
              <span
                className="block h-[6px] rounded-full"
                style={{
                  width: active ? 59 : 11,
                  backgroundColor: active ? '#000' : 'rgba(0,0,0,0.25)',
                  transition: reduceMotion
                    ? `background-color 300ms ${EASE}`
                    : `width 300ms ${EASE}, background-color 300ms ${EASE}`,
                }}
              />
            </button>
          )
        })}
        </div>

        <ArrowButton direction="next" onClick={() => go(index + 1)} disabled={index === count - 1} />
      </div>
    </div>
  )
}
