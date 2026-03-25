import { Brain, Layout, Mic, Shield, Container, Database } from 'lucide-react'
import { SectionBadge } from './ui/SectionBadge'
import { FadeInUp } from './ui/FadeInUp'

const skillCategories = [
  {
    icon: Brain,
    title: 'AI & Agents',
    color: 'var(--color-accent-purple)',
    skills: ['LangGraph', 'LangChain', 'Multi-Agent RAG', 'Temporal', 'PageRank', 'Knowledge Graphs', 'OpenAI', 'Vector DBs'],
  },
  {
    icon: Layout,
    title: 'Frontend',
    color: 'var(--color-accent-blue)',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'shadcn/ui'],
  },
  {
    icon: Mic,
    title: 'Real-time & Voice',
    color: 'var(--color-accent-green)',
    skills: ['LiveKit', 'WebRTC', 'Pipecat', 'Voice AI Pipelines', 'Streaming'],
  },
  {
    icon: Database,
    title: 'Backend',
    color: 'var(--color-accent-cyan)',
    skills: ['Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'Redis', 'GraphQL'],
  },
  {
    icon: Container,
    title: 'Infrastructure',
    color: 'var(--color-accent-orange)',
    skills: ['AWS', 'Vultr', 'Docker', 'Kubernetes', 'CI/CD', 'Load Balancing'],
  },
  {
    icon: Shield,
    title: 'Security',
    color: 'var(--color-accent-red)',
    skills: ['VAPT', 'Penetration Testing', 'OWASP', 'Secure Architecture'],
  },
]

export function SkillsGrid() {
  return (
    <section id="skills" className="py-24 px-6 md:px-16 lg:px-24">
      <div className="text-center mb-16">
        <SectionBadge text="> skills.render()" />
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mt-4">
          What I bring to the table.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {skillCategories.map((cat, i) => (
          <FadeInUp key={cat.title} delay={i * 0.08}>
            <div className="liquid-glass rounded-2xl p-5 h-full group hover:bg-white/[0.03] transition-colors">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center shrink-0 transition-shadow duration-300"
                  style={{ boxShadow: `0 0 20px ${cat.color}33` }}
                >
                  <cat.icon className="w-4 h-4" style={{ color: cat.color }} />
                </div>
                <h3 className="text-base font-heading italic text-white">{cat.title}</h3>
              </div>
              {/* Skill tags */}
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[11px] px-2.5 py-1 rounded-full border text-white/60 hover:text-white/90 transition-colors cursor-default"
                    style={{ borderColor: `color-mix(in srgb, ${cat.color} 25%, transparent)` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </FadeInUp>
        ))}
      </div>
    </section>
  )
}
