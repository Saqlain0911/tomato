# PROJECT CONTEXT: PARK-EASY (Code Name: Tomato)

## 1. Project Overview
*   **App Name:** ParkEasy
*   **Core Concept:** "Book My Parking."
*   **Architecture:** A single Next.js Monorepo simulating two native apps via Route Groups.
    *   **Driver App:** `/app/(driver)` -> Maps, Booking, Payment.
    *   **Partner App:** `/app/(partner)` -> Dashboard, QR Scanner, Revenue.
*   **Target Market:** India (Metro Cities).

## 2. Tech Stack (Current Status)
*   **Frontend:** Next.js 15 (App Router).
*   **Core Library:** React 19.
*   **Styling:** Tailwind CSS (Mobile-First Design).
*   **Icons:** Lucide React.
*   **Scanner:** react-qr-reader (Installed via legacy-peer-deps).
*   **Backend:** Supabase.
    *   **Database:** PostgreSQL.
    *   **Geo-Engine:** PostGIS Extension (ENABLED).
    *   **Auth:** Supabase Auth (Phone/OTP).

## 3. Database Schema (To Be Built)
*   **Table: users**
    *   `id` (uuid, PK, links to auth.users)
    *   `phone` (text)
    *   `role` (text: 'driver' | 'partner')
    *   `full_name` (text)
    *   `vehicle_number` (text, nullable)
    *   `created_at` (timestamptz)

*   **Table: parking_spots**
    *   `id` (uuid, PK)
    *   `owner_id` (uuid, FK to users)
    *   `name` (text)
    *   `location` (geography(Point, 4326)) -- CRITICAL: PostGIS Type
    *   `address` (text)
    *   `price_per_hour` (numeric)
    *   `total_spots` (int)
    *   `image_url` (text)
    *   `is_active` (boolean)

*   **Table: bookings**
    *   `id` (uuid, PK)
    *   `user_id` (uuid, FK to users)
    *   `spot_id` (uuid, FK to parking_spots)
    *   `start_time` (timestamptz)
    *   `end_time` (timestamptz)
    *   `status` (text: 'upcoming', 'active', 'completed', 'cancelled', 'penalty_due')
    *   `total_amount` (numeric)
    *   `qr_code` (text, unique string)
    *   `entry_time` (timestamptz, nullable)
    *   `exit_time` (timestamptz, nullable)

## 4. Critical Logic Rules (For AI)
*   **Location Search:** MUST use Supabase RPC function `nearby_spots` to query the `location` column. Do not calculate distance in Javascript.
*   **Scanning:**
    *   Entry: Update `status` to 'active' only if `now() < end_time`.
    *   Exit: If `now() > end_time`, set `status` to 'penalty_due' and block exit until payment.
*   **Design System:**
    *   Use "Tech Automotive" colors (Electric Blue #1A73E8, Dark Navy #0A1A2F).
    *   Mobile layouts must hide browser scrollbars and feel native.

## 5. Next.js 15 Constraints
*   **Async Params:** In `page.tsx`, `params` and `searchParams` are Promises. Always `await` them.
*   **Server Actions:** Use Server Actions for all database mutations (booking, adding spots).