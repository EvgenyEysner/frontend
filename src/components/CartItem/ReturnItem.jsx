import {memo} from 'react'
import styles from './cartItem.module.css'
import {useReturnStore} from "../../store/return";

function ReturnItem({
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
  const {incrementReturnQuantity, decrementReturnQuantity, removeReturnItem} = useReturnStore()

  return (
    <div className={styles.cartItem}>
      <img className={styles.cartItem__image} src={image} alt={name}/>
      <div className={styles.cartItem__info}>
        <p className={styles.cartItem__title}>{name}</p>
        <p className={styles.cartItem__price}>{unit}</p>
        <p className={styles.cartItem__price}>{description}</p>
        <p className={styles.cartItem__price}>{ean}</p>
        <p className={styles.cartItem__price}>{stock}</p>
        {quantity > onStock ? (
          <p className={styles.onStockError}>Momentan verfügbar {onStock} Artikeln</p>
        ) : (
          <div style={{minHeight: '15px', marginTop: '12px'}}/>
        )}
        <div className={styles.cartItem__incrDec}>
          <button disabled={isDisabled || quantity === 1} onClick={() => decrementReturnQuantity(id)}>
            -
          </button>
          <p>{quantity}</p>
          <button
            disabled={isDisabled || quantity >= onStock}
            onClick={() => incrementReturnQuantity(id)}
          >
            +
          </button>
        </div>
        <button className={styles.cartItem__removeButton} onClick={() => removeReturnItem(id)}>
          Löschen
        </button>
      </div>
    </div>
  )
}

export default memo(ReturnItem)
