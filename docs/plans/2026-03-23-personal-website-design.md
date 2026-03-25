# Vaishakh Krishnan — Personal Portfolio Website Design

## Overview
Single-page personal portfolio for Vaishakh Krishnan, AI Engineer. Dark, premium, Apple-inspired aesthetic with liquid glass morphism and CLI/terminal design touches. Built with React + Vite + TypeScript + Tailwind CSS + shadcn/ui.

## Theme System (CSS Variables — single source of truth)

All colors controlled via CSS custom properties in `:root`. Changing the palette = editing ~15 lines.

```css
:root {
  /* Core palette */
  --background: 0 0% 0%;           /* Pure black */
  --foreground: 0 0% 100%;         /* White */
  --primary: 0 0% 100%;
  --primary-foreground: 0 0% 0%;
  --border: 0 0% 100% / 0.2;
  --radius: 9999px;

  /* Accent colors — change these to re-theme */
  --accent-terminal: 120 100% 50%;   /* #00FF41 terminal green */
  --accent-purple: 270 91% 65%;      /* #A855F7 */
  --accent-blue: 217 91% 60%;        /* #3B82F6 */
  --accent-orange: 25 95% 53%;       /* #F97316 */
  --accent-green: 142 71% 45%;       /* #22C55E */

  /* Fonts */
  --font-heading: 'Instrument Serif', serif;
  --font-body: 'Barlow', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Liquid glass */
  --glass-bg: rgba(255, 255, 255, 0.01);
  --glass-border-opacity: 0.45;
  --glass-blur: 4px;
  --glass-strong-blur: 50px;
}
```

Tailwind config extends with these variables so all utility classes (`text-accent-terminal`, `border-accent-purple`, etc.) update automatically.

## Fonts
- **Instrument Serif** (italic) — headings
- **Barlow** (300, 400, 500, 600) — body text
- **JetBrains Mono** (400, 500) — CLI/terminal elements

## Liquid Glass CSS
Two variants in `@layer components`:
- `.liquid-glass` — subtle: blur(4px), faint box-shadow, gradient border mask via ::before
- `.liquid-glass-strong` — prominent: blur(50px), stronger shadow, higher gradient opacity

Both defined with CSS variables so glass intensity can be tuned from `:root`.

## Sections

### 1. Navbar (fixed)
- Fixed top-4, full-width, z-50
- Left: `<VK />` in monospace font (JetBrains Mono), terminal green color
- Center: liquid-glass rounded-full pill with nav links (Home, About, Projects, Skills, Contact)
- Right: solid white "Let's Talk" button with ArrowUpRight icon
- Animation: slides down from top on load (0.3s ease-out)
- Nav links: terminal green glow on hover

### 2. Hero (1000px height)
- Background: video (same src from template), absolute positioned, autoplay/loop/muted
- Overlays: bg-black/5 darkening + bottom gradient (300px, transparent → black)
- Content (z-10, centered, pt-[150px]):
  - Badge pill: liquid-glass → terminal-style `> new` tag + "AI Engineer & Builder"
  - Heading (BlurText component): "Building Intelligence, One System at a Time"
    - text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic
    - Word-by-word blur animation (blur 10→5→0, opacity 0→1, y 50→0, 100ms stagger)
  - Subtitle (TypeWriter component): `> I architect agentic AI systems, craft pixel-perfect frontends, and deploy real-time voice pipelines.`
    - JetBrains Mono, text-sm, text-accent-terminal
    - Types character by character with blinking cursor `_`
  - CTAs (motion.div, 1.1s delay): "View Projects" liquid-glass-strong + "GitHub" text link
- Animation: everything staggers in sequence

### 3. Tech Stack Bar
- Badge: `> stack.list()` in monospace
- Horizontal row of colorful SVG tech icons with labels:
  - Python, TypeScript, React, LangGraph, Docker, AWS, PostgreSQL, Next.js
- Each icon: subtle floating animation (translateY oscillation, staggered 100ms)
- Hover: icon scales up + glow effect in its accent color
- Icons use actual brand colors (not monochrome)

### 4. "What I Build" Section
- Full-width, min-height 700px, py-32
- Background: HLS video (same Mux src from template), absolute cover
- Top + bottom fade gradients (200px, black ↔ transparent)
- Content (z-10, centered):
  - Badge: `> capabilities.init()` monospace
  - Heading: "From idea to intelligent system." (typing animation on scroll)
  - Subtitle: "I design agentic architectures, build production frontends, and deploy AI services end-to-end."
  - Button: "Get in Touch" liquid-glass-strong + ArrowUpRight
- Animation: fade-in-up on scroll via IntersectionObserver

### 5. Featured Projects (Chess Layout)
- Badge: `> projects.fetch()` monospace
- Heading: "Things I've built."
- 3 alternating rows (text left/image right, then reversed):

**Row 1 — Chroma DB Explorer**
- Terminal window card (red/yellow/green dots in top bar)
- Liquid glass body with project screenshot/placeholder
- H3: "Chroma DB Explorer"
- P: "A web interface for browsing and searching ChromaDB vector collections. Connect to any instance, explore documents, metadata, and vector data."
- Tags: `<TypeScript />` `<ChromaDB />` `<React />`  (monospace, green border)
- Stars badge: "3 stars" with Star icon
- Button: "View on GitHub" → links to real repo

**Row 2 (reversed) — Supervisory Agent**
- H3: "Supervisory Agent"
- P: "LangGraph-powered multi-agent system with MCP server for dynamic workflow orchestration. Discovers and uses tools without code changes."
- Tags: `<Python />` `<LangGraph />` `<MCP />`
- Button: "View on GitHub"

**Row 3 — SplitPaisa**
- H3: "SplitPaisa"
- P: "Expense sharing app with smart settlement calculations, trip management, and real-time debt tracking."
- Tags: `<Next.js />` `<Supabase />` `<React />`
- Stars badge: "1 star"
- Button: "View on GitHub"

- Animation: cards slide in from alternating sides. Terminal chrome animates in. Hover: card lifts + green border glow.

### 6. Skills Grid (4 columns)
- Badge: `> skills.render()` monospace
- Heading: "What I bring to the table."
- 4 cards in grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
- Each card: liquid-glass rounded-2xl p-6

Cards:
1. Brain icon (purple glow, `--accent-purple`) — "Agentic AI" — "LangGraph workflows, RAG pipelines, knowledge graphs, and multi-agent orchestration"
2. Layout icon (blue glow, `--accent-blue`) — "Frontend Engineering" — "React, Next.js, pixel-perfect UIs with performance optimization at scale"
3. Mic icon (green glow, `--accent-green`) — "Voice AI & NLP" — "Real-time pipelines with Pipecat, LiveKit, and regional language processing"
4. Cloud icon (orange glow, `--accent-orange`) — "Cloud & Infrastructure" — "AWS, Docker, Kubernetes, load balancing, and production deployments"

- Icon container: liquid-glass-strong rounded-full w-12 h-12 with colored shadow glow
- Animation: stagger-fade-in (100ms delay each). Icons have continuous subtle pulse.

### 7. Stats
- Background: HLS video (desaturated, filter: saturate(0))
- Top + bottom black fades (200px)
- Content: liquid-glass rounded-3xl p-12 md:p-16
- Grid cols-2 lg:cols-4, gap-8, text-center

Stats (all truthful):
- "2+" — "Years Experience"
- "15+" — "Screens Shipped"
- "6" — "Open Source Projects"
- "8.69" — "CGPA"

- Values: text-4xl md:text-5xl lg:text-6xl font-heading italic
- Labels: text-white/60 font-body font-light text-sm
- Animation: count-up from 0 to final value on scroll (stagger 200ms each)

### 8. Contact Footer
- Background: HLS video, top + bottom black fades
- Content (z-10, centered):
  - Heading (typing animation): "Let's build something together."
  - Subtitle: "Always open to interesting projects and conversations."
  - Buttons: "Email Me" (liquid-glass-strong) + "Download Resume" (solid bg-white text-black)
  - Social icons row: GitHub, LinkedIn, X (magnetic cursor effect on hover)
- Footer: mt-32 pt-8 border-t border-white/10
  - "© 2026 Vaishakh Krishnan" + links (GitHub, LinkedIn, Email)

## Animation Components

### BlurText
- Splits text by words
- Each word: IntersectionObserver triggered
- filter: blur(10px) → blur(5px) → blur(0px)
- opacity: 0 → 0.5 → 1
- y: 50 → -5 → 0
- Step duration: 0.35s, delay: 100ms per word

### TypeWriter
- Characters appear one by one (30ms interval)
- Blinking cursor `_` in terminal green
- Triggered on mount or on scroll into view

### CountUp
- Animates number from 0 to target
- Duration: 2s with easeOut
- Triggered on scroll into view via IntersectionObserver

### FadeInUp
- opacity: 0 → 1, y: 20 → 0
- Duration: 0.6s, stagger: 100ms for siblings

### FloatingIcon
- Continuous translateY oscillation (amplitude: 6px, duration: 3s)
- Each icon offset by index * 0.3s for wave effect

### MagneticCursor
- Social icons subtly follow cursor position within radius
- Spring physics via framer-motion

## Dependencies
- hls.js — HLS video streaming
- motion (framer-motion) — all animations
- lucide-react — icons
- tailwindcss-animate — Tailwind animation utilities
- react-icons — brand SVG icons for tech stack (colored)

## File Structure
```
src/
  components/
    Navbar.tsx
    Hero.tsx
    TechStack.tsx
    WhatIBuild.tsx
    FeaturedProjects.tsx
    SkillsGrid.tsx
    Stats.tsx
    ContactFooter.tsx
    ui/
      BlurText.tsx
      TypeWriter.tsx
      CountUp.tsx
      FadeInUp.tsx
      FloatingIcon.tsx
      MagneticCursor.tsx
      TerminalCard.tsx
      HlsVideo.tsx
      SectionBadge.tsx
  App.tsx
  index.css
  main.tsx
```
