import { useState, useEffect, useRef } from 'react'
import { useInView } from 'motion/react'

interface TypeWriterProps {
  text: string
  className?: string
  speed?: number
  startDelay?: number
  triggerOnScroll?: boolean
}

export function TypeWriter({ text, className = '', speed = 30, startDelay = 0, triggerOnScroll = false }: TypeWriterProps) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(!triggerOnScroll)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (triggerOnScroll && isInView) setStarted(true)
  }, [isInView, triggerOnScroll])

  useEffect(() => {
    if (!started) return
    const timeout = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) clearInterval(interval)
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(timeout)
  }, [started, text, speed, startDelay])

  return (
    <span ref={ref} className={className}>
      {displayed}
      <span className="animate-pulse text-accent-terminal">_</span>
    </span>
  )
}
