"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Ticket, User, Search } from "lucide-react";

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0a1a2f] text-white flex justify-center">
      {/* Mobile Container (Constrains width on Desktop) */}
      <div className="w-full max-w-md bg-[#0a1a2f] min-h-screen relative shadow-2xl overflow-hidden flex flex-col">
        
        {/* Main Content Area */}
        <main className="flex-1 relative overflow-y-auto pb-20 scrollbar-hide">
          {children}
        </main>

        {/* Bottom Navigation Bar */}
        <nav className="absolute bottom-0 left-0 right-0 bg-[#0a1a2f]/80 backdrop-blur-xl border-t border-white/10 px-6 py-4 z-50">
          <div className="flex justify-between items-center">
            <NavItem href="/driver/home" icon={<Search size={24} />} label="Find" active={pathname.includes("home")} />
            <NavItem href="/driver/bookings" icon={<Ticket size={24} />} label="My Spots" active={pathname.includes("bookings")} />
            <NavItem href="/driver/profile" icon={<User size={24} />} label="Profile" active={pathname.includes("profile")} />
          </div>
        </nav>

      </div>
    </div>
  );
}

function NavItem({ href, icon, label, active }: any) {
  return (
    <Link href={href} className={`flex flex-col items-center gap-1 transition-all ${active ? "text-[#A3FF12] scale-110" : "text-gray-500 hover:text-gray-300"}`}>
      {icon}
      <span className="text-[10px] font-medium tracking-wide">{label}</span>
    </Link>
  );
}