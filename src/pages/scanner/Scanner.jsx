import React from 'react'
import BarcodeScannerComponent from 'react-qr-barcode-scanner'
import { useNavigate } from 'react-router'
import styles from './scanner.module.css'

export const Scanner = () => {
  const navigate = useNavigate()

  return (
    <>
      <h1 className='fw-semibold fs-3 mt-4'>Scan barcode</h1>
      <div className={styles.scanner}>
        <BarcodeScannerComponent
          onUpdate={(_err, result) => {
            if (result) navigate(`/result/${result.getText()}`)
          }}
        />
      </div>
    </>
  )
}
