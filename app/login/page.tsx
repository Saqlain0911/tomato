"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

// We need Suspense to safely read URL parameters in Next.js
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#0a1a2f] flex items-center justify-center text-white">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get the role from the URL (default to driver if missing)
  const role = searchParams.get("role") === "partner" ? "partner" : "driver";
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Initialize Supabase
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1. Send Magic Link (Simpler than SMS for now)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // This redirects them back to the right dashboard after login
        emailRedirectTo: `${window.location.origin}/auth/callback?role=${role}`,
        data: {
          role: role, // Saves the role in their user metadata
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a1a2f] p-4 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#A3FF12]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Header Logo */}
        <Link href="/" className="block text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">ParkEasy</h1>
        </Link>

        <div className="bg-[#112240]/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          
          {/* Dynamic Title based on Role */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {role === "partner" ? "Partner Login" : "Driver Login"}
            </h2>
            <p className="text-gray-400 text-sm">
              {role === "partner" 
                ? "Manage your spots and earnings." 
                : "Find and book parking instantly."}
            </p>
          </div>

          {sent ? (
            // Success State
            <div className="text-center space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-400">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl text-white font-semibold">Check your Email</h3>
              <p className="text-gray-400 text-sm">
                We sent a magic link to <strong>{email}</strong>.<br/>
                Click it to log in automatically.
              </p>
              <button 
                onClick={() => setSent(false)}
                className="text-blue-400 text-sm hover:underline mt-4"
              >
                Try a different email
              </button>
            </div>
          ) : (
            // Login Form
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  className="w-full bg-[#0a1a2f] border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2
                  ${role === 'partner' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-800 hover:shadow-[0_0_30px_rgba(37,99,235,0.3)]' 
                    : 'bg-gradient-to-r from-[#1A73E8] to-[#0F4C99] hover:shadow-[0_0_30px_rgba(26,115,232,0.3)]'}
                  ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'}
                `}
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>
                    Send Magic Link <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Role Switcher */}
        <div className="text-center mt-6">
          <Link 
            href={`/login?role=${role === 'partner' ? 'driver' : 'partner'}`}
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            Not a {role === "partner" ? "Partner" : "Driver"}? <span className="underline">Switch Role</span>
          </Link>
        </div>

      </div>
    </div>
  );
}