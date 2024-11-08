import React from 'react';
import { useNavigate } from 'react-router';
import styles from './scanner.module.css';
import toast from "react-hot-toast";
import { BarcodeScanner } from 'react-barcode-scanner';

export const Scanner = () => {
  const navigate = useNavigate();

  const handleCapture = (result) => {
    try {
      navigate(`/result/${result.rawValue}`);
    } catch (error) {
      console.error("Error navigating to result:", error);
      toast.error("An error occurred while scanning. Please try again.");
    }
  };

  return (
    <>
      <h1 className="fw-semibold fs-3 mt-4 text-center">Scan barcode</h1>
      <div className={styles.scanner}>
        <BarcodeScanner
          onCapture={handleCapture}
          options={{ formats: ['ean_13'] }}
        />
      </div>
    </>
  );
};
