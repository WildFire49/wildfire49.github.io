import { CountUp } from './ui/CountUp'
import { FadeInUp } from './ui/FadeInUp'
import { HlsVideo } from './ui/HlsVideo'

const stats = [
  { value: 2, suffix: '+', label: 'Years Experience', decimals: 0 },
  { value: 15, suffix: '+', label: 'Screens Shipped', decimals: 0 },
  { value: 6, suffix: '', label: 'Open Source Projects', decimals: 0 },
  { value: 8.69, suffix: '', label: 'CGPA', decimals: 2 },
]

export function Stats() {
  return (
    <section className="relative overflow-hidden py-32">
      <HlsVideo
        src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'saturate(0)' }}
      />

      <div className="absolute top-0 left-0 right-0 z-[1]" style={{ height: '200px', background: 'linear-gradient(to bottom, var(--color-background), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 z-[1]" style={{ height: '200px', background: 'linear-gradient(to top, var(--color-background), transparent)' }} />

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
                      decimals={stat.decimals}
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
