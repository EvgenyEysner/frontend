import styles from './loader.module.css'

export const Loader = () => {
  return (
    <div className={styles.spinnerBorder} role='status'>
      <span className={styles.srOnly}>Loading...</span>
    </div>
  )
}
