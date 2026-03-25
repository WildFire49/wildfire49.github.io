interface SectionBadgeProps {
  text: string
  className?: string
}

export function SectionBadge({ text, className = '' }: SectionBadgeProps) {
  return (
    <div className={`liquid-glass rounded-full px-3.5 py-1 inline-block mb-4 ${className}`}>
      <span className="font-mono text-accent-terminal text-xs font-medium">{text}</span>
    </div>
  )
}
