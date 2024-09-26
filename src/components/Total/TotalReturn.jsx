import { memo, useMemo } from 'react'
import { useCartStore } from '../../store/cart'
import styles from './total.module.css'
import {useReturnStore} from "../../store/return";

function TotalReturn() {
  const { returns } = useReturnStore()

  const totalItems = useMemo(() => {
    let totalQuantity = 0
    returns.forEach((item) => {
      totalQuantity += item.quantity
    })
    return totalQuantity
  }, [returns, returns.length])

  return (
    <div className={styles.total}>
      <h2>Gesamt Auftrag</h2>
      <p className={styles.total__p}>Artikeln gesamt ({totalItems})</p>
    </div>
  )
}

export default memo(TotalReturn)
