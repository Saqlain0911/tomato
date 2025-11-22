import Header from "@/components/header"
import Hero from "@/components/hero"
import ActionCards from "@/components/action-cards"
import TrustMarquee from "@/components/trust-marquee"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1A2F] via-[#0F2847] to-[#0A1A2F] overflow-hidden relative">
      {/* Decorative glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <Hero />
          <ActionCards />
          <TrustMarquee />
        </main>

        <Footer />
      </div>
    </div>
  )
}
