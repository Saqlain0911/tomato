"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { QrReader } from "react-qr-reader";
import { ArrowLeft, Zap, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ScannerPage() {
  const [data, setData] = useState("No Result");
  const [status, setStatus] = useState<"idle" | "success" | "error" | "penalty">("idle");
  const [message, setMessage] = useState("");
  const [manualId, setManualId] = useState("");
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleScan = async (result: any, error: any) => {
    if (!!result) {
      processBooking(result?.text);
    }
  };

  const processBooking = async (bookingId: string) => {
    if (status !== "idle") return; // Don't double scan
    setData(bookingId);
    
    // 1. Fetch Booking
    const { data: booking, error } = await supabase
      .from("bookings")
      .select("*, parking_spots(name)")
      .eq("id", bookingId)
      .single();

    if (error || !booking) {
      setStatus("error");
      setMessage("Invalid Ticket ID");
      return;
    }

    // 2. Logic: Check In vs Check Out
    if (booking.status === "upcoming") {
      // CHECK IN
      await supabase
        .from("bookings")
        .update({ status: "active", entry_time: new Date().toISOString() })
        .eq("id", bookingId);
      
      setStatus("success");
      setMessage(`Welcome to ${booking.parking_spots.name}`);
    
    } else if (booking.status === "active") {
      // CHECK OUT (Simple version for now)
      await supabase
        .from("bookings")
        .update({ status: "completed", exit_time: new Date().toISOString() })
        .eq("id", bookingId);
      
      setStatus("success");
      setMessage("Exit Approved. Good bye!");
    } else {
      setStatus("error");
      setMessage(`Ticket is ${booking.status}`);
    }
  };

  // Reset to scan next car
  const resetScanner = () => {
    setStatus("idle");
    setData("No Result");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <Link href="/partner/dashboard" className="p-2 bg-white/10 rounded-full">
          <ArrowLeft />
        </Link>
        <span className="font-bold text-sm uppercase tracking-widest opacity-70">Scanner Active</span>
        <div className="w-10"></div>
      </div>

      {/* CAMERA VIEWPORT */}
      <div className="flex-1 relative flex items-center justify-center bg-gray-900 overflow-hidden">
        {status === "idle" && (
           <div className="w-full h-full relative">
             {/* The actual Camera component */}
             <QrReader
                onResult={handleScan}
                constraints={{ facingMode: 'environment' }}
                className="w-full h-full object-cover"
                videoContainerStyle={{ height: '100%', paddingTop: 0 }}
                videoStyle={{ objectFit: 'cover' }}
             />
             
             {/* Overlay Box */}
             <div className="absolute inset-0 border-[40px] border-black/50 flex items-center justify-center">
               <div className="w-64 h-64 border-2 border-blue-500 rounded-2xl relative animate-pulse">
                 <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-blue-400 -mt-1 -ml-1"></div>
                 <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-blue-400 -mt-1 -mr-1"></div>
                 <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-blue-400 -mb-1 -ml-1"></div>
                 <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-blue-400 -mb-1 -mr-1"></div>
               </div>
             </div>
           </div>
        )}

        {/* RESULTS OVERLAY */}
        {status === "success" && (
          <div className="absolute inset-0 bg-green-600 flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
             <CheckCircle size={80} className="text-white mb-4" />
             <h1 className="text-4xl font-bold text-white mb-2">ACCESS GRANTED</h1>
             <p className="text-green-100 text-lg">{message}</p>
             <button onClick={resetScanner} className="mt-8 bg-white text-green-700 px-8 py-3 rounded-full font-bold">Scan Next Car</button>
          </div>
        )}

        {status === "error" && (
          <div className="absolute inset-0 bg-red-600 flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
             <XCircle size={80} className="text-white mb-4" />
             <h1 className="text-4xl font-bold text-white mb-2">ACCESS DENIED</h1>
             <p className="text-red-100 text-lg">{message}</p>
             <button onClick={resetScanner} className="mt-8 bg-white text-red-700 px-8 py-3 rounded-full font-bold">Try Again</button>
          </div>
        )}
      </div>

      {/* Manual Entry Fallback (Since we can't scan screens easily) */}
      <div className="bg-gray-900 p-6 pb-12 rounded-t-3xl border-t border-white/10 z-20">
         <p className="text-xs text-center text-gray-500 mb-4 uppercase tracking-wider">Camera not working?</p>
         <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Enter Booking ID (e.g. a0e0...)" 
              className="flex-1 bg-black border border-gray-700 rounded-xl px-4 py-3 text-white font-mono focus:border-blue-500 outline-none"
              value={manualId}
              onChange={(e) => setManualId(e.target.value)}
            />
            <button 
              onClick={() => processBooking(manualId)}
              className="bg-blue-600 px-6 rounded-xl font-bold text-white"
            >
              <Zap size={20} />
            </button>
         </div>
      </div>

    </div>
  );
}