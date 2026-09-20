import { useEffect, useRef, useState } from 'react'

export default function useInView(options) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Force the hidden state to paint at least one frame before revealing —
          // otherwise elements already in view at mount (e.g. above-the-fold text)
          // flip straight to their final state with no visible transition.
          requestAnimationFrame(() => requestAnimationFrame(() => setInView(true)))
          observer.disconnect()
        }
      },
      { threshold: 0.15, ...options },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}
