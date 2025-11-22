import { Clock, Shield, CreditCard } from "lucide-react"

export default function FeaturesGrid() {
  const features = [
    {
      icon: Clock,
      title: "Save 20 Mins",
      description: "Average time saved per trip",
      metric: "20min",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Enterprise-grade security",
      metric: "99.9%",
    },
    {
      icon: CreditCard,
      title: "Cashless Payment",
      description: "Multiple payment options",
      metric: "10+",
    },
  ]

  return (
    <div className="w-full max-w-5xl px-4 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={index}
              className="glass group p-8 rounded-2xl transition-all duration-500 hover:border-[#1A73E8]/60 hover:bg-[#1A3A52]/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-[#A3FF12]/15 group-hover:bg-[#A3FF12]/25 transition-colors">
                  <Icon className="w-6 h-6 text-[#A3FF12]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-[#94A3B8] text-sm mb-4">{feature.description}</p>
              <div className="text-3xl font-bold text-[#A3FF12]">{feature.metric}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
