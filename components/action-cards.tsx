"use client"

import { useRouter } from "next/navigation"
import { Car, Building2 } from "lucide-react"

export default function ActionCards() {
  const router = useRouter()

  return (
    <div className="w-full max-w-5xl px-4 mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Driver Card - Electric Blue Gradient */}
        <button
          onClick={() => router.push("/driver")}
          className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105"
        >
          {/* Electric blue gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A73E8] via-[#0D47A1] to-[#0A1A2F]"></div>

          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-2xl p-0.5 bg-gradient-to-br from-[#4A9FFF] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-8 text-white gap-4">
            <div className="p-4 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
              <Car className="w-12 h-12" />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-2">Find a Spot</h2>
              <p className="text-[#E0EEFF] text-base">Discover parking instantly near you</p>
            </div>
          </div>
        </button>

        {/* Partner Card - Dark Glass with Blue Border */}
        <button
          onClick={() => router.push("/partner")}
          className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105"
        >
          {/* Dark glass base */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A52]/40 via-[#0F2847]/60 to-[#0A1A2F]/80 backdrop-blur-2xl"></div>

          {/* Blue border with glow */}
          <div className="absolute inset-0 rounded-2xl border-2 border-[#1A73E8] opacity-60 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(26,115,232,0.1),0_0_30px_rgba(26,115,232,0.2)] group-hover:shadow-[inset_0_0_30px_rgba(26,115,232,0.2),0_0_50px_rgba(26,115,232,0.4)]"></div>

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-8 text-white gap-4">
            <div className="p-4 rounded-full bg-[#1A73E8]/20 group-hover:bg-[#1A73E8]/40 transition-colors duration-300">
              <Building2 className="w-12 h-12 text-[#4A9FFF]" />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-2">List a Spot</h2>
              <p className="text-[#B8C5D6] text-base">Earn money from your empty space</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
