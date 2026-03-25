import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { TechStack } from './components/TechStack'
import { WhatIBuild } from './components/WhatIBuild'
import { FeaturedProjects } from './components/FeaturedProjects'
import { SkillsGrid } from './components/SkillsGrid'
import { Publications } from './components/Publications'
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
      <Publications />
      <Stats />
      <ContactFooter />
    </div>
  )
}

export default App
