import { useEffect, useState, useRef } from 'react'
import { useInView } from 'motion/react'

interface CountUpProps {
  end: number
  suffix?: string
  duration?: number
  decimals?: number
  className?: string
}

export function CountUp({ end, suffix = '', duration = 2000, decimals = 0, className = '' }: CountUpProps) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(eased * end)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, end, duration])

  return (
    <span ref={ref} className={className}>
      {decimals > 0 ? value.toFixed(decimals) : Math.floor(value)}
      {suffix}
    </span>
  )
}
