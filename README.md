# 🍅 ParkEasy (Project Code Name: Tomato)

ParkEasy is a hyper-local parking marketplace connecting vehicle owners with private parking spot owners. Think "Airbnb for Parking."

## 🚀 Features

*   **Dual-Role Architecture:** Single app with distinct flows for Drivers and Partners.
*   **Geospatial Search:** Real-time PostGIS search to find spots within 5km.
*   **QR Entry System:** Encrypted ticket generation and in-browser camera scanning.
*   **Live Booking:** Duration-based booking engine with cost calculation.

## 🛠️ Tech Stack

*   **Framework:** Next.js 15 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Database:** Supabase (PostgreSQL + PostGIS)
*   **Auth:** Supabase Auth (Magic Links)
*   **Deployment:** Vercel

## 📦 Getting Started

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/Saqlain0911/tomato.git
    cd tomato
    ```

2.  **Install dependencies:**
    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_url_here
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
    ```

4.  **Run the server:**
    ```bash
    npm run dev
    ```

## 🗄️ Database Schema

The project relies on Supabase with the `postgis` extension enabled.
Key tables: `users`, `parking_spots` (geography type), `bookings`.

## ⚠️ Known Development Notes
*   **Tailwind:** This project uses Tailwind v3 to ensure compatibility with AI styling tools.
*   **Hydration:** Minor visual hydration mismatch in the Marquee component (safe to ignore).