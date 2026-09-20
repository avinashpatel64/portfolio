import useInView from '../hooks/useInView'

const EASE = 'cubic-bezier(0.33, 1, 0.68, 1)'

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
        transition: `opacity ${duration}ms ${EASE} ${delay}ms, translate ${duration}ms ${EASE} ${delay}ms`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
