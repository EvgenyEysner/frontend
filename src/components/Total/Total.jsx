import { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import styles from './total.module.css'

function Total() {
  const cart = useSelector((state) => state.cart)

  const totalItems = useMemo(() => {
    let totalQuantity = 0
    cart.forEach((item) => {
      totalQuantity += item.quantity
    })
    return totalQuantity
  }, [cart, cart.length])

  return (
    <div className={styles.total}>
      <h2>Gesamt Auftrag</h2>
      <p className={styles.total__p}>Artikeln gesamt ({totalItems} items)</p>
    </div>
  )
}

export default memo(Total)
