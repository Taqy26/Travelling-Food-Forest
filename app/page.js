'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function StasiunScannerUtama() {
  const [status, setStatus] = useState('Initializing scanner system...');
  const scannerInstanceRef = useRef(null);
  const scriptLoadedRef = useRef(false); // Flag to prevent duplicate scripts
  const router = useRouter();

  // Function to run the scanner
  const nyalakanKamera = (Html5QrcodeClass) => {
    try {
      // Clear old instance if it exists
      if (scannerInstanceRef.current) {
        scannerInstanceRef.current.clear().catch(() => {});
      }

      const html5QrCode = new Html5QrcodeClass("reader-hutan-utama");
      scannerInstanceRef.current = html5QrCode;

      html5QrCode.start(
        { facingMode: "environment" },
        { 
          fps: 10, 
          qrbox: { width: 230, height: 230 }
        },
        (hasilScan) => {
          const jenisTanaman = hasilScan.trim().toLowerCase();
          if (['chestnut', 'strawberry', 'mycelium'].includes(jenisTanaman)) {
            html5QrCode.stop().then(() => {
              router.push(`/tanaman/${jenisTanaman}`);
            }).catch(() => {
              router.push(`/tanaman/${jenisTanaman}`);
            });
          } else {
            setStatus(`⚠️ Unknown QR Code target: "${jenisTanaman}"`);
          }
        },
        () => {} // Ignore frame noise errors
      ).then(() => {
        setStatus("📷 Camera active! Please scan the plant's QR code.");
      }).catch((err) => {
        console.error(err);
        setStatus("⚠️ Camera blocked or busy. Please ensure camera permissions are granted!");
      });
    } catch (e) {
      setStatus("⚠️ Re-initializing scanner modules...");
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // If script is already loaded, run camera immediately
    if (scriptLoadedRef.current && window.Html5Qrcode) {
      nyalakanKamera(window.Html5Qrcode);
      return;
    }

    // Inject core script into body
    const script = document.createElement('script');
    script.id = 'html5-qrcode-cdn';
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.8/html5-qrcode.min.js";
    script.async = true;
    
    script.onload = () => {
      scriptLoadedRef.current = true; // Mark script as safely loaded
      if (window.Html5Qrcode) {
        nyalakanKamera(window.Html5Qrcode);
      }
    };

    script.onerror = () => setStatus("❌ Failed to load core scanner library.");
    
    document.body.appendChild(script);

    // Cleanup when user leaves the page
    return () => {
      if (scannerInstanceRef.current && scannerInstanceRef.current.isScanning) {
        scannerInstanceRef.current.stop().catch(() => {});
      }
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#000000',
      fontFamily: 'sans-serif',
      zIndex: 9999
    }}>
      
      {/* GLOBAL CSS OVERRIDE UNTUK MEMAKSA ELEMEN INTERNAL LIBRARY MENJADI FULL LAYAR */}
      <style dangerouslySetInnerHTML={{__html: `
        html, body, main, #__next {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          height: 100% !important;
          overflow: hidden !important;
          background-color: #000000 !important;
        }

        /* Paksa elemen video bawaan library melar penuh menutup layar tanpa merusak engine scanner */
        #reader-hutan-utama video {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }

        /* Bersihkan sisa rendering UI control bawaan library jika tidak sengaja muncul */
        #reader-hutan-utama button,
        #reader-hutan-utama select,
        #reader-hutan-utama span {
          display: none !important;
        }
      `}} />
      
      {/* CONTAINER QR SCANNER - DIUBAH MENJADI FULLSCREEN */}
      <div 
        id="reader-hutan-utama" 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          backgroundColor: '#000000'
        }}
      ></div>
      
      {/* HUD OVERLAY UI CONTAINER (Gaya Konten Tetap Sama & Transparan di Atas Video) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '40px 20px',
        boxSizing: 'border-box',
        pointerEvents: 'none' /* Supaya ketukan jari di layar tembus langsung ke sistem kamera */
      }}>
        
        {/* MAIN HEADER */}
        <div style={{ textAlign: 'center', pointerEvents: 'auto' }}>
          <h1 style={{ color: '#4CAF50', margin: '0 0 5px 0', fontSize: '24px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            🌿 Reizend Voedselbos
          </h1>
          <p style={{ color: '#a5d6a7', fontSize: '13px', margin: 0, fontWeight: '600', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
            Interactive Ecosystem Guide Station
          </p>
        </div>

        {/* CONTAINER KOTAK TENGAH (Sekarang Berfungsi Sebagai Lapisan Bingkai Target Visual Saja) */}
        <div style={{
          width: '240px',
          height: '240px',
          border: '2px dashed #4CAF50',
          borderRadius: '16px',
          boxShadow: '0 0 0 4000px rgba(0, 0, 0, 0.45)', /* Trik menciptakan efek redup di luar kotak target */
          boxSizing: 'border-box'
        }}></div>
        
        {/* SYSTEM STATUS MESSAGES */}
        <div style={{ pointerEvents: 'auto', width: '100%', maxWidth: '340px' }}>
          <p style={{ 
            fontSize: '13px', 
            color: status.includes('⚠️') || status.includes('❌') ? '#ff5252' : '#4CAF50', 
            textAlign: 'center', 
            fontWeight: 'bold',
            margin: '0 0 30px 0', /* Memberikan margin bottom aman agar terangkat dari bar navigasi HP */
            textShadow: '0 2px 4px rgba(0,0,0,1)'
          }}>
            {status}
          </p>
        </div>

      </div>

    </div>
  );
}