import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { BlurText } from './ui/BlurText'
import { TypeWriter } from './ui/TypeWriter'
import { FaGithub } from 'react-icons/fa'
import { useState, useEffect } from 'react'

// Typing animation that reveals lines one at a time
function TypingLines({ lines, baseDelay }: { lines: { text: string; className?: string }[]; baseDelay: number }) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (visibleCount >= lines.length) return
    const timeout = setTimeout(() => {
      setVisibleCount((c) => c + 1)
    }, baseDelay * 1000 + visibleCount * 120)
    return () => clearTimeout(timeout)
  }, [visibleCount, lines.length, baseDelay])

  return (
    <div className="px-4 py-3 text-left space-y-0.5">
      {lines.slice(0, visibleCount).map((line, i) => (
        <motion.div
          key={i}
          className={`font-mono text-xs ${line.className || 'text-white/50'}`}
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.15 }}
        >
          {line.text || '\u00A0'}
        </motion.div>
      ))}
      {visibleCount < lines.length && (
        <span className="animate-pulse text-accent-terminal font-mono text-xs">_</span>
      )}
    </div>
  )
}

// Neofetch-style key-value skill display
function SkillRow({ label, values, color, baseDelay, index }: {
  label: string
  values: string[]
  color: string
  baseDelay: number
  index: number
}) {
  return (
    <motion.div
      className="flex gap-0 font-mono text-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: baseDelay + 0.3 + index * 0.12 }}
    >
      <span className="w-[100px] shrink-0 text-right pr-2" style={{ color }}>{label}</span>
      <span className="text-white/20 pr-2">~</span>
      <span className="text-white/60">{values.join(' · ')}</span>
    </motion.div>
  )
}

const skillRows = [
  { label: 'languages', values: ['Python', 'TypeScript', 'JavaScript'], color: 'var(--color-accent-purple)' },
  { label: 'ai', values: ['LangGraph', 'Multi-Agent RAG', 'Temporal', 'PageRank'], color: 'var(--color-accent-purple)' },
  { label: 'frontend', values: ['React', 'Next.js', 'Tailwind CSS'], color: 'var(--color-accent-blue)' },
  { label: 'backend', values: ['FastAPI', 'Node.js', 'PostgreSQL', 'Redis'], color: 'var(--color-accent-blue)' },
  { label: 'realtime', values: ['LiveKit', 'WebRTC', 'Pipecat'], color: 'var(--color-accent-green)' },
  { label: 'infra', values: ['AWS', 'Vultr', 'Docker', 'Kubernetes'], color: 'var(--color-accent-orange)' },
  { label: 'security', values: ['VAPT', 'Penetration Testing'], color: 'var(--color-accent-red)' },
]

const whoamiLines = [
  { text: 'Vaishakh Krishnan', className: 'text-foreground font-medium text-sm' },
  { text: '' },
  { text: 'AI Engineer who lives on X hunting for the next breakthrough.' },
  { text: 'I experiment relentlessly, solve problems head-on with AI,' },
  { text: 'and believe that being able to think is the real superpower.' },
  { text: '' },
  { text: 'Also a hardcore Ferrari fan since the Schumacher era.', className: 'text-accent-red/70' },
  { text: 'If my code had a livery, it would be Rosso Corsa.', className: 'text-accent-red/70' },
]

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Warp-style gradient glow */}
      <div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(1,164,255,0.08) 0%, rgba(207,142,255,0.04) 40%, transparent 70%)',
        }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1]"
        style={{ height: '200px', background: `linear-gradient(to bottom, transparent, var(--color-background))` }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center pt-28 md:pt-36 px-6">
        {/* Badge */}
        <motion.div
          className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="bg-accent-terminal text-white rounded-full px-2.5 py-0.5 text-xs font-mono font-medium">
            {'> new'}
          </span>
          <span className="text-sm text-foreground/90 font-body">AI Engineer & Builder</span>
        </motion.div>

        {/* Heading */}
        <BlurText
          text="Building Intelligence, One System at a Time"
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading italic text-foreground leading-[0.85] tracking-[-3px] max-w-4xl"
          delay={0.3}
        />

        {/* Subtitle */}
        <motion.div
          className="mt-6 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <TypeWriter
            text="> Architecting agentic AI, pixel-perfect frontends, and real-time voice pipelines."
            className="font-mono text-sm text-accent-terminal"
            startDelay={1500}
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex items-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <a
            href="#projects"
            className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-foreground font-body flex items-center gap-2 hover:bg-white/5 transition-colors"
          >
            View Projects <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/WildFire49"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-foreground/70 font-body hover:text-foreground transition-colors"
          >
            <FaGithub className="w-4 h-4" /> GitHub
          </a>
        </motion.div>

        {/* Warp-style terminal */}
        <motion.div
          className="mt-12 w-full max-w-2xl"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
        >
          <div className="rounded-2xl overflow-hidden border border-white/[0.08]" style={{ background: 'var(--color-warp-surface)' }}>
            {/* Warp title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              <div className="flex-1 flex items-center justify-center gap-2">
                <span className="font-mono text-[10px] text-white/25">vaishakh</span>
                <span className="text-white/10">—</span>
                <span className="font-mono text-[10px] text-white/25">~/dev</span>
              </div>
              <div className="w-[52px]" />
            </div>

            {/* Warp command blocks */}
            <div className="p-3 space-y-2">
              {/* Block 1: whoami — typed out line by line */}
              <motion.div
                className="rounded-xl bg-[var(--color-warp-block)] border border-white/[0.06] overflow-hidden"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.04]">
                  <span className="text-accent-purple font-mono text-xs">vaishakh in ~/dev</span>
                  <span className="text-white/20 font-mono text-xs">$</span>
                  <span className="text-foreground font-mono text-xs font-medium">whoami --verbose</span>
                </div>
                <TypingLines lines={whoamiLines} baseDelay={1.2} />
              </motion.div>

              {/* Block 2: neofetch-style skills */}
              <motion.div
                className="rounded-xl bg-[var(--color-warp-block)] border border-white/[0.06] overflow-hidden"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                <div className="px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.04]">
                  <span className="text-accent-purple font-mono text-xs">vaishakh in ~/dev</span>
                  <span className="text-white/20 font-mono text-xs">$</span>
                  <span className="text-foreground font-mono text-xs font-medium">neofetch --skills</span>
                </div>
                <div className="px-4 py-3 text-left space-y-1">
                  {skillRows.map((row, i) => (
                    <SkillRow key={row.label} {...row} baseDelay={2.0} index={i} />
                  ))}
                </div>
              </motion.div>

              {/* Block 3: status */}
              <motion.div
                className="rounded-xl bg-[var(--color-warp-block)] border border-white/[0.06] overflow-hidden"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.8 }}
              >
                <div className="px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.04]">
                  <span className="text-accent-purple font-mono text-xs">vaishakh in ~/dev</span>
                  <span className="text-white/20 font-mono text-xs">$</span>
                  <span className="text-foreground font-mono text-xs font-medium">echo $STATUS</span>
                </div>
                <div className="px-4 py-3 text-left">
                  <motion.p
                    className="font-mono text-xs text-white/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.1 }}
                  >
                    Ready to build something extraordinary.
                  </motion.p>
                </div>
              </motion.div>

              {/* Ferrari F1 racing across the terminal */}
              <div className="overflow-hidden rounded-xl h-10 relative">
                <motion.div
                  className="absolute top-0"
                  initial={{ x: '-120px' }}
                  animate={{ x: 'calc(100% + 120px)' }}
                  transition={{
                    duration: 3,
                    delay: 3.5,
                    ease: [0.2, 0.0, 0.3, 1],
                    repeat: Infinity,
                    repeatDelay: 10,
                  }}
                >
                  <img
                    src="/ferrari.png"
                    alt=""
                    className="h-8 w-auto drop-shadow-[0_0_12px_rgba(255,50,50,0.4)]"
                    style={{ mixBlendMode: 'screen' }}
                  />
                </motion.div>
              </div>

              {/* Active input block */}
              <motion.div
                className="rounded-xl border border-accent-terminal/30 bg-accent-terminal/[0.03] px-4 py-2.5 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.4 }}
              >
                <span className="text-accent-purple font-mono text-xs">vaishakh in ~/dev</span>
                <span className="text-white/20 font-mono text-xs">$</span>
                <span className="animate-pulse text-accent-terminal font-mono text-xs">|</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
