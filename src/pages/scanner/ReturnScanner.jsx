import React from 'react';
import { useNavigate } from 'react-router';
import styles from './scanner.module.css';

import { BarcodeScanner } from 'react-barcode-scanner';
import toast from "react-hot-toast";

export const ReturnScanner = () => {
  const navigate = useNavigate();

  const handleCapture = (result) => {
    try {
      navigate(`/return-request/result/${result.rawValue}`);
    } catch (error) {
      console.error("Barcode scan failed:", error);
      toast.error("Scan failed. Please try again.");
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
