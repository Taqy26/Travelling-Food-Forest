import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Update metadata agar sesuai dengan tema pameran/hackathon kamu
export const metadata = {
  title: "🌿 Reizend Voedselbos - Interactive Guide",
  description: "AR & AI Branching Storytelling Experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{
        margin: 0,
        padding: 0,
        backgroundColor: "#0c110d", // Warna dasar hijau hutan gelap murni (sangat premium)
        color: "#f0f5f1",           // Warna teks putih pudar alami agar mata tidak cepat lelah
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        WebkitFontSmoothing: "antialiased",
      }}>
        {/* Container pembungkus utama khusus device HP (maksimal lebar 480px) 
            Ini trik rahasia agar saat juri membuka lewat laptop ataupun HP, 
            tampilannya akan tetap presisi, rapi, dan terpusat di tengah seperti aplikasi native */}
        <main style={{
          width: "100%",
          maxWidth: "480px", 
          margin: "0 auto",
          minHeight: "100vh",
          boxSizing: "border-box",
          position: "relative",
          backgroundColor: "#111612", // Lapisan hijau gelap sekunder untuk area konten
          boxShadow: "0 0 30px rgba(0,0,0,0.6)" // Efek bayangan estetik di kanan-kiri layar
        }}>
          {children}
        </main>
      </body>
    </html>
  );
}