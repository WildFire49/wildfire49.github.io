import { FaPython, FaReact, FaDocker, FaAws, FaNodeJs } from 'react-icons/fa'
import { SiTypescript, SiNextdotjs, SiPostgresql } from 'react-icons/si'
import { SectionBadge } from './ui/SectionBadge'
import { FloatingIcon } from './ui/FloatingIcon'
import { FadeInUp } from './ui/FadeInUp'

const techs = [
  { icon: FaPython, label: 'Python', color: '#3776AB' },
  { icon: SiTypescript, label: 'TypeScript', color: '#3178C6' },
  { icon: FaReact, label: 'React', color: '#61DAFB' },
  { icon: FaNodeJs, label: 'Node.js', color: '#339933' },
  { icon: SiNextdotjs, label: 'Next.js', color: '#ffffff' },
  { icon: FaDocker, label: 'Docker', color: '#2496ED' },
  { icon: FaAws, label: 'AWS', color: '#FF9900' },
  { icon: SiPostgresql, label: 'PostgreSQL', color: '#4169E1' },
]

export function TechStack() {
  return (
    <section className="py-16 px-6">
      <FadeInUp className="flex flex-col items-center">
        <SectionBadge text="> stack.list()" />
        <div className="flex flex-wrap justify-center gap-10 md:gap-14 mt-8">
          {techs.map((tech, i) => (
            <FloatingIcon key={tech.label} index={i} className="flex flex-col items-center gap-2 cursor-pointer group">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl transition-shadow duration-300">
                <tech.icon className="w-8 h-8 transition-transform" style={{ color: tech.color }} />
              </div>
              <span className="text-xs font-mono text-white/40 group-hover:text-white/80 transition-colors">
                {tech.label}
              </span>
            </FloatingIcon>
          ))}
        </div>
      </FadeInUp>
    </section>
  )
}
