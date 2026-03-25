import { ArrowUpRight } from 'lucide-react'
import { SectionBadge } from './ui/SectionBadge'
import { FadeInUp } from './ui/FadeInUp'
import { HlsVideo } from './ui/HlsVideo'

export function WhatIBuild() {
  return (
    <section id="about" className="relative overflow-hidden" style={{ minHeight: '700px' }}>
      <HlsVideo
        src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div
        className="absolute top-0 left-0 right-0 z-[1]"
        style={{ height: '200px', background: 'linear-gradient(to bottom, var(--color-background), transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-[1]"
        style={{ height: '200px', background: 'linear-gradient(to top, var(--color-background), transparent)' }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-6 md:px-16 lg:px-24" style={{ minHeight: '700px' }}>
        <FadeInUp>
          <SectionBadge text="> capabilities.init()" />
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mt-4">
            From idea to intelligent system.
          </h2>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <p className="font-body font-light text-white/60 text-sm md:text-base max-w-xl mt-6">
            I design agentic architectures, build production frontends, and deploy AI services end-to-end. From LangGraph workflows to pixel-perfect React UIs.
          </p>
        </FadeInUp>
        <FadeInUp delay={0.3}>
          <a
            href="#contact"
            className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-foreground font-body flex items-center gap-2 mt-8 hover:bg-white/5 transition-colors"
          >
            Get in Touch <ArrowUpRight className="w-4 h-4" />
          </a>
        </FadeInUp>
      </div>
    </section>
  )
}
