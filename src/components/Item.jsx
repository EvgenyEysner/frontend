import './item.css'
import { useDispatch } from 'react-redux';
import {addToCart} from '../redux/cartSlice';

function Item({id, name, image, description, ean, stock}) {

  const dispatch = useDispatch()

  return (
    <div className="item">
      <div className="item__info">
        <p className="item__title">{name}</p>
        <p className="item__title">{description}</p>
        <p className="item__title">{ean}</p>
        <p className="item__price">{stock}</p>
      </div>
      <img
        src={image}
        alt={image.name}
      />
      <button 
        onClick={() => 
          dispatch(addToCart({
            id, name, image, description, ean, stock
          }))
        }>Add to Cart
      </button>
    </div>
  )
}

export default Item