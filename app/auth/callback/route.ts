import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  // 1. Get the code and role from the URL
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const role = searchParams.get("role") || "driver"; // Default to driver if missing
  const next = searchParams.get("next") ?? (role === 'partner' ? '/partner/dashboard' : '/driver/home');

  if (code) {
    const cookieStore = await cookies();

    // 2. Initialize Supabase
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    // 3. Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // 4. If successful, forward to the dashboard
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // If something breaks, send them back to login
  return NextResponse.redirect(new URL("/login?error=auth_code_error", request.url));
}