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
      padding: '30px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'transparent',
      fontFamily: 'sans-serif'
    }}>
      {/* MAIN HEADER */}
      <div style={{ marginBottom: '25px', textAlign: 'center' }}>
        <h1 style={{ color: '#2e7d32', margin: '0 0 5px 0', fontSize: '24px', fontWeight: 'bold' }}>
          🌿 Reizend Voedselbos
        </h1>
        <p style={{ color: '#2e4d2e', fontSize: '13px', margin: 0, fontWeight: '600' }}>
          Interactive Ecosystem Guide Station
        </p>
      </div>

      <div style={{ width: '100%', maxWidth: '360px' }}>
        {/* QR SCANNER CONTAINER (GLASSMORPHISM STYLE) */}
        <div 
          id="reader-hutan-utama" 
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.65)', 
            backdropFilter: 'blur(10px)', 
            borderRadius: '16px', 
            overflow: 'hidden', 
            border: '2px dashed #4CAF50', 
            minHeight: '260px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)'
          }}
        ></div>
        
        {/* SYSTEM STATUS MESSAGES */}
        <p style={{ fontSize: '13px', color: '#d32f2f', marginTop: '15px', textAlign: 'center', fontWeight: 'bold' }}>
          {status}
        </p>
      </div>
    </div>
  );
}