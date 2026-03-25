import { ArrowUpRight, Download } from 'lucide-react'
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { SectionBadge } from './ui/SectionBadge'
import { FadeInUp } from './ui/FadeInUp'
import { MagneticCursor } from './ui/MagneticCursor'
import { HlsVideo } from './ui/HlsVideo'

const socials = [
  { icon: FaGithub, href: 'https://github.com/WildFire49', label: 'GitHub' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com/in/vaishakh-krishnan', label: 'LinkedIn' },
  { icon: FaXTwitter, href: 'https://x.com/vai2052', label: 'X' },
]

export function ContactFooter() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <HlsVideo
        src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="absolute top-0 left-0 right-0 z-[1]" style={{ height: '200px', background: 'linear-gradient(to bottom, var(--color-background), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 z-[1]" style={{ height: '200px', background: 'linear-gradient(to top, var(--color-background), transparent)' }} />

      <div className="relative z-10 flex flex-col items-center text-center py-32 px-6">
        <FadeInUp>
          <SectionBadge text="> connect.start()" />
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.9] mt-4">
            Let's build something together.
          </h2>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <p className="font-body font-light text-white/60 text-sm md:text-base max-w-md mt-6">
            Always open to interesting projects and conversations.
          </p>
        </FadeInUp>
        <FadeInUp delay={0.3}>
          <div className="flex items-center gap-4 mt-8">
            <a
              href="mailto:vaishakhsk2052@gmail.com"
              className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-foreground font-body flex items-center gap-2 hover:bg-white/5 transition-colors"
            >
              Email Me <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="/Vaishakh-Resume.pdf"
              download
              className="bg-white text-black rounded-full px-6 py-3 text-sm font-medium font-body flex items-center gap-2 hover:bg-white/90 transition-colors"
            >
              <Download className="w-4 h-4" /> Download Resume
            </a>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.4}>
          <div className="flex items-center gap-6 mt-12">
            {socials.map((social) => (
              <MagneticCursor key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 liquid-glass rounded-full flex items-center justify-center text-white/60 hover:text-accent-terminal transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              </MagneticCursor>
            ))}
          </div>
        </FadeInUp>

        <div className="mt-32 pt-8 border-t border-white/10 w-full max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-white/40 text-xs font-body">&copy; 2026 Vaishakh Krishnan</span>
            <div className="flex items-center gap-6">
              <a href="https://github.com/WildFire49" target="_blank" rel="noopener noreferrer" className="text-white/40 text-xs font-body hover:text-white/70 transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/vaishakh-krishnan" target="_blank" rel="noopener noreferrer" className="text-white/40 text-xs font-body hover:text-white/70 transition-colors">LinkedIn</a>
              <a href="mailto:vaishakhsk2052@gmail.com" className="text-white/40 text-xs font-body hover:text-white/70 transition-colors">Email</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
