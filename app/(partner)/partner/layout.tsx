"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ScanLine, PlusCircle, Settings } from "lucide-react";

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      {/* Mobile Container */}
      <div className="w-full max-w-md bg-black min-h-screen relative shadow-2xl overflow-hidden flex flex-col border-x border-white/5">
        
        {/* Main Content */}
        <main className="flex-1 relative overflow-y-auto pb-24 scrollbar-hide">
          {children}
        </main>

        {/* Bottom Navigation Bar (Business Style) */}
        <nav className="absolute bottom-0 left-0 right-0 bg-[#0F172A]/90 backdrop-blur-xl border-t border-white/10 px-6 py-3 z-50">
          <div className="flex justify-between items-center">
            
            <NavItem href="/partner/dashboard" icon={<LayoutDashboard size={22} />} label="Overview" active={pathname.includes("dashboard")} />
            
            {/* The Big Central Action Button */}
            <div className="relative -top-6">
              <Link href="/partner/scanner" className="flex flex-col items-center">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)] border-4 border-black hover:scale-105 transition-transform">
                  <ScanLine size={24} className="text-white" />
                </div>
                <span className="text-[10px] font-bold mt-1 text-blue-400">SCAN</span>
              </Link>
            </div>

            <NavItem href="/partner/spots" icon={<PlusCircle size={22} />} label="My Spots" active={pathname.includes("spots")} />
            
          </div>
        </nav>

      </div>
    </div>
  );
}

function NavItem({ href, icon, label, active }: any) {
  return (
    <Link href={href} className={`flex flex-col items-center gap-1 transition-all ${active ? "text-white" : "text-slate-500 hover:text-slate-300"}`}>
      {icon}
      <span className="text-[10px] font-medium tracking-wide">{label}</span>
    </Link>
  );
}