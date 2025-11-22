"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Search, Navigation, MapPin, Loader2, Car } from "lucide-react";
import Link from "next/link";

export default function DriverHome() {
  const [loading, setLoading] = useState(true);
  const [spots, setSpots] = useState<any[]>([]);
  const [myLocation, setMyLocation] = useState<{lat: number, lng: number} | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 1. Get User Location & Fetch Spots
  useEffect(() => {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported.");
        setLoading(false);
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      console.log("User Location:", latitude, longitude); // Debugging
      setMyLocation({ lat: latitude, lng: longitude });

      // 2. Call the Supabase RPC function (PostGIS Magic)
      const { data, error } = await supabase
        .rpc('nearby_spots', {
          user_lat: latitude,
          user_lng: longitude,
          radius_meters: 50000 // Increased to 50km just to be safe for testing
        });

      if (error) {
        console.error("Error fetching spots:", error);
      } else {
        console.log("Spots found:", data); // Debugging
        setSpots(data || []);
      }
      setLoading(false);
    }, (err) => {
        console.error(err);
        alert("Please allow location access to find parking.");
        setLoading(false);
    });
  }, []);

  return (
    <div className="relative h-full min-h-screen bg-gray-900 flex flex-col">
      
      {/* Map Background */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-74.5,40,13,0,0/800x1200?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbTVqb...')] bg-cover bg-center"></div>
      
      {/* Search Bar */}
      <div className="relative z-10 p-4 pt-6 bg-gradient-to-b from-[#0a1a2f] to-transparent">
        <div className="bg-[#112240]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search destination..." 
            className="bg-transparent text-white font-medium w-full focus:outline-none placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* The Results Area (Bottom Sheet) */}
      <div className="absolute bottom-20 left-0 right-0 px-4 pb-4 z-20">
        
        {loading ? (
          <div className="bg-[#112240] p-4 rounded-2xl flex items-center justify-center text-white gap-2 shadow-xl">
             <Loader2 className="animate-spin" /> Finding spots near you...
          </div>
        ) : spots.length === 0 ? (
          <div className="bg-[#112240] p-6 rounded-2xl text-center text-white shadow-xl">
            <p className="font-bold">No spots found nearby.</p>
            <p className="text-xs text-gray-400 mt-1">We looked within 50km.</p>
            {myLocation && <p className="text-[10px] text-gray-500 mt-2 font-mono">{myLocation.lat.toFixed(4)}, {myLocation.lng.toFixed(4)}</p>}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-end px-2">
              <h3 className="text-white font-bold drop-shadow-md">{spots.length} Spots Found</h3>
              <button className="p-2 bg-blue-600 rounded-full shadow-lg shadow-blue-600/30">
                <Navigation size={20} className="text-white" />
              </button>
            </div>

            {/* The List of Spots */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
              {spots.map((spot) => (
                <Link href={`/driver/book/${spot.id}`} key={spot.id} className="snap-center block">
                  <div className="w-72 bg-[#112240] border border-white/10 rounded-2xl p-3 shadow-xl active:scale-95 transition-transform">
                    <div className="flex gap-3">
                      {/* Spot Image / Icon */}
                      <div className="w-20 h-20 bg-slate-700 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden relative">
                         {/* If image exists, show it, else show icon */}
                         <Car className="text-slate-400" />
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-white truncate pr-2">{spot.name}</h4>
                          <span className="bg-green-500/20 text-green-400 text-[10px] px-2 py-1 rounded-full font-bold whitespace-nowrap">
                            ₹{spot.price_per_hour}/hr
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-2 mt-1">{spot.address}</p>
                        
                        <div className="flex items-center gap-1 mt-3 text-blue-400 text-xs font-bold">
                           <MapPin size={12} />
                           <span>{spot.distance_meters < 1000 ? `${spot.distance_meters}m` : `${(spot.distance_meters/1000).toFixed(1)}km`} away</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}