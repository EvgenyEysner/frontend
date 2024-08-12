import { memo } from 'react'
import { useCartStore } from '../../store/cart'
import styles from './cartItem.module.css'

function CartItem({
  id,
  name,
  image,
  description,
  ean,
  stock,
  unit,
  quantity = 0,
  onStock,
  isDisabled,
}) {
  const { incrementQuantity, decrementQuantity, removeItem } = useCartStore()

  return (
    <div className={styles.cartItem}>
      <img className={styles.cartItem__image} src={image} alt='item' />
      <div className={styles.cartItem__info}>
        <p className={styles.cartItem__title}>{name}</p>
        <p className={styles.cartItem__price}>{unit}</p>
        <p className={styles.cartItem__price}>{description}</p>
        <p className={styles.cartItem__price}>{ean}</p>
        <p className={styles.cartItem__price}>{stock}</p>
        {quantity > onStock ? (
          <p className={styles.onStockError}>На складе сейчас доступно {onStock} товар(ов)</p>
        ) : (
          <div style={{ minHeight: '15px', marginTop: '12px' }} />
        )}
        <div className={styles.cartItem__incrDec}>
          <button disabled={isDisabled || quantity === 1} onClick={() => decrementQuantity(id)}>
            -
          </button>
          <p>{quantity}</p>
          <button
            disabled={isDisabled || quantity >= onStock}
            onClick={() => incrementQuantity(id)}
          >
            +
          </button>
        </div>
        <button className={styles.cartItem__removeButton} onClick={() => removeItem(id)}>
          Löschen
        </button>
      </div>
    </div>
  )
}

export default memo(CartItem)
