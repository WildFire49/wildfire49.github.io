import { lazy, Suspense } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'

// Lazy load below-the-fold sections for faster initial paint
const TechStack = lazy(() => import('./components/TechStack').then(m => ({ default: m.TechStack })))
const WhatIBuild = lazy(() => import('./components/WhatIBuild').then(m => ({ default: m.WhatIBuild })))
const FeaturedProjects = lazy(() => import('./components/FeaturedProjects').then(m => ({ default: m.FeaturedProjects })))
const SkillsGrid = lazy(() => import('./components/SkillsGrid').then(m => ({ default: m.SkillsGrid })))
const Publications = lazy(() => import('./components/Publications').then(m => ({ default: m.Publications })))
const Stats = lazy(() => import('./components/Stats').then(m => ({ default: m.Stats })))
const ContactFooter = lazy(() => import('./components/ContactFooter').then(m => ({ default: m.ContactFooter })))

function App() {
  return (
    <div className="bg-background overflow-visible">
      <Navbar />
      <Hero />
      <Suspense>
        <TechStack />
        <WhatIBuild />
        <FeaturedProjects />
        <SkillsGrid />
        <Publications />
        <Stats />
        <ContactFooter />
      </Suspense>
    </div>
  )
}

export default App
