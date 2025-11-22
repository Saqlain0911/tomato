# PROJECT CONTEXT: PARK-EASY (MVP Phase 1 Complete)

## 1. Project Status
*   **Current State:** Functional MVP running on Localhost.
*   **Core Loop:** Users can Sign Up -> List Spots (GPS) -> Search Spots (PostGIS) -> Book -> Generate Ticket -> Scan to Enter.
*   **Missing/Next:** Profile Pages, "My Bookings" List, Real Mapbox Integration, Penalty Payment Gateway.

## 2. The Tech Stack (Strict Versioning)
*   **Framework:** Next.js 16.0.3 (App Router).
*   **Language:** TypeScript.
*   **Styling:** Tailwind CSS **v3.4** (Downgraded from v4 for stability).
*   **UI Library:** Shadcn/UI (via v0) + Lucide React Icons.
*   **Database:** Supabase (PostgreSQL) + **PostGIS Extension**.
*   **Auth:** Supabase Auth (Magic Links) with Role-Based Redirects.
*   **Special Libraries:** 
    *   `react-qr-reader` (Requires `--legacy-peer-deps`).
    *   `tw-animate-css` (For landing page animations).
    *   `clsx` & `tailwind-merge` (For UI components).

## 3. Architecture & Folder Structure
*   **Root:**
    *   `/app/page.tsx` -> Public Landing Page (Driver/Partner Split).
    *   `/app/login/page.tsx` -> Universal Login (handles `?role=driver|partner`).
    *   `/app/auth/callback/route.ts` -> Handles Magic Link exchange & redirection.
*   **Driver App (`/app/(driver)/driver/...`):**
    *   `layout.tsx` -> Mobile Shell + Bottom Nav.
    *   `home/page.tsx` -> Location Search + PostGIS Logic + List View.
    *   `book/[id]/page.tsx` -> Duration Slider + Booking Creation.
    *   `ticket/[id]/page.tsx` -> QR Display.
*   **Partner App (`/app/(partner)/partner/...`):**
    *   `layout.tsx` -> Dashboard Shell + Central SCAN Button.
    *   `dashboard/page.tsx` -> Stats + "Add Spot" CTA.
    *   `spots/new/page.tsx` -> GPS Capture + Database Insert.
    *   `scanner/page.tsx` -> Camera/Manual Entry + Check-in/Out Logic.

## 4. Database Schema (Active)

### Table: `users`
*   Syncs with `auth.users` via Trigger `on_auth_user_created`.
*   `id` (uuid), `email` (text), `role` (text), `full_name` (text).

### Table: `parking_spots`
*   `id` (uuid), `owner_id` (uuid).
*   `name`, `address`, `price_per_hour` (numeric).
*   `location` (geography(Point, 4326)) -> **CRITICAL FOR SEARCH**.
*   `total_spots`, `available_spots`.

### Table: `bookings`
*   `id` (uuid), `user_id`, `spot_id`.
*   `start_time`, `end_time` (timestamptz).
*   `status` ('upcoming', 'active', 'completed', 'penalty_due').
*   `qr_code` (text), `total_amount` (numeric).
*   `entry_time`, `exit_time`.

### RPC Function: `nearby_spots`
*   Input: `user_lat`, `user_lng`, `radius_meters`.
*   Output: List of spots sorted by distance.

## 5. Known Hacks & Workarounds
1.  **Map Background:** Driver Home uses a static image URL. Need to replace with `react-map-gl` later.
2.  **Legacy Deps:** When installing new packages, ALWAYS use `npm install [package] --legacy-peer-deps` because of React 19 conflicts.
3.  **Layout Analytics:** Vercel Analytics was removed from `layout.tsx` to prevent crashes.
4.  **Hydration Error:** There is a known minor hydration mismatch in the Trust Marquee (visual only).

## 6. Development Commands
*   **Run Server:** `npm run dev`
*   **Database Access:** Use Supabase Dashboard -> SQL Editor.