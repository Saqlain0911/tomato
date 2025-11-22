export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-transparent via-[#0A1A2F]/60 to-[#0A1A2F]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        {/* CTA Card */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A73E8]/20 to-[#A3FF12]/5 rounded-2xl blur-2xl -z-10"></div>
          <div className="border border-[#1A73E8]/30 rounded-2xl backdrop-blur-xl bg-[#0A1A2F]/40 p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
              Ready to revolutionize your parking?
            </h2>
            <p className="text-lg text-[#94A3B8] mb-8">Join thousands of drivers finding perfect spots instantly.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 md:px-10 md:py-4 rounded-full font-semibold text-[#0A1A2F] bg-[#A3FF12] hover:bg-[#B8FF35] transition-all duration-300 transform hover:scale-105">
                Download App
              </button>
              <button className="px-8 py-3 md:px-10 md:py-4 rounded-full font-semibold text-[#1A73E8] border-2 border-[#1A73E8] bg-transparent hover:bg-[#1A73E8]/10 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-[#1A73E8]/0 via-[#1A73E8]/20 to-[#1A73E8]/0 mb-12"></div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Product Column */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm md:text-base">Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-[#A3FF12] transition-colors text-sm">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-[#A3FF12] transition-colors text-sm">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-[#A3FF12] transition-colors text-sm">
                  Download
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm md:text-base">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-[#A3FF12] transition-colors text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-[#A3FF12] transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-[#A3FF12] transition-colors text-sm">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm md:text-base">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-[#A3FF12] transition-colors text-sm">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-[#A3FF12] transition-colors text-sm">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-[#A3FF12] transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm md:text-base">Connect</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-[#A3FF12] transition-colors text-sm">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-[#A3FF12] transition-colors text-sm">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-[#A3FF12] transition-colors text-sm">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-[#1A73E8]/0 via-[#1A73E8]/20 to-[#1A73E8]/0 mb-8"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-[#64748B]">
          <p>© 2025 ParkEasy. All rights reserved.</p>
          <p>
            Made with <span className="text-[#A3FF12]">❤</span> for the road
          </p>
        </div>
      </div>
    </footer>
  )
}
