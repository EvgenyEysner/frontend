import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import CartItem from '../../components/CartItem/CartItem'
import Total from '../../components/Total/Total'
import { useAuthStore } from '../../redux/auth'
import { clearCart } from '../../redux/cartSlice'
import styles from './cart.module.css'

function Cart() {
  const [data, setData] = useState({
    cart: {},
    note: '',
    user: {},
  })

  const { isAuth } = useAuthStore()
  const token = useAuthStore.getState().access
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [note, setNote] = useState(null)
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    setData(cart)
  }, [cart])

  const handleClick = async () => {
    if (isAuth) {
      await fetch(
        // 'https://demo.softeis.net/api/v1/cart',
        '/api/v1/cart/',
        {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({ data, note }),
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      navigate('/')
      dispatch(clearCart())
    }
  }

  return (
    <div className={styles.cart}>
      <div className={styles.cart__left}>
        <div>
          <h3>Auftrag</h3>
          {cart?.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              unit={item.unit}
              ean={item.ean}
              stock={item.stock}
              quantity={item.quantity}
            />
          ))}
        </div>
        <div className='d-flex flex-column form-outline mt-2' id='text'>
          <label className='form-label' htmlFor='text'>
            Notiz
          </label>
          <textarea
            className='form-control'
            rows={8}
            onChange={(event) => setNote(event.target.value)}
            value={note || ''}
          ></textarea>
        </div>
        <Button onClick={handleClick} variant='secondary' size='sm' className='mt-3'>
          Abschließen
        </Button>
      </div>
      <div className='cart__right'>
        <Total />
      </div>
    </div>
  )
}

export default Cart
