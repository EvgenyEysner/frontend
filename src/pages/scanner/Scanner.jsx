import React from 'react'
import { useNavigate } from 'react-router'
import styles from './scanner.module.css'

import { BarcodeScanner } from 'react-barcode-scanner'
import 'react-barcode-scanner/polyfill'

export const Scanner = () => {
  const navigate = useNavigate()

  return (
    <>
      <h1 className='fw-semibold fs-3 mt-4'>Scan barcode</h1>
      <div className={styles.scanner}>
        <BarcodeScanner
          onCapture={(result) => navigate(`/result/${result.rawValue}`)}
          options={{ formats: ['ean_13'] }}
        />
      </div>
    </>
  )
}
