import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  return (
    <motion.nav
      className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <a href="#home" className="font-mono text-accent-terminal text-lg font-medium">
        {'<VK />'}
      </a>

      <div className="liquid-glass rounded-full px-2 py-2 hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm font-medium text-foreground/90 px-4 py-2 rounded-full transition-colors hover:text-accent-terminal hover:bg-white/5 font-body"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="bg-white text-black rounded-full px-4 py-2 text-sm font-medium font-body flex items-center gap-1 hover:bg-white/90 transition-colors"
        >
          Let's Talk <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="w-[60px] hidden md:block" />
    </motion.nav>
  )
}
