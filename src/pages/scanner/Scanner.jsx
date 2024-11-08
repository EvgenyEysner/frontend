import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styles from './scanner.module.css';
import { BarcodeScanner } from 'react-barcode-scanner';
import 'react-barcode-scanner/polyfill';
import scanSound from '../../assets/audio/scan-sound.mp3'; // Deine Audio-Datei

export const Scanner = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const audioRef = useRef(null); // Ref für den Audio-Element

  useEffect(() => {
    // Audio-Element initialisieren
    audioRef.current = new Audio(scanSound);
    return () => {
      // Beim Unmounten Audio anhalten
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Zurücksetzen der Wiedergabezeit
    };
  }, []);

  const handleScan = (result) => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.error("Audio konnte nicht abgespielt werden:", err));
    }

    setSuccess(true);

    // Navigiere weiter
    navigate(`/result/${result.rawValue}`);

    // Setze den Erfolg nach kurzer Zeit zurück
    setTimeout(() => {
      setSuccess(false);
    }, 1500); // Zeit bis der Erfolg zurückgesetzt wird
  };

  return (
    <>
      <h1 className="fw-semibold fs-3 mt-4">Scan barcode</h1>
      <div className={`${styles.scanner} ${success ? styles['scanner-success'] : ''}`}>
        <BarcodeScanner
          onCapture={handleScan}
          options={{ formats: ['ean_13'] }}
        />
      </div>
    </>
  );
};
