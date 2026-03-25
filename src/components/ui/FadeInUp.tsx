import { motion, useInView } from 'motion/react'
import { useRef, type ReactNode } from 'react'

interface FadeInUpProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function FadeInUp({ children, className = '', delay = 0, duration = 0.6 }: FadeInUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
