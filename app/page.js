'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function StasiunScannerUtama() {
  const [status, setStatus] = useState('Memuat sistem scanner...');
  const scannerInstanceRef = useRef(null);
  const scriptLoadedRef = useRef(false); // Flag untuk mencegah script ganda
  const router = useRouter();

  // Fungsi untuk menjalankan scanner
  const nyalakanKamera = (Html5QrcodeClass) => {
    try {
      // Bersihkan instance lama jika ada
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
            setStatus(`⚠️ QR Code tidak dikenal: "${jenisTanaman}"`);
          }
        },
        () => {} // Abaikan error frame (noise)
      ).then(() => {
        setStatus("📷 Kamera Aktif! Silakan scan QR Code tanaman.");
      }).catch((err) => {
        console.error(err);
        setStatus("⚠️ Kamera diblokir/sibuk. Pastikan izin kamera sudah diberikan!");
      });
    } catch (e) {
      setStatus("⚠️ Mengulang inisialisasi modul...");
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Jika script sudah pernah di-load, langsung jalankan
    if (scriptLoadedRef.current && window.Html5Qrcode) {
      nyalakanKamera(window.Html5Qrcode);
      return;
    }

    // Jika belum, suntik script ke body
    const script = document.createElement('script');
    script.id = 'html5-qrcode-cdn';
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.8/html5-qrcode.min.js";
    script.async = true;
    
    script.onload = () => {
      scriptLoadedRef.current = true; // Tandai script sudah aman
      if (window.Html5Qrcode) {
        nyalakanKamera(window.Html5Qrcode);
      }
    };

    script.onerror = () => setStatus("❌ Gagal memuat library scanner.");
    
    document.body.appendChild(script);

    // Cleanup saat user pindah halaman
    return () => {
      if (scannerInstanceRef.current && scannerInstanceRef.current.isScanning) {
        scannerInstanceRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const handleBypass = (rute) => {
    if (scannerInstanceRef.current && scannerInstanceRef.current.isScanning) {
      scannerInstanceRef.current.stop().finally(() => router.push(rute));
    } else {
      router.push(rute);
    }
  };

  return (
    <div style={{
      padding: '30px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'transparent', // Menghapus latar belakang hitam pekat
      fontFamily: 'sans-serif'
    }}>
      {/* HEADER UTAMA */}
      <div style={{ marginBottom: '25px', textAlign: 'center' }}>
        <h1 style={{ color: '#2e7d32', margin: '0 0 5px 0', fontSize: '24px', fontWeight: 'bold' }}>
          🌿 Reizend Voedselbos
        </h1>
        <p style={{ color: '#2e4d2e', fontSize: '13px', margin: 0, fontWeight: '600' }}>
          Interactive Ecosystem Guide Station
        </p>
      </div>

      <div style={{ width: '100%', maxWidth: '360px' }}>
        {/* CONTAINER SCANNER QR (GLASSMORPHISM STYLE) */}
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
        
        {/* STATUS KETERANGAN SCANNER */}
        <p style={{ fontSize: '13px', color: '#d32f2f', marginTop: '15px', textAlign: 'center', fontWeight: 'bold' }}>
          {status}
        </p>

        {/* CONTAINER TOMBOL SIMULASI (BYPASS) */}
        <div style={{ marginTop: '35px', borderTop: '1px solid rgba(76, 175, 80, 0.2)', paddingTop: '20px' }}>
          <p style={{ fontSize: '11px', color: '#2e7d32', marginBottom: '12px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
            ⚡ QUICK SIMULATION:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            {/* BUTTON CHESTNUT */}
            <button 
              onClick={() => handleBypass('/tanaman/chestnut')} 
              style={{ padding: '14px', backgroundColor: '#ffffff', color: '#2e7d32', border: '1px solid #c8e6c9', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
            >
              🌳 <span style={{ flex: 1 }}>Go to Chestnut</span> ➔
            </button>
            
            {/* BUTTON STRAWBERRY */}
            <button 
              onClick={() => handleBypass('/tanaman/strawberry')} 
              style={{ padding: '14px', backgroundColor: '#ffffff', color: '#c62828', border: '1px solid #ffcdd2', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
            >
              🍓 <span style={{ flex: 1 }}>Go to Strawberry</span> ➔
            </button>
            
            {/* BUTTON MYCELIUM */}
            <button 
              onClick={() => handleBypass('/tanaman/mycelium')} 
              style={{ padding: '14px', backgroundColor: '#ffffff', color: '#1565c0', border: '1px solid #bbdefb', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
            >
              🍄 <span style={{ flex: 1 }}>Go to Mycelium</span> ➔
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}