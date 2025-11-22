"use client";

import Link from "next/link";
import { Plus, DollarSign, Car, TrendingUp, MapPin } from "lucide-react";

export default function PartnerDashboard() {
  return (
    <div className="p-6 space-y-8">
      
      {/* 1. Header */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Overview</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700"></div>
      </div>

      {/* 2. Revenue Card (The "Money" Shot) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/5 p-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
            <DollarSign size={20} />
          </div>
          <span className="text-slate-400 text-sm font-medium">Total Earnings</span>
        </div>
        
        <div className="flex items-baseline gap-2">
          <h2 className="text-4xl font-bold text-white">₹ 0</h2>
          <span className="text-green-500 text-sm font-bold flex items-center gap-1">
            <TrendingUp size={14} /> +0%
          </span>
        </div>
      </div>

      {/* 3. Action Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Active Bookings Card */}
        <div className="bg-[#0F172A] p-5 rounded-2xl border border-white/5">
          <div className="text-slate-400 mb-2"><Car size={20} /></div>
          <div className="text-2xl font-bold text-white">0</div>
          <div className="text-xs text-slate-500">Active Cars</div>
        </div>

        {/* Total Spots Card */}
        <div className="bg-[#0F172A] p-5 rounded-2xl border border-white/5">
          <div className="text-slate-400 mb-2"><MapPin size={20} /></div>
          <div className="text-2xl font-bold text-white">0</div>
          <div className="text-xs text-slate-500">Total Spots</div>
        </div>
      </div>

      {/* 4. "List Your Spot" CTA (The most important button right now) */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Your Locations</h3>
        </div>

        {/* Empty State - This forces you to add a spot */}
        <Link href="/partner/spots/new" className="group block">
          <div className="border-2 border-dashed border-slate-700 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
              <Plus size={32} className="text-white" />
            </div>
            <div className="text-center">
              <p className="text-white font-semibold">List a New Parking Spot</p>
              <p className="text-slate-500 text-xs mt-1">Start earning in 2 minutes</p>
            </div>
          </div>
        </Link>
      </div>

    </div>
  );
}