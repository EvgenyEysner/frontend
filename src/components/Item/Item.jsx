import { useCartStore } from '../../store/cart'
import styles from './item.module.css'

function Item({ id, name, image, description, ean, stock, onStock }) {
  const { cart, addToCart, incrementQuantity, decrementQuantity, removeItem } = useCartStore()
  const currentItem = cart.find((el) => el.id === id)

  return (
    <div className={styles.item}>
      <div className={styles.item__info}>
        <p className={styles.item__title}>Name: {name}</p>
        <p className={styles.item__title}>Description: {description}</p>
        <p className={styles.item__title}>EAN: {ean}</p>
        <p className={styles.item__price}>Stock: {stock}</p>
        <p className={styles.item__price}>On stock: {onStock}</p>
      </div>
      <img loading='lazy' src={image} alt={image.name} />
      {!currentItem && (
        <button
          onClick={() =>
            addToCart({
              id,
              name,
              image,
              description,
              ean,
              stock,
            })
          }
        >
          Add to Cart
        </button>
      )}

      {currentItem && (
        <>
          <div className={styles.cartItem__incrDec}>
            <button disabled={currentItem.quantity === 1} onClick={() => decrementQuantity(id)}>
              -
            </button>
            <p>{currentItem.quantity}</p>
            <button
              disabled={currentItem.quantity === onStock}
              onClick={() => incrementQuantity(id)}
            >
              +
            </button>
          </div>
          <button onClick={() => removeItem(id)}>Remove at cart</button>
        </>
      )}
    </div>
  )
}

export default Item
