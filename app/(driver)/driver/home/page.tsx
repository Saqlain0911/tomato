"use client";

import { Search, Navigation, MapPin } from "lucide-react";

export default function DriverHome() {
  return (
    <div className="relative h-full min-h-screen bg-gray-900">
      
      {/* 1. The "Map" Background (Placeholder Image for now) */}
      <div 
        className="absolute inset-0 opacity-60 bg-cover bg-center"
        style={{ backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-74.5,40,13,0,0/800x1200?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbTVqb...')" }} // Using a generic dark map pattern
      >
        {/* Fake Map Grid Pattern if image fails */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* 2. Top Search Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 z-10 bg-gradient-to-b from-[#0a1a2f] to-transparent pb-12">
        <div className="bg-[#112240]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400">
            <Search size={20} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400">Where are you going?</p>
            <input 
              type="text" 
              placeholder="Search destination..." 
              className="bg-transparent text-white font-medium w-full focus:outline-none placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* 3. Floating "Near Me" Button */}
      <button className="absolute bottom-24 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-600/30 hover:scale-105 transition-transform z-20">
        <Navigation size={24} />
      </button>

      {/* 4. Bottom Sheet Preview (Nearest Spot) */}
      <div className="absolute bottom-20 left-4 right-4">
        {/* We will build the list here later */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-1 shadow-lg animate-pulse-slow">
           <div className="bg-[#0a1a2f] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-900/50 p-2 rounded-lg">
                  <MapPin size={20} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Searching nearby...</h3>
                  <p className="text-xs text-gray-400">Locating 12 spots</p>
                </div>
              </div>
              <div className="h-2 w-2 bg-green-500 rounded-full animate-ping"></div>
           </div>
        </div>
      </div>

    </div>
  );
}