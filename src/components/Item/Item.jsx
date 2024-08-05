import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decrementQuantity, incrementQuantity, removeItem } from '../../redux/cartSlice'
// import './item.css'
import styles from './item.module.css'

function Item({ id, name, image, description, ean, stock }) {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const currentItem = cart.find((el) => el.id === id)

  return (
    <div className={styles.item}>
      <div className={styles.item__info}>
        <p className={styles.item__title}>{name}</p>
        <p className={styles.item__title}>{description}</p>
        <p className={styles.item__title}>{ean}</p>
        <p className={styles.item__price}>{stock}</p>
      </div>
      <img src={image} alt={image.name} />
      {!currentItem && (
        <button
          onClick={() =>
            dispatch(
              addToCart({
                id,
                name,
                image,
                description,
                ean,
                stock,
              }),
            )
          }
        >
          Add to Cart
        </button>
      )}

      {currentItem && (
        <div className={styles.cartItem__incrDec}>
          <button
            onClick={() => {
              if (currentItem.quantity === 1) dispatch(removeItem(id))
              else dispatch(decrementQuantity(id))
            }}
          >
            -
          </button>
          <p>{currentItem.quantity}</p>
          <button onClick={() => dispatch(incrementQuantity(id))}>+</button>
        </div>
      )}
    </div>
  )
}

export default Item
