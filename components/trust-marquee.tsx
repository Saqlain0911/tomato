"use client"

export default function TrustMarquee() {
  const companies = [
    "Prestige Manor",
    "Central Park Heights",
    "Green Vista",
    "Urban Residences",
    "Park Plaza",
    "Metropolitan Homes",
  ]

  return (
    <div className="w-full py-16 mb-24 border-y border-[#1A73E8]/20">
      <div className="relative overflow-hidden">
        <div className="flex gap-12 trust-marquee-scroll">
          {[...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="flex-shrink-0 text-[#64748B] text-sm font-medium tracking-wide whitespace-nowrap"
            >
              ✓ {company}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
