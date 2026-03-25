import { ArrowUpRight, Star, Linkedin } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { SectionBadge } from './ui/SectionBadge'
import { TerminalCard } from './ui/TerminalCard'

interface Project {
  name: string
  description: string
  tags: string[]
  stars?: number
  url: string
  linkedinUrl?: string
  reversed?: boolean
}

const projects: Project[] = [
  {
    name: 'Chroma DB Explorer',
    description: 'The first open-source ChromaDB GUI. Browse collections, inspect embeddings, run semantic searches, and manage vector data — all from a lightweight web interface.',
    tags: ['TypeScript', 'ChromaDB', 'React'],
    stars: 3,
    url: 'https://github.com/WildFire49/chroma-db-explorer',
    linkedinUrl: 'https://www.linkedin.com/posts/vaishakh-krishnan_chroma-db-ui-best-chromadb-gui-vector-activity-7372661718956564480-IRFs',
  },
  {
    name: 'Multi-Agent Orchestration',
    description: 'A LangGraph-powered multi-agent system with MCP server for dynamic workflow orchestration. Agents discover and use tools at runtime without code changes.',
    tags: ['Python', 'LangGraph', 'MCP'],
    url: 'https://github.com/WildFire49/supervisory-agent',
    reversed: true,
  },
  {
    name: 'VoiceCanvas AI',
    description: 'Built at the ElevenLabs x a16z Hackathon. Turns silent videos into professionally narrated content — analyzes frames with Gemini, generates scripts, and syncs studio-quality voiceovers. 2 hours of work in under 5 minutes.',
    tags: ['Next.js', 'Python', 'Gemini', 'ElevenLabs API'],
    stars: 1,
    url: 'https://github.com/WildFire49/elevenlabs-hackathon',
    linkedinUrl: 'https://www.linkedin.com/posts/vaishakh-krishnan_just-hacked-the-future-of-video-storytelling-activity-7299657060617527296-mNNQ',
  },
  {
    name: 'Doctor Buddy',
    description: 'Doctor consultation management platform with AI-powered analysis. Records patient sessions, transcribes audio, and generates diagnosis summaries using OpenAI.',
    tags: ['Flutter', 'Next.js', 'Firebase', 'OpenAI'],
    url: 'https://github.com/WildFire49/doctor-buddy',
    reversed: true,
  },
  {
    name: 'SplitPaisa',
    description: 'Expense sharing app with smart settlement calculations, trip management, and real-time debt tracking.',
    tags: ['Next.js', 'Supabase', 'React'],
    stars: 1,
    url: 'https://github.com/WildFire49/SplitPaisa',
  },
]

function ProjectRow({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${project.reversed ? 'lg:flex-row-reverse' : ''}`}
      initial={{ opacity: 0, x: project.reversed ? 60 : -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="flex-1 space-y-4">
        <h3 className="text-2xl md:text-3xl font-heading italic text-white">{project.name}</h3>
        <p className="font-body font-light text-white/60 text-sm leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2.5 py-1 rounded-full border border-accent-terminal/30 text-accent-terminal/80"
            >
              {'<'}{tag}{' />'}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 pt-2">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-foreground font-body flex items-center gap-2 hover:bg-white/5 transition-colors"
          >
            View on GitHub <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          {project.linkedinUrl && (
            <a
              href={project.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass rounded-full px-4 py-2.5 text-sm font-medium text-foreground/70 font-body flex items-center gap-2 hover:text-[#0A66C2] transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" /> Post
            </a>
          )}
          {project.stars !== undefined && project.stars > 0 && (
            <span className="flex items-center gap-1 text-xs text-white/50 font-mono">
              <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
              {project.stars}
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 w-full max-w-lg">
        <TerminalCard>
          <div className="space-y-2">
            <p className="font-mono text-xs text-accent-terminal/60">$ cd {project.name.toLowerCase().replace(/\s+/g, '-')}</p>
            <p className="font-mono text-xs text-white/40">$ cat README.md</p>
            <p className="font-mono text-xs text-white/60 mt-2">{project.description}</p>
            <div className="flex gap-2 mt-3">
              {project.tags.map((tag) => (
                <span key={tag} className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/50">{tag}</span>
              ))}
            </div>
          </div>
        </TerminalCard>
      </div>
    </motion.div>
  )
}

export function FeaturedProjects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-16 lg:px-24">
      <div className="text-center mb-16">
        <SectionBadge text="> projects.fetch()" />
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mt-4">
          Things I've built.
        </h2>
      </div>
      <div className="max-w-6xl mx-auto space-y-24">
        {projects.map((project) => (
          <ProjectRow key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}
