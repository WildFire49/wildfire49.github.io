import type { ReactNode } from 'react'

interface TerminalCardProps {
  children: ReactNode
  className?: string
}

export function TerminalCard({ children, className = '' }: TerminalCardProps) {
  return (
    <div className={`liquid-glass rounded-2xl overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-500" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}
