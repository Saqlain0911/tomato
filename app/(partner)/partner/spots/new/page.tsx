"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { MapPin, Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddSpotPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState("idle"); // idle | locating | success | error

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    price: "50",
    spots: "10",
    lat: null as number | null,
    lng: null as number | null,
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 1. Get GPS Location
  const getLocation = () => {
    setLocationStatus("locating");
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setLocationStatus("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }));
        setLocationStatus("success");
      },
      (error) => {
        console.error(error);
        alert("Unable to retrieve your location");
        setLocationStatus("error");
      }
    );
  };

  // 2. Save to Database
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.lat || !formData.lng) {
      alert("Please capture the location first!");
      return;
    }

    setLoading(true);

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in!");
      router.push("/login");
      return;
    }

    // Insert into Supabase
    const { error } = await supabase.from("parking_spots").insert({
      owner_id: user.id,
      name: formData.name,
      address: formData.address,
      price_per_hour: parseFloat(formData.price),
      total_spots: parseInt(formData.spots),
      available_spots: parseInt(formData.spots),
      is_active: true,
      // CRITICAL: PostGIS Format
      location: `POINT(${formData.lng} ${formData.lat})`, 
    });

    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      alert("Spot Created Successfully! 🅿️");
      router.push("/partner/dashboard");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/partner/dashboard" className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-white">Add New Spot</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400 uppercase">Spot Name</label>
          <input 
            required
            type="text" 
            placeholder="e.g. Green Valley Society"
            className="w-full bg-[#0F172A] border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400 uppercase">Full Address</label>
          <textarea 
            required
            placeholder="Gate No. 2, Main Street..."
            className="w-full bg-[#0F172A] border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none h-24"
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />
        </div>

        {/* Location Capture (The Cool Part) */}
        <div className="p-4 border border-blue-500/30 bg-blue-500/10 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-blue-400 uppercase">Exact Location</label>
            {locationStatus === "success" && <span className="text-xs text-green-400 font-bold">✓ Captured</span>}
          </div>
          
          <button 
            type="button"
            onClick={getLocation}
            disabled={locationStatus === "success" || locationStatus === "locating"}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {locationStatus === "locating" ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <MapPin size={18} />
            )}
            {locationStatus === "success" ? "Location Set" : "Use Current GPS"}
          </button>
          
          {formData.lat && (
            <p className="text-[10px] text-slate-500 mt-2 text-center font-mono">
              {formData.lat.toFixed(6)}, {formData.lng.toFixed(6)}
            </p>
          )}
        </div>

        {/* Pricing & Spots */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400 uppercase">Price / Hour (₹)</label>
            <input 
              type="number" 
              value={formData.price}
              className="w-full bg-[#0F172A] border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400 uppercase">Total Slots</label>
            <input 
              type="number" 
              value={formData.spots}
              className="w-full bg-[#0F172A] border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({...formData, spots: e.target.value})}
            />
          </div>
        </div>

        {/* Submit */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-4 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-colors mt-8"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
          Publish Parking Spot
        </button>

      </form>
    </div>
  );
}