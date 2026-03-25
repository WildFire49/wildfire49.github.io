# Personal Portfolio Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build Vaishakh Krishnan's personal portfolio — a dark, premium single-page site with liquid glass morphism, CLI/terminal touches, and rich animations.

**Architecture:** React SPA with Vite + TypeScript. All styling via Tailwind CSS with CSS variable-driven theming. Animation components built on framer-motion. HLS video backgrounds via hls.js. Single App.tsx renders 8 section components sequentially.

**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS v4, shadcn/ui, framer-motion (motion), hls.js, lucide-react, react-icons

---

### Task 1: Scaffold Vite + React + TypeScript Project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`

**Step 1: Create Vite project**

```bash
cd /Users/vaishakh/Code/personal/website
npm create vite@latest . -- --template react-ts
```

If prompted about non-empty directory, choose to proceed (only docs/ and PDF exist).

**Step 2: Install dependencies**

```bash
npm install
npm install motion lucide-react hls.js react-icons
npm install -D tailwindcss @tailwindcss/vite
```

**Step 3: Configure Vite with Tailwind**

`vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
```

**Step 4: Set up base index.html with Google Fonts**

`index.html` — add to `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Barlow:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<title>Vaishakh Krishnan — AI Engineer</title>
```

**Step 5: Verify scaffold runs**

```bash
npm run dev
```

Expected: Vite dev server starts, default React page renders at localhost:5173.

**Step 6: Commit**

```bash
git init
echo "node_modules\ndist\n.env" > .gitignore
git add -A
git commit -m "chore: scaffold vite + react + typescript project"
```

---

### Task 2: Theme System, Tailwind Config, Liquid Glass CSS

**Files:**
- Create: `src/index.css`
- Modify: `src/main.tsx` (import css)

**Step 1: Write `src/index.css` with full theme system**

```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

@theme {
  --font-heading: 'Instrument Serif', serif;
  --font-body: 'Barlow', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --color-background: hsl(0 0% 0%);
  --color-foreground: hsl(0 0% 100%);
  --color-primary: hsl(0 0% 100%);
  --color-primary-foreground: hsl(0 0% 0%);
  --color-border: hsl(0 0% 100% / 0.2);

  --color-accent-terminal: #00FF41;
  --color-accent-purple: #A855F7;
  --color-accent-blue: #3B82F6;
  --color-accent-orange: #F97316;
  --color-accent-green: #22C55E;

  --color-glass-bg: rgba(255, 255, 255, 0.01);
}

/* ── Base ── */
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-body antialiased;
    margin: 0;
  }
}

/* ── Liquid Glass ── */
@layer components {
  .liquid-glass {
    background: var(--color-glass-bg);
    background-blend-mode: luminosity;
    backdrop-filter: blur(4px);
    border: none;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
  }

  .liquid-glass::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(180deg,
      rgba(255, 255, 255, 0.45) 0%,
      rgba(255, 255, 255, 0.15) 20%,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0) 60%,
      rgba(255, 255, 255, 0.15) 80%,
      rgba(255, 255, 255, 0.45) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .liquid-glass-strong {
    background: var(--color-glass-bg);
    background-blend-mode: luminosity;
    backdrop-filter: blur(50px);
    border: none;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05),
                inset 0 1px 1px rgba(255, 255, 255, 0.15);
    position: relative;
    overflow: hidden;
  }

  .liquid-glass-strong::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(180deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0) 60%,
      rgba(255, 255, 255, 0.2) 80%,
      rgba(255, 255, 255, 0.5) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
}
```

**Step 2: Update `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Step 3: Write minimal `src/App.tsx`**

```tsx
function App() {
  return (
    <div className="bg-background overflow-visible">
      <div className="liquid-glass rounded-full px-6 py-3 mx-auto mt-20 w-fit">
        <span className="font-mono text-accent-terminal text-sm">{'>'} theme.test()</span>
      </div>
      <h1 className="font-heading italic text-foreground text-6xl text-center mt-8 tracking-tight leading-[0.9]">
        Theme Works
      </h1>
      <p className="font-body font-light text-foreground/60 text-sm text-center mt-4">
        Body text in Barlow light
      </p>
      <div className="flex gap-4 justify-center mt-8">
        <span className="w-8 h-8 rounded-full bg-accent-terminal" />
        <span className="w-8 h-8 rounded-full bg-accent-purple" />
        <span className="w-8 h-8 rounded-full bg-accent-blue" />
        <span className="w-8 h-8 rounded-full bg-accent-orange" />
      </div>
    </div>
  )
}

export default App
```

**Step 4: Verify**

```bash
npm run dev
```

Expected: Black page, green terminal badge, serif italic heading, Barlow body text, 4 colored circles. All fonts load. Liquid glass pill has subtle glass effect.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add theme system with CSS variables, liquid glass, and fonts"
```

---

### Task 3: Animation UI Components

**Files:**
- Create: `src/components/ui/BlurText.tsx`
- Create: `src/components/ui/TypeWriter.tsx`
- Create: `src/components/ui/CountUp.tsx`
- Create: `src/components/ui/FadeInUp.tsx`
- Create: `src/components/ui/FloatingIcon.tsx`
- Create: `src/components/ui/MagneticCursor.tsx`
- Create: `src/components/ui/SectionBadge.tsx`
- Create: `src/components/ui/HlsVideo.tsx`
- Create: `src/components/ui/TerminalCard.tsx`

**Step 1: Create `src/components/ui/BlurText.tsx`**

```tsx
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'motion/react'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
}

export function BlurText({ text, className = '', delay = 0 }: BlurTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const words = text.split(' ')

  return (
    <div ref={ref} className={`flex flex-wrap justify-center gap-x-[0.25em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={isInView ? {
            filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
            opacity: [0, 0.5, 1],
            y: [50, -5, 0],
          } : {}}
          transition={{
            duration: 0.35,
            delay: delay + i * 0.1,
            ease: 'easeOut',
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}
```

**Step 2: Create `src/components/ui/TypeWriter.tsx`**

```tsx
import { useState, useEffect, useRef } from 'react'
import { useInView } from 'motion/react'

interface TypeWriterProps {
  text: string
  className?: string
  speed?: number
  startDelay?: number
  triggerOnScroll?: boolean
}

export function TypeWriter({ text, className = '', speed = 30, startDelay = 0, triggerOnScroll = false }: TypeWriterProps) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(!triggerOnScroll)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (triggerOnScroll && isInView) setStarted(true)
  }, [isInView, triggerOnScroll])

  useEffect(() => {
    if (!started) return
    const timeout = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) clearInterval(interval)
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(timeout)
  }, [started, text, speed, startDelay])

  return (
    <span ref={ref} className={className}>
      {displayed}
      <span className="animate-pulse text-accent-terminal">_</span>
    </span>
  )
}
```

**Step 3: Create `src/components/ui/CountUp.tsx`**

```tsx
import { useEffect, useState, useRef } from 'react'
import { useInView } from 'motion/react'

interface CountUpProps {
  end: number
  suffix?: string
  duration?: number
  decimals?: number
  className?: string
}

export function CountUp({ end, suffix = '', duration = 2000, decimals = 0, className = '' }: CountUpProps) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOut cubic
      setValue(eased * end)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, end, duration])

  return (
    <span ref={ref} className={className}>
      {decimals > 0 ? value.toFixed(decimals) : Math.floor(value)}
      {suffix}
    </span>
  )
}
```

**Step 4: Create `src/components/ui/FadeInUp.tsx`**

```tsx
import { motion, useInView } from 'motion/react'
import { useRef, type ReactNode } from 'react'

interface FadeInUpProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function FadeInUp({ children, className = '', delay = 0, duration = 0.6 }: FadeInUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

**Step 5: Create `src/components/ui/FloatingIcon.tsx`**

```tsx
import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface FloatingIconProps {
  children: ReactNode
  index?: number
  className?: string
}

export function FloatingIcon({ children, index = 0, className = '' }: FloatingIconProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.3,
      }}
      whileHover={{ scale: 1.2 }}
    >
      {children}
    </motion.div>
  )
}
```

**Step 6: Create `src/components/ui/MagneticCursor.tsx`**

```tsx
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useRef, type ReactNode, type MouseEvent } from 'react'

interface MagneticCursorProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticCursor({ children, className = '', strength = 0.3 }: MagneticCursorProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouse = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  )
}
```

**Step 7: Create `src/components/ui/SectionBadge.tsx`**

```tsx
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
```

**Step 8: Create `src/components/ui/HlsVideo.tsx`**

```tsx
import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

interface HlsVideoProps {
  src: string
  className?: string
  style?: React.CSSProperties
}

export function HlsVideo({ src, className = '', style }: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (src.includes('.m3u8') && Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
    } else {
      video.src = src
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      autoPlay
      loop
      muted
      playsInline
    />
  )
}
```

**Step 9: Create `src/components/ui/TerminalCard.tsx`**

```tsx
import type { ReactNode } from 'react'

interface TerminalCardProps {
  children: ReactNode
  className?: string
}

export function TerminalCard({ children, className = '' }: TerminalCardProps) {
  return (
    <div className={`liquid-glass rounded-2xl overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-500" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}
```

**Step 10: Verify all components import correctly**

Update `src/App.tsx` temporarily to import and render a few:
```tsx
import { BlurText } from './components/ui/BlurText'
import { TypeWriter } from './components/ui/TypeWriter'
import { SectionBadge } from './components/ui/SectionBadge'
import { TerminalCard } from './components/ui/TerminalCard'

function App() {
  return (
    <div className="bg-background min-h-screen p-20">
      <SectionBadge text="> components.test()" />
      <BlurText text="All Animation Components Working" className="text-5xl font-heading italic text-foreground" />
      <div className="mt-8">
        <TypeWriter text="> Hello, I am Vaishakh." className="font-mono text-sm text-accent-terminal" />
      </div>
      <TerminalCard className="mt-8 max-w-md">
        <p className="font-mono text-sm text-white/60">Terminal card works</p>
      </TerminalCard>
    </div>
  )
}
export default App
```

```bash
npm run dev
```

Expected: Black page with animated blur text heading, typing text with green cursor, terminal card with macOS dots.

**Step 11: Commit**

```bash
git add -A
git commit -m "feat: add all animation UI components (BlurText, TypeWriter, CountUp, etc.)"
```

---

### Task 4: Navbar Component

**Files:**
- Create: `src/components/Navbar.tsx`

**Step 1: Write Navbar component**

```tsx
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
      {/* Logo */}
      <a href="#home" className="font-mono text-accent-terminal text-lg font-medium">
        {'<VK />'}
      </a>

      {/* Nav pill */}
      <div className="liquid-glass rounded-full px-2 py-2 flex items-center gap-1">
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

      {/* Spacer for centering */}
      <div className="w-[60px]" />
    </motion.nav>
  )
}
```

**Step 2: Verify** — Import in App.tsx, check it renders fixed at top with glass pill.

**Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add Navbar with liquid glass pill and terminal logo"
```

---

### Task 5: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`

**Step 1: Write Hero component**

```tsx
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { BlurText } from './ui/BlurText'
import { TypeWriter } from './ui/TypeWriter'
import { FaGithub } from 'react-icons/fa'

export function Hero() {
  return (
    <section id="home" className="relative overflow-visible" style={{ height: '1000px', background: 'black' }}>
      {/* Background video */}
      <video
        className="absolute w-full h-auto object-contain z-0"
        style={{ top: '20%' }}
        autoPlay
        loop
        muted
        playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/5 z-0" />

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1]"
        style={{ height: '300px', background: 'linear-gradient(to bottom, transparent, black)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center" style={{ paddingTop: '150px' }}>
        {/* Badge */}
        <motion.div
          className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="bg-accent-terminal text-black rounded-full px-2.5 py-0.5 text-xs font-mono font-medium">
            {'> new'}
          </span>
          <span className="text-sm text-foreground/90 font-body">AI Engineer & Builder</span>
        </motion.div>

        {/* Heading */}
        <BlurText
          text="Building Intelligence, One System at a Time"
          className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-foreground leading-[0.8] tracking-[-4px] max-w-4xl"
          delay={0.3}
        />

        {/* Subtitle - TypeWriter */}
        <motion.div
          className="mt-8 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <TypeWriter
            text="> I architect agentic AI systems, craft pixel-perfect frontends, and deploy real-time voice pipelines."
            className="font-mono text-sm text-accent-terminal"
            startDelay={1500}
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex items-center gap-4 mt-10"
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
      </div>
    </section>
  )
}
```

**Step 2: Verify** — Import in App, check video bg, blur text animation, typing subtitle, CTAs.

**Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add Hero section with BlurText, TypeWriter, and video background"
```

---

### Task 6: Tech Stack Bar

**Files:**
- Create: `src/components/TechStack.tsx`

**Step 1: Write TechStack component**

```tsx
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
              <div
                className="w-12 h-12 flex items-center justify-center rounded-xl transition-shadow duration-300 group-hover:shadow-lg"
                style={{ '--glow-color': tech.color } as React.CSSProperties}
              >
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
```

**Step 2: Verify** — Icons float, colors match brands, hover scales up.

**Step 3: Commit**

```bash
git add src/components/TechStack.tsx
git commit -m "feat: add TechStack bar with colorful floating icons"
```

---

### Task 7: "What I Build" Section

**Files:**
- Create: `src/components/WhatIBuild.tsx`

**Step 1: Write WhatIBuild component**

```tsx
import { ArrowUpRight } from 'lucide-react'
import { SectionBadge } from './ui/SectionBadge'
import { FadeInUp } from './ui/FadeInUp'
import { HlsVideo } from './ui/HlsVideo'

export function WhatIBuild() {
  return (
    <section id="about" className="relative overflow-hidden" style={{ minHeight: '700px' }}>
      {/* HLS Video Background */}
      <HlsVideo
        src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 z-[1]"
        style={{ height: '200px', background: 'linear-gradient(to bottom, black, transparent)' }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1]"
        style={{ height: '200px', background: 'linear-gradient(to top, black, transparent)' }}
      />

      {/* Content */}
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
```

**Step 2: Verify** — HLS video plays, fades work, content fades in on scroll.

**Step 3: Commit**

```bash
git add src/components/WhatIBuild.tsx
git commit -m "feat: add WhatIBuild section with HLS video background"
```

---

### Task 8: Featured Projects (Chess Layout)

**Files:**
- Create: `src/components/FeaturedProjects.tsx`

**Step 1: Write FeaturedProjects component**

```tsx
import { ArrowUpRight, Star } from 'lucide-react'
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
  reversed?: boolean
}

const projects: Project[] = [
  {
    name: 'Chroma DB Explorer',
    description: 'A web interface for browsing and searching ChromaDB vector collections. Connect to any instance, explore documents, metadata, and vector data.',
    tags: ['TypeScript', 'ChromaDB', 'React'],
    stars: 3,
    url: 'https://github.com/WildFire49/chroma-db-explorer',
  },
  {
    name: 'Supervisory Agent',
    description: 'LangGraph-powered multi-agent system with MCP server for dynamic workflow orchestration. Discovers and uses tools without code changes.',
    tags: ['Python', 'LangGraph', 'MCP'],
    url: 'https://github.com/WildFire49/supervisory-agent',
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
      {/* Text */}
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
          {project.stars !== undefined && project.stars > 0 && (
            <span className="flex items-center gap-1 text-xs text-white/50 font-mono">
              <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
              {project.stars}
            </span>
          )}
        </div>
      </div>

      {/* Terminal card placeholder */}
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
```

**Step 2: Verify** — 3 rows alternate sides, terminal cards show, tags are green monospace, slides in on scroll.

**Step 3: Commit**

```bash
git add src/components/FeaturedProjects.tsx
git commit -m "feat: add FeaturedProjects chess layout with terminal cards"
```

---

### Task 9: Skills Grid

**Files:**
- Create: `src/components/SkillsGrid.tsx`

**Step 1: Write SkillsGrid component**

```tsx
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
```

**Step 2: Verify** — 4 cards stagger in, icons glow in accent colors, hover effect works.

**Step 3: Commit**

```bash
git add src/components/SkillsGrid.tsx
git commit -m "feat: add SkillsGrid with colored icon glows"
```

---

### Task 10: Stats Section

**Files:**
- Create: `src/components/Stats.tsx`

**Step 1: Write Stats component**

```tsx
import { SectionBadge } from './ui/SectionBadge'
import { CountUp } from './ui/CountUp'
import { FadeInUp } from './ui/FadeInUp'
import { HlsVideo } from './ui/HlsVideo'

const stats = [
  { value: 2, suffix: '+', label: 'Years Experience' },
  { value: 15, suffix: '+', label: 'Screens Shipped' },
  { value: 6, suffix: '', label: 'Open Source Projects' },
  { value: 8.69, suffix: '', label: 'CGPA', decimals: 2 },
]

export function Stats() {
  return (
    <section className="relative overflow-hidden py-32">
      {/* HLS Video BG */}
      <HlsVideo
        src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'saturate(0)' }}
      />

      {/* Fades */}
      <div className="absolute top-0 left-0 right-0 z-[1]" style={{ height: '200px', background: 'linear-gradient(to bottom, black, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 z-[1]" style={{ height: '200px', background: 'linear-gradient(to top, black, transparent)' }} />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24">
        <FadeInUp>
          <div className="liquid-glass rounded-3xl p-12 md:p-16 max-w-5xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((stat, i) => (
                <FadeInUp key={stat.label} delay={i * 0.2}>
                  <div>
                    <CountUp
                      end={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                      className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white"
                    />
                    <p className="text-white/60 font-body font-light text-sm mt-2">{stat.label}</p>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
```

**Step 2: Verify** — Numbers count up on scroll, desaturated video bg, glass card.

**Step 3: Commit**

```bash
git add src/components/Stats.tsx
git commit -m "feat: add Stats section with count-up animation"
```

---

### Task 11: Contact Footer

**Files:**
- Create: `src/components/ContactFooter.tsx`

**Step 1: Write ContactFooter component**

```tsx
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
      {/* HLS Video BG */}
      <HlsVideo
        src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Fades */}
      <div className="absolute top-0 left-0 right-0 z-[1]" style={{ height: '200px', background: 'linear-gradient(to bottom, black, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 z-[1]" style={{ height: '200px', background: 'linear-gradient(to top, black, transparent)' }} />

      {/* Content */}
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

        {/* Social icons */}
        <FadeInUp delay={0.4}>
          <div className="flex items-center gap-6 mt-12">
            {socials.map((social) => (
              <MagneticCursor key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 liquid-glass rounded-full flex items-center justify-center text-white/60 hover:text-accent-terminal hover:border-accent-terminal/30 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              </MagneticCursor>
            ))}
          </div>
        </FadeInUp>

        {/* Footer */}
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
```

**Step 2: Verify** — HLS video bg, magnetic social icons, email link, resume download.

**Step 3: Commit**

```bash
git add src/components/ContactFooter.tsx
git commit -m "feat: add ContactFooter with magnetic social icons and HLS video"
```

---

### Task 12: Wire Up App.tsx and Final Assembly

**Files:**
- Modify: `src/App.tsx`

**Step 1: Assemble all sections in App.tsx**

```tsx
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { TechStack } from './components/TechStack'
import { WhatIBuild } from './components/WhatIBuild'
import { FeaturedProjects } from './components/FeaturedProjects'
import { SkillsGrid } from './components/SkillsGrid'
import { Stats } from './components/Stats'
import { ContactFooter } from './components/ContactFooter'

function App() {
  return (
    <div className="bg-background overflow-visible">
      <Navbar />
      <Hero />
      <TechStack />
      <WhatIBuild />
      <FeaturedProjects />
      <SkillsGrid />
      <Stats />
      <ContactFooter />
    </div>
  )
}

export default App
```

**Step 2: Copy resume PDF to public folder for download**

```bash
cp /Users/vaishakh/Code/personal/website/Vaishakh-Resume.pdf /Users/vaishakh/Code/personal/website/public/Vaishakh-Resume.pdf
```

**Step 3: Verify full page**

```bash
npm run dev
```

Expected: Full single-page site renders. Scroll through all 8 sections. Animations trigger on scroll. Videos play. All links work.

**Step 4: Build production bundle**

```bash
npm run build
```

Expected: No TypeScript errors, clean build output in `dist/`.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: assemble all sections into final single-page portfolio"
```

---
