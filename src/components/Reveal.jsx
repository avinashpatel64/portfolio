import useInView from '../hooks/useInView'

const EASE = 'cubic-bezier(0.33, 1, 0.68, 1)'
// Tailwind's `transition` utility default, kept so hover states still ease.
const HOVER_EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'

export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  duration = 700,
  className = '',
  children,
  ...rest
}) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-9'} ${className}`}
      style={{
        // `translate-y-*` utilities set the standalone CSS `translate` property
        // (not `transform`) in Tailwind v4 — transitioning `transform` here would
        // silently not match, leaving the slide to snap instantly while only
        // opacity animated.
        // Colour properties ride along because this inline style overrides the
        // `transition` utility Tailwind puts on hoverable elements (a button's
        // `transition hover:bg-black`) — without them the hover would snap.
        transition:
          `opacity ${duration}ms ${EASE} ${delay}ms, translate ${duration}ms ${EASE} ${delay}ms, ` +
          `color 150ms ${HOVER_EASE}, background-color 150ms ${HOVER_EASE}, border-color 150ms ${HOVER_EASE}`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
