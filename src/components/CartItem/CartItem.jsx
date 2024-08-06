import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { decrementQuantity, incrementQuantity, removeItem } from '../../redux/cartSlice'
import styles from './cartItem.module.css'

function CartItem({ id, name, image, description, ean, stock, unit, quantity = 0 }) {
  const dispatch = useDispatch()

  return (
    <div className={styles.cartItem}>
      <img className={styles.cartItem__image} src={image} alt='item' />
      <div className={styles.cartItem__info}>
        <p className={styles.cartItem__title}>{name}</p>
        <p className={styles.cartItem__price}>{unit}</p>
        <p className={styles.cartItem__price}>{description}</p>
        <p className={styles.cartItem__price}>{ean}</p>
        <p className={styles.cartItem__price}>{stock}</p>
        <div className={styles.cartItem__incrDec}>
          <button onClick={() => dispatch(decrementQuantity(id))}>-</button>
          <p>{quantity}</p>
          <button onClick={() => dispatch(incrementQuantity(id))}>+</button>
        </div>
        <button className={styles.cartItem__removeButton} onClick={() => dispatch(removeItem(id))}>
          Löschen
        </button>
      </div>
    </div>
  )
}

export default memo(CartItem)
