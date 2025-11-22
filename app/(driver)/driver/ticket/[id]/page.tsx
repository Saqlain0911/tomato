"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { ArrowLeft, MapPin, Clock, Calendar, Share2, Loader2 } from "lucide-react";
import Link from "next/link";

export default function TicketPage() {
  const params = useParams();
  const id = params.id as string;
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const fetchTicket = async () => {
      // Fetch Booking + Spot Details (Joined)
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          parking_spots (
            name,
            address,
            price_per_hour
          )
        `)
        .eq("id", id)
        .single();

      if (error) console.error(error);
      setBooking(data);
      setLoading(false);
    };
    fetchTicket();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#0a1a2f] flex items-center justify-center text-white"><Loader2 className="animate-spin"/></div>;
  if (!booking) return <div className="min-h-screen bg-[#0a1a2f] flex items-center justify-center text-white">Ticket Invalid</div>;

  // Format Times
  const start = new Date(booking.start_time);
  const end = new Date(booking.end_time);

  return (
    <div className="min-h-screen bg-[#0a1a2f] p-6 flex flex-col items-center pt-12">
      
      {/* Header */}
      <div className="w-full max-w-sm flex justify-between items-center mb-8 text-white">
        <Link href="/driver/home" className="p-2 bg-white/10 rounded-full hover:bg-white/20">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold">Entry Pass</h1>
        <button className="p-2 bg-white/10 rounded-full hover:bg-white/20">
          <Share2 size={20} />
        </button>
      </div>

      {/* THE TICKET CARD */}
      <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl relative">
        
        {/* Top Section (Blue) */}
        <div className="bg-blue-600 p-6 text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
               <Clock className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-wide">Upcoming</h2>
            <p className="text-blue-100 text-sm">Show this code at the gate</p>
          </div>
          
          {/* Background Decor */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        {/* Middle Section (Details) */}
        <div className="p-6 space-y-6">
          
          {/* Spot Info */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900">{booking.parking_spots.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{booking.parking_spots.address}</p>
          </div>

          {/* Time Grid */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
             <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Check In</p>
                <p className="text-gray-900 font-bold text-lg">{start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                <p className="text-xs text-gray-500">{start.toLocaleDateString()}</p>
             </div>
             <div className="text-right">
                <p className="text-xs text-gray-400 font-bold uppercase">Check Out</p>
                <p className="text-gray-900 font-bold text-lg">{end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                <p className="text-xs text-gray-500">{end.toLocaleDateString()}</p>
             </div>
          </div>

          {/* QR Code Area */}
          <div className="flex flex-col items-center justify-center py-4 border-t-2 border-dashed border-gray-200 relative">
            {/* Punch Holes */}
            <div className="absolute -left-9 top-[-12px] w-6 h-6 bg-[#0a1a2f] rounded-full"></div>
            <div className="absolute -right-9 top-[-12px] w-6 h-6 bg-[#0a1a2f] rounded-full"></div>

            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${booking.id}`} 
              alt="Entry QR Code" 
              className="w-48 h-48 rounded-lg mix-blend-multiply"
            />
            <p className="text-xs text-gray-400 mt-4 font-mono tracking-widest">ID: {booking.id.slice(0,8)}</p>
          </div>

        </div>
      </div>

      {/* Bottom Action */}
      <div className="mt-8">
         <button className="flex items-center gap-2 text-blue-400 hover:text-white transition-colors text-sm font-semibold">
            <MapPin size={16} /> Get Directions to Gate
         </button>
      </div>

    </div>
  );
}