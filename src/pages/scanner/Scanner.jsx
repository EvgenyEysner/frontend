import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import styles from './scanner.module.css';
import {BarcodeScanner} from 'react-barcode-scanner';
import 'react-barcode-scanner/polyfill';

export const Scanner = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCapture = (result) => {
    if (result?.rawValue) {
      setError(null);
      navigate(`/result/${result.rawValue}`);
    } else {
      setError('Barcode kann nicht gelesen werden. Versuchen Sie es erneut.');
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <h1 className={styles.title}>📸 Scannen ... </h1>

      {/* Scanner Box */}
      <div className={styles.scannerBox}>
        <div className={styles.scanner}>
          <BarcodeScanner
            onCapture={handleCapture}
            options={{
              formats: ['ean_13'],
              resolution: 640,
              zoom: 1.5,
              scanDelay: 300,
            }}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Instruction */}
      <p className={styles.instruction}>
        Vergewissern Sie sich, dass sich der Barcode innerhalb des Rahmens befindet und stabil ist, um optimale
        Ergebnisse zu erzielen.
      </p>
    </div>
  );
};
