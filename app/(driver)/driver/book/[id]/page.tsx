"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { ArrowLeft, Clock, MapPin, Shield, CreditCard, Loader2 } from "lucide-react";
import Link from "next/link";

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [spot, setSpot] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(2); // Default 2 hours
  const [bookingLoading, setBookingLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 1. Fetch Spot Details
  useEffect(() => {
    const fetchSpot = async () => {
      const { data, error } = await supabase
        .from("parking_spots")
        .select("*")
        .eq("id", id)
        .single();
      
      if (data) setSpot(data);
      setLoading(false);
    };
    fetchSpot();
  }, [id]);

  // 2. Handle Payment & Booking
  const handleBooking = async () => {
    setBookingLoading(true);

    // Get User
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.push("/login");

    // Calculate Times
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);
    
    // Generate Fake QR String (In real life, this is encrypted)
    const qrCode = `PARK_${id}_${user.id}_${Date.now()}`;

    // Insert Booking
    const { data, error } = await supabase.from("bookings").insert({
      user_id: user.id,
      spot_id: id,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      total_amount: spot.price_per_hour * duration,
      status: 'upcoming',
      qr_code: qrCode
    }).select().single();

    if (error) {
      alert("Booking Failed: " + error.message);
      setBookingLoading(false);
    } else {
      // Success! Go to Ticket Page
      router.push(`/driver/ticket/${data.id}`);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#0a1a2f] flex items-center justify-center text-white">Loading...</div>;
  if (!spot) return <div className="min-h-screen bg-[#0a1a2f] flex items-center justify-center text-white">Spot not found</div>;

  return (
    <div className="min-h-screen bg-[#0a1a2f] text-white pb-24">
      
      {/* Header Image */}
      <div className="relative h-64 bg-slate-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a2f] to-transparent"></div>
        
        <Link href="/driver/home" className="absolute top-6 left-6 p-2 bg-black/30 backdrop-blur-md rounded-full hover:bg-black/50 transition-colors">
          <ArrowLeft size={24} />
        </Link>
      </div>

      <div className="px-6 -mt-10 relative z-10">
        
        {/* Title Card */}
        <div className="bg-[#112240] border border-white/10 p-6 rounded-3xl shadow-2xl">
          <h1 className="text-2xl font-bold">{spot.name}</h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
            <MapPin size={16} />
            <p>{spot.address}</p>
          </div>
          <div className="mt-4 flex gap-2">
            <Badge icon={<Shield size={12} />} text="Secure Gate" />
            <Badge icon={<Clock size={12} />} text="24/7 Access" />
          </div>
        </div>

        {/* Duration Slider */}
        <div className="mt-8">
          <div className="flex justify-between items-end mb-4">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Duration</span>
            <span className="text-2xl font-bold text-blue-400">{duration} Hours</span>
          </div>
          
          <input 
            type="range" 
            min="1" 
            max="12" 
            step="1" 
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
            <span>1h</span>
            <span>12h</span>
          </div>
        </div>

        {/* Bill Summary */}
        <div className="mt-8 bg-[#112240]/50 rounded-2xl p-4 border border-white/5 space-y-3">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Rate</span>
            <span>₹{spot.price_per_hour} / hr</span>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Time</span>
            <span>{duration} Hours</span>
          </div>
          <div className="h-px bg-white/10 my-2"></div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-white">Total To Pay</span>
            <span className="text-2xl font-bold text-[#A3FF12]">₹{spot.price_per_hour * duration}</span>
          </div>
        </div>

      </div>

      {/* Sticky Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#0a1a2f] border-t border-white/10 backdrop-blur-xl z-50">
        <button 
          onClick={handleBooking}
          disabled={bookingLoading}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          {bookingLoading ? <Loader2 className="animate-spin" /> : <CreditCard size={20} />}
          Swipe to Pay ₹{spot.price_per_hour * duration}
        </button>
      </div>

    </div>
  );
}

function Badge({ icon, text }: any) {
  return (
    <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-gray-300">
      {icon} <span>{text}</span>
    </div>
  );
}