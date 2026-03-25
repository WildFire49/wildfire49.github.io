import { FileText, Award, Users, ArrowUpRight } from 'lucide-react'
import { SectionBadge } from './ui/SectionBadge'
import { FadeInUp } from './ui/FadeInUp'

const publications = [
  {
    title: 'An Investigation of Federated Learning Strategies for Disease Diagnosis',
    venue: 'ICCCNT 2024 — Fifteenth International Conference on Computing, Communication and Networking Technologies',
    date: 'Jun 2024',
    description: 'Compared centralized and federated models with various strategies to help medical facilities keep patient data private. Identified 2 optimal strategies for healthcare.',
    url: 'https://ieeexplore.ieee.org/document/10725147',
  },
  {
    title: "Securing Supply Chains: Blockchain's Shield Against Counterfeit Products",
    venue: 'ICCSIT 2024',
    date: 'Apr 2024',
    description: 'Explored blockchain-based solutions to protect supply chains against counterfeiting in global trade facilitation.',
    url: 'https://easychair.org/publications/paper/hN3M/open',
  },
]

const awards = [
  {
    title: 'OEN Technology Innovation Competition',
    issuer: 'OEN Industries Kerala',
    date: 'Sep 2023',
    description: 'Led a team building a solar off-grid station prototype for schools, with a Next.js + Firebase app for live monitoring.',
    image: '/OEN.PNG',
    imageStyle: 'cover' as const,
  },
  {
    title: 'Digital Change Makers — Manorama',
    issuer: 'Manorama Online',
    date: 'Feb 2023',
    description: 'Won 3rd Prize for presenting an Off-Grid Solar Charging Station idea. Ceremony telecasted on Manorama News.',
    image: '/manorama.JPG',
    imageStyle: 'cover' as const,
  },
  {
    title: 'Social Prize — University of Auckland',
    issuer: 'University of Auckland Entrepreneurship Program',
    date: 'Jun 2023',
    description: 'Built a fall detection system for the elderly with IoT and a robo buddy for emergencies.',
    image: '/Ideas-challenge.jpg',
    imageStyle: 'contain' as const,
  },
]

export function Publications() {
  return (
    <section className="py-24 px-6 md:px-16 lg:px-24">
      <div className="text-center mb-16">
        <SectionBadge text="> publications.list()" />
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mt-4">
          Research & Recognition.
        </h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left column: Publications + Leadership */}
        <div className="flex flex-col gap-4">
          <FadeInUp>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-accent-purple" />
              <h3 className="text-xl font-heading italic text-white">Publications</h3>
            </div>
          </FadeInUp>
          {publications.map((pub, i) => (
            <FadeInUp key={pub.title} delay={i * 0.1}>
              <div className="liquid-glass rounded-2xl p-5 group hover:bg-white/[0.03] transition-colors">
                <h4 className="text-sm font-body font-medium text-white leading-snug">{pub.title}</h4>
                <p className="font-mono text-[11px] text-accent-purple/70 mt-1.5">{pub.venue}</p>
                <p className="font-mono text-[11px] text-white/30 mt-0.5">{pub.date}</p>
                <p className="font-body font-light text-white/50 text-xs mt-2 leading-relaxed">{pub.description}</p>
                {pub.url && (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-accent-terminal mt-2 hover:underline"
                  >
                    Read Paper <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </FadeInUp>
          ))}

          {/* Leadership — compact, no separate header taking space */}
          <FadeInUp delay={0.2}>
            <div className="liquid-glass rounded-2xl p-5 group hover:bg-white/[0.03] transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-accent-green" />
                <h4 className="text-sm font-body font-medium text-white">Co-Founder — amESE Club</h4>
              </div>
              <p className="font-mono text-[11px] text-accent-green/70">Amrita Vishwa Vidyapeetham</p>
              <p className="font-body font-light text-white/50 text-xs mt-1.5 leading-relaxed">
                Co-founded the amESE Club, building a community around engineering innovation and hands-on projects.
              </p>
              <a
                href="https://webfiles.amrita.edu/2025/02/amese-club-mechanical-engineering-amritapuri.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] text-accent-terminal mt-1.5 hover:underline"
              >
                Newsletter <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </FadeInUp>
        </div>

        {/* Right column: Awards with images */}
        <div>
          <FadeInUp>
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-accent-yellow" />
              <h3 className="text-xl font-heading italic text-white">Honors & Awards</h3>
            </div>
          </FadeInUp>
          <div className="space-y-4">
            {awards.map((award, i) => (
              <FadeInUp key={award.title} delay={i * 0.1}>
                <div className="liquid-glass rounded-2xl overflow-hidden group hover:bg-white/[0.03] transition-colors border-none !border-0">
                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="sm:w-52 shrink-0 bg-white/5">
                      <img
                        src={award.image}
                        alt=""
                        className={`w-full h-32 sm:h-full ${award.imageStyle === 'cover' ? 'object-cover' : 'object-contain p-2'}`}
                      />
                    </div>
                    {/* Text */}
                    <div className="p-4 flex-1 min-w-0">
                      <h4 className="text-sm font-body font-medium text-white leading-snug">{award.title}</h4>
                      <p className="font-mono text-[11px] text-accent-orange/70 mt-1">{award.issuer}</p>
                      <p className="font-mono text-[11px] text-white/30 mt-0.5">{award.date}</p>
                      <p className="font-body font-light text-white/50 text-xs mt-1.5 leading-relaxed">{award.description}</p>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
