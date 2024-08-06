import { useNavigate } from 'react-router'
import styles from './main.module.css'

export const Main = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className={styles.main}>
        <button className={styles.main__button} onClick={() => navigate('/scan')}>
          <img className={styles.main__img} src='/assets/barcode-scan-icon.svg' alt='scan' />
        </button>
      </div>
    </>
  )
}
