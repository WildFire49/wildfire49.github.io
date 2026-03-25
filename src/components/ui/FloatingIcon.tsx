import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface FloatingIconProps {
  children: ReactNode
  index?: number
  className?: string
}

export function FloatingIcon({ children, index = 0, className = '' }: FloatingIconProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.3,
      }}
      whileHover={{ scale: 1.2 }}
    >
      {children}
    </motion.div>
  )
}
