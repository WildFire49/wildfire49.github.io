import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { BlurText } from './ui/BlurText'
import { TypeWriter } from './ui/TypeWriter'
import { FaGithub } from 'react-icons/fa'

interface WarpBlock {
  prompt: string
  command: string
  type: 'text' | 'json'
  output?: string[]
  json?: JsonLine[]
}

interface JsonLine {
  indent: number
  content: React.ReactNode
}

const warpBlocks: WarpBlock[] = [
  {
    prompt: 'vaishakh in ~/dev',
    command: 'whoami --verbose',
    type: 'text',
    output: [
      'Vaishakh Krishnan',
      'AI Engineer who lives on X hunting for the next breakthrough.',
      'I experiment relentlessly, solve problems head-on with AI,',
      'and believe that being able to think is the real superpower.',
      '',
      'Also a hardcore Ferrari fan since the Schumacher era.',
      'If my code had a livery, it would be Rosso Corsa.',
    ],
  },
  {
    prompt: 'vaishakh in ~/dev',
    command: 'cat stack.json | jq .',
    type: 'json',
  },
  {
    prompt: 'vaishakh in ~/dev',
    command: 'echo $STATUS',
    type: 'text',
    output: ['Ready to build something extraordinary.'],
  },
]

// Syntax-highlighted JSON token components
function JKey({ children }: { children: string }) {
  return <span className="text-accent-purple">{`"${children}"`}</span>
}
function JStr({ children }: { children: string }) {
  return <span className="text-accent-green">{`"${children}"`}</span>
}
function JBrace({ children }: { children: string }) {
  return <span className="text-white/70 font-semibold">{children}</span>
}
function JPunc({ children }: { children: string }) {
  return <span className="text-white/30">{children}</span>
}

function JsonBlock({ baseDelay }: { baseDelay: number }) {
  const lines: { indent: number; node: React.ReactNode }[] = [
    { indent: 0, node: <JBrace>{'{'}</JBrace> },
    { indent: 1, node: <><JKey>languages</JKey><JPunc>{':  ['}</JPunc><JStr>Python</JStr><JPunc>{', '}</JPunc><JStr>TypeScript</JStr><JPunc>{', '}</JPunc><JStr>JavaScript</JStr><JPunc>{'],'}</JPunc></> },
    { indent: 1, node: <><JKey>ai</JKey><JPunc>{':          ['}</JPunc><JStr>LangGraph</JStr><JPunc>{', '}</JPunc><JStr>Multi-Agent RAG</JStr><JPunc>{', '}</JPunc><JStr>Temporal</JStr><JPunc>{', '}</JPunc><JStr>PageRank</JStr><JPunc>{'],'}</JPunc></> },
    { indent: 1, node: <><JKey>frontend</JKey><JPunc>{':    ['}</JPunc><JStr>React</JStr><JPunc>{', '}</JPunc><JStr>Next.js</JStr><JPunc>{', '}</JPunc><JStr>Tailwind CSS</JStr><JPunc>{'],'}</JPunc></> },
    { indent: 1, node: <><JKey>backend</JKey><JPunc>{':     ['}</JPunc><JStr>FastAPI</JStr><JPunc>{', '}</JPunc><JStr>Node.js</JStr><JPunc>{', '}</JPunc><JStr>PostgreSQL</JStr><JPunc>{', '}</JPunc><JStr>Redis</JStr><JPunc>{'],'}</JPunc></> },
    { indent: 1, node: <><JKey>realtime</JKey><JPunc>{':    ['}</JPunc><JStr>LiveKit</JStr><JPunc>{', '}</JPunc><JStr>WebRTC</JStr><JPunc>{', '}</JPunc><JStr>Pipecat</JStr><JPunc>{'],'}</JPunc></> },
    { indent: 1, node: <><JKey>infra</JKey><JPunc>{':       ['}</JPunc><JStr>AWS</JStr><JPunc>{', '}</JPunc><JStr>Vultr</JStr><JPunc>{', '}</JPunc><JStr>Docker</JStr><JPunc>{', '}</JPunc><JStr>Kubernetes</JStr><JPunc>{'],'}</JPunc></> },
    { indent: 1, node: <><JKey>security</JKey><JPunc>{':    ['}</JPunc><JStr>VAPT</JStr><JPunc>{', '}</JPunc><JStr>Penetration Testing</JStr><JPunc>{']'}</JPunc></> },
    { indent: 0, node: <JBrace>{'}'}</JBrace> },
  ]

  return (
    <div className="px-4 py-3 font-mono text-xs leading-[1.8] text-left">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          className="whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: baseDelay + 0.3 + i * 0.1 }}
          style={{ paddingLeft: `${line.indent * 16}px` }}
        >
          {i > 0 && i < lines.length - 1 && (
            <span className="text-white/10 select-none w-5 inline-block text-right mr-3">{i}</span>
          )}
          {line.node}
        </motion.div>
      ))}
    </div>
  )
}

function WarpCommandBlock({ block, index }: { block: WarpBlock; index: number }) {
  const baseDelay = 0.8 + index * 0.6

  return (
    <motion.div
      className="rounded-xl bg-[var(--color-warp-block)] border border-white/[0.06] overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: baseDelay, ease: 'easeOut' }}
    >
      {/* Command line with prompt */}
      <div className="px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.04]">
        <span className="text-accent-purple font-mono text-xs">{block.prompt}</span>
        <span className="text-white/20 font-mono text-xs">$</span>
        <motion.span
          className="text-foreground font-mono text-xs font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: baseDelay + 0.2 }}
        >
          {block.command}
        </motion.span>
      </div>

      {/* Output */}
      {block.type === 'json' ? (
        <JsonBlock baseDelay={baseDelay} />
      ) : (
        <div className="px-4 py-3 space-y-0.5">
          {block.output?.map((line, i) => (
            <motion.div
              key={i}
              className="font-mono text-xs text-white/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: baseDelay + 0.3 + i * 0.08 }}
            >
              {line}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

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
              {warpBlocks.map((block, i) => (
                <WarpCommandBlock key={i} block={block} index={i} />
              ))}

              {/* Active input block */}
              <motion.div
                className="rounded-xl border border-accent-terminal/30 bg-accent-terminal/[0.03] px-4 py-2.5 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.8 }}
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
