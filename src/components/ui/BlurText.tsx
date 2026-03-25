import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
}

export function BlurText({ text, className = '', delay = 0 }: BlurTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const words = text.split(' ')

  return (
    <div ref={ref} className={`flex flex-wrap justify-center gap-x-[0.25em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={isInView ? {
            filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
            opacity: [0, 0.5, 1],
            y: [50, -5, 0],
          } : {}}
          transition={{
            duration: 0.35,
            delay: delay + i * 0.1,
            ease: 'easeOut',
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}
