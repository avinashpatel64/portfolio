import { useLayoutEffect, useRef, useState } from 'react'
import useInView from '../hooks/useInView'

const EASE = 'cubic-bezier(0.33, 1, 0.68, 1)'

function splitIntoLines(measureNode) {
  const wordEls = [...measureNode.querySelectorAll('[data-split-word]')]
  const lines = []
  let lastTop = null

  wordEls.forEach((el) => {
    const top = el.offsetTop
    if (lastTop === null || Math.abs(top - lastTop) > 2) {
      lines.push([])
      lastTop = top
    }
    lines[lines.length - 1].push(el.textContent)
  })

  return lines.map((words) => words.join(' '))
}

// Rendered in normal flow (not absolutely positioned) so it sizes exactly like
// the real text would in ANY layout context — a block filling its container,
// a grid cell that stretches, or a flex item that shrinks to content. That
// correct sizing is what the animated overlay below then positions itself
// against; measuring off an absolutely-positioned (out-of-flow) copy instead
// would collapse a flex item to near-zero width before it has visible content.
function MeasureWords({ text, measureRef, boldWords = 0, boldClassName }) {
  const words = (text || '').split(' ')
  return (
    <span aria-hidden="true" ref={measureRef} className="invisible">
      {words.map((word, i) => (
        <span key={i}>
          {/* The emphasised words must carry their real weight here too — bold
              glyphs are wider, so measuring them at the base weight would
              produce line breaks the visible text can't honour. */}
          <span data-split-word className={`inline-block ${i < boldWords ? boldClassName : ''}`}>
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

// Splits one measured line so its leading words (those still inside the
// emphasised run, counted from the start of the whole text) render bold.
function renderLine(line, wordsBefore, boldWords, boldClassName) {
  if (!boldWords) return line

  const words = line.split(' ')
  const boldCount = Math.min(Math.max(boldWords - wordsBefore, 0), words.length)
  if (boldCount === 0) return line

  const bold = words.slice(0, boldCount).join(' ')
  const rest = words.slice(boldCount).join(' ')
  return (
    <>
      <span className={boldClassName}>{bold}</span>
      {rest ? ` ${rest}` : ''}
    </>
  )
}

function Lines({
  lines,
  lineOffset,
  duration,
  staggerMs,
  delay,
  inView,
  justify,
  boldWords = 0,
  boldClassName,
}) {
  if (!lines) return null

  let wordsBefore = 0

  return lines.map((line, i) => {
    const isLast = i === lines.length - 1
    const wordsBeforeThisLine = wordsBefore
    wordsBefore += line.split(' ').length
    const lineDelay = delay + (lineOffset + i) * staggerMs
    // Opacity runs noticeably longer than the slide so the fade reads as its
    // own effect — settling into position and finishing the fade are two
    // distinct beats instead of both wrapping up together.
    const fadeDuration = Math.round(duration * 1.8)
    return (
      // Mask only the vertical axis via clip-path (not `overflow-hidden`, whose
      // CSS-spec cross-axis coupling — one axis non-`visible` forces the other
      // to `auto` — would still confine a word wider than its box, e.g. a
      // heading in a narrow sidebar column that's meant to overflow freely).
      // Top/bottom carry a small em-relative buffer rather than a flush 0 —
      // tight custom leading (e.g. `leading-[1.05]`) can render descenders
      // (g, y, p, q, j) slightly past the nominal line box, and a zero-buffer
      // clip cuts them off.
      <span key={i} className="block" style={{ clipPath: 'inset(-0.3em -100vw -0.3em -100vw)' }}>
        <span
          className="block"
          style={{
            // A justified block's last line shouldn't stretch to fill the width,
            // matching how browsers already treat the last line of justified text.
            textAlign: justify && isLast && lines.length > 1 ? 'left' : undefined,
            transform: inView ? 'translateY(0)' : 'translateY(110%)',
            opacity: inView ? 1 : 0,
            transition: `transform ${duration}ms ${EASE} ${lineDelay}ms, opacity ${fadeDuration}ms ${EASE} ${lineDelay}ms`,
          }}
        >
          {renderLine(line, wordsBeforeThisLine, boldWords, boldClassName)}
        </span>
      </span>
    )
  })
}

// Reveals text line-by-line, top to bottom, each line sliding up out of a mask.
// Drop-in replacement for Reveal when children are plain string(s) — pass an
// array of strings to render multiple block-level pieces (e.g. paragraphs)
// that share one continuous top-to-bottom stagger.
export default function RevealLines({
  as: Tag = 'p',
  children,
  lines: fixedLines,
  className = '',
  wrapperClassName,
  duration = 700,
  staggerMs = 90,
  delay = 0,
  justify = false,
  // Renders the first `bold` words of the text at `boldClassName` weight.
  bold = 0,
  boldClassName = 'font-semibold',
  ...rest
}) {
  const texts = Array.isArray(children) ? children : [children]
  const [containerRef, inView] = useInView()
  const measureRefs = useRef([])
  const [linesPerBlock, setLinesPerBlock] = useState(null)

  useLayoutEffect(() => {
    if (fixedLines) return undefined

    function measure() {
      setLinesPerBlock(measureRefs.current.map((node) => (node ? splitIntoLines(node) : [])))
    }

    measure()

    const ro = new ResizeObserver(measure)
    measureRefs.current.forEach((node) => node && ro.observe(node))
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, fixedLines])

  // Caller already knows the exact desired line breaks (e.g. a hero headline
  // with an intentional hard break) — skip measurement entirely.
  if (fixedLines) {
    return (
      <Tag ref={containerRef} className={`${className} relative`} {...rest}>
        <Lines
          lines={fixedLines}
          lineOffset={0}
          duration={duration}
          staggerMs={staggerMs}
          delay={delay}
          inView={inView}
          justify={justify}
          boldWords={bold}
          boldClassName={boldClassName}
        />
      </Tag>
    )
  }

  let runningOffset = 0
  const offsets = texts.map((_, i) => {
    const start = runningOffset
    const lines = linesPerBlock ? linesPerBlock[i] : null
    if (lines) runningOffset += lines.length
    return start
  })

  if (texts.length === 1) {
    const lines = linesPerBlock ? linesPerBlock[0] : null
    return (
      <Tag ref={containerRef} className={`${className} relative`} {...rest}>
        <MeasureWords
          text={texts[0]}
          boldWords={bold}
          boldClassName={boldClassName}
          measureRef={(node) => {
            measureRefs.current[0] = node
          }}
        />
        {/* padding: inherit — an absolutely positioned child's containing block is
            the parent's PADDING box, so inset-0 alone ignores any padding the Tag
            itself carries (e.g. a button's px-6 py-2). Mirroring that padding here
            shrinks this overlay's own content area back down to the Tag's real
            content box, so the animated text lands exactly where the (padding-
            respecting, normal-flow) measuring text sits. */}
        <span className="pointer-events-none absolute inset-0" style={{ padding: 'inherit' }}>
          <Lines
            lines={lines}
            lineOffset={0}
            duration={duration}
            staggerMs={staggerMs}
            delay={delay}
            inView={inView}
            justify={justify}
            boldWords={bold}
            boldClassName={boldClassName}
          />
        </span>
      </Tag>
    )
  }

  return (
    <div ref={containerRef} className={wrapperClassName}>
      {texts.map((text, i) => {
        const lines = linesPerBlock ? linesPerBlock[i] : null
        return (
          <Tag key={i} className={`${className} relative`}>
            <MeasureWords
              text={text}
              boldWords={i === 0 ? bold : 0}
              boldClassName={boldClassName}
              measureRef={(node) => {
                measureRefs.current[i] = node
              }}
            />
            <span className="pointer-events-none absolute inset-0" style={{ padding: 'inherit' }}>
              <Lines
                lines={lines}
                lineOffset={offsets[i]}
                duration={duration}
                staggerMs={staggerMs}
                delay={delay}
                inView={inView}
                justify={justify}
                boldWords={i === 0 ? bold : 0}
                boldClassName={boldClassName}
              />
            </span>
          </Tag>
        )
      })}
    </div>
  )
}
