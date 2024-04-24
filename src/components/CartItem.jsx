import './cartItem.css'
import {incrementQuantity, decrementQuantity, removeItem} from '../redux/cartSlice'
import {useDispatch} from 'react-redux'

function CartItem({id, name, image, description, ean, stock, unit, quantity = 0}) {
    const dispatch = useDispatch()

    return (
        <div className="cartItem">
            <img className="cartItem__image" src={image} alt='item'/>
            <div className="cartItem__info">
                <p className="cartItem__title">{name}</p>
                <p className="cartItem__price">{unit}</p>
                <p className="cartItem__price">{description}</p>
                <p className="cartItem__price">{ean}</p>
                <p className="cartItem__price">{stock}</p>
                <div className='cartItem__incrDec'>
                    <button onClick={() => dispatch(decrementQuantity(id))}>-</button>
                    <p>{quantity}</p>
                    <button onClick={() => dispatch(incrementQuantity(id))}>+</button>
                </div>
                <button
                    className='cartItem__removeButton'
                    onClick={() => dispatch(removeItem(id))}>
                    Löschen
                </button>
            </div>
        </div>
    )
}

export default CartItem