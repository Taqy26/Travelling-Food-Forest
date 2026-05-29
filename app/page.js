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
      backgroundColor: '#0c0f0d',
      color: '#fff',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ marginBottom: '25px', textAlign: 'center' }}>
        <h1 style={{ color: '#4CAF50', margin: '0 0 5px 0', fontSize: '24px', fontWeight: 'bold' }}>
          🌿 Reizend Voedselbos
        </h1>
        <p style={{ color: '#88998a', fontSize: '13px', margin: 0 }}>Interactive Ecosystem Guide Station</p>
      </div>

      <div style={{ width: '100%', maxWidth: '360px' }}>
        {/* Container Scanner - Pastikan id ini sesuai */}
        <div 
          id="reader-hutan-utama" 
          style={{ 
            backgroundColor: '#131814', 
            borderRadius: '16px', 
            overflow: 'hidden', 
            border: '2px dashed #4CAF50', 
            minHeight: '260px'
          }}
        ></div>
        
        <p style={{ fontSize: '13px', color: '#FFEB3B', marginTop: '15px', textAlign: 'center' }}>
          {status}
        </p>

        <div style={{ marginTop: '35px', borderTop: '1px solid #1f2821', paddingTop: '15px' }}>
          <p style={{ fontSize: '11px', color: '#576f5b', marginBottom: '10px', fontWeight: 'bold' }}>
            ⚡ QUICK SIMULATION:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button onClick={() => handleBypass('/tanaman/chestnut')} style={{ padding: '14px', backgroundColor: '#17221a', color: '#4CAF50', border: '1px solid #2d4433', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
              🌳 Go to Chestnut
            </button>
            <button onClick={() => handleBypass('/tanaman/strawberry')} style={{ padding: '14px', backgroundColor: '#241717', color: '#ff5252', border: '1px solid #442d2d', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
              🍓 Go to Strawberry
            </button>
            <button onClick={() => handleBypass('/tanaman/mycelium')} style={{ padding: '14px', backgroundColor: '#171d24', color: '#29b6f6', border: '1px solid #2d3b44', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
              🍄 Go to Mycelium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}