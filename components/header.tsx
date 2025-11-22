import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-b from-[#0A1A2F]/80 to-[#0A1A2F]/40 border-b border-[#1A73E8]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-[#1A73E8] via-[#4A9FFF] to-[#1A73E8] bg-clip-text text-transparent">
            ParkEasy
          </span>
        </div>
        <Link
          href="/login"
          className="text-sm font-medium text-[#B8C5D6] hover:text-[#A3FF12] transition-colors duration-300"
        >
          Login
        </Link>
      </div>
    </header>
  )
}
