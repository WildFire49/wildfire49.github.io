import { Brain, Layout, Mic, Cloud } from 'lucide-react'
import { SectionBadge } from './ui/SectionBadge'
import { FadeInUp } from './ui/FadeInUp'

const skills = [
  {
    icon: Brain,
    title: 'Agentic AI',
    description: 'LangGraph workflows, RAG pipelines, knowledge graphs, and multi-agent orchestration.',
    color: 'var(--color-accent-purple)',
  },
  {
    icon: Layout,
    title: 'Frontend Engineering',
    description: 'React, Next.js, pixel-perfect UIs with performance optimization at scale.',
    color: 'var(--color-accent-blue)',
  },
  {
    icon: Mic,
    title: 'Voice AI & NLP',
    description: 'Real-time pipelines with Pipecat, LiveKit, and regional language processing.',
    color: 'var(--color-accent-green)',
  },
  {
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    description: 'AWS, Docker, Kubernetes, load balancing, and production deployments.',
    color: 'var(--color-accent-orange)',
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {skills.map((skill, i) => (
          <FadeInUp key={skill.title} delay={i * 0.1}>
            <div className="liquid-glass rounded-2xl p-6 h-full group hover:bg-white/[0.03] transition-colors">
              <div
                className="liquid-glass-strong rounded-full w-12 h-12 flex items-center justify-center mb-4 transition-shadow duration-300"
                style={{ boxShadow: `0 0 20px ${skill.color}33` }}
              >
                <skill.icon className="w-5 h-5" style={{ color: skill.color }} />
              </div>
              <h3 className="text-lg font-heading italic text-white mb-2">{skill.title}</h3>
              <p className="text-white/60 font-body font-light text-sm">{skill.description}</p>
            </div>
          </FadeInUp>
        ))}
      </div>
    </section>
  )
}
