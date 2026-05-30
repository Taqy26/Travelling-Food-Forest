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
        // Menggunakan foto hutan sebagai background global
        // Pastikan file gambarnya ada di public/images/forest_bg.jpg
        backgroundImage: "url('/images/forest_bg.jpg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        WebkitFontSmoothing: "antialiased",
        color: "#0a2a0a", // Teks hijau tua agar kontras dengan background cerah
      }}>
        <main style={{
          width: "100%",
          maxWidth: "480px", 
          margin: "0 auto",
          minHeight: "100vh",
          boxSizing: "border-box",
          position: "relative",
          // Warna putih pudar transparan untuk area konten agar teks mudah dibaca
          backgroundColor: "rgba(255, 255, 255, 0.85)", 
          backdropFilter: "blur(5px)", // Efek blur estetik
          boxShadow: "0 0 20px rgba(0,0,0,0.2)",
          padding: "20px"
        }}>
          {children}
        </main>
      </body>
    </html>
  );
}