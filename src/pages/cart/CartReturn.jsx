import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router'
import TotalReturn from '../../components/Total/TotalReturn'
import {useAuthStore} from '../../store/auth'
import styles from './cart.module.css'
import {useReturnStore} from "../../store/return";
import ReturnItem from "../../components/CartItem/ReturnItem";

function CartReturn() {
  const {isAuth} = useAuthStore()
  const token = useAuthStore.getState().access
  const navigate = useNavigate()
  const [note, setNote] = useState('')
  const [onStockItems, setOnStockItems] = useState(new Map())
  const [isDisabled, setDisabled] = useState(true)

  const {returns, clearReturns} = useReturnStore()

  useEffect(() => {
    const getOnStocks = async () => {
      const newOnStockItems = new Map([])
      setDisabled(true)
      for (const item of returns) {
        fetch(`/api/v1/item/${item.ean}`)
          .then((res) => res.json())
          .then((itemData) => newOnStockItems.set(item.id, itemData.on_stock))
          .catch(() => newOnStockItems.set(item.id, 0))
          .finally(() => {
            setOnStockItems(newOnStockItems)
            setDisabled(false)
          })
      }
    }

    getOnStocks()
  }, [returns.length])

  const handleClick = async () => {
    let allItemsOnStock = true

    for (const item of returns) {
      const currentOnStock = onStockItems.get(item.id)

      if (item.quantity > currentOnStock) {
        allItemsOnStock = false
        break
      }
    }

    if (!allItemsOnStock) return toast.error('Error! Double-check the products!')

    if (isAuth) {
      const data = {
        returns,
        note,
        user: {},
      }
      await fetch('/api/v1/return-request/cart/', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({data, note}),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error()
          navigate('/')
          clearReturns()
        })
        .catch(() => {
          toast.error('Error!')
        })
    }
  }

  return (
    <div className={styles.cart}>
      <div className={styles.cart__left}>
        <div>
          <h3>Auftrag</h3>
          {returns?.map((item) => (
            <ReturnItem
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              unit={item.unit}
              ean={item.ean}
              stock={item.stock}
              onStock={onStockItems.get(item.id)}
              quantity={item.quantity}
              isDisabled={isDisabled}
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
            value={note}
          ></textarea>
        </div>
        <Button
          disabled={isDisabled}
          onClick={handleClick}
          variant='secondary'
          size='sm'
          className='mt-3'
        >
          Abschließen
        </Button>
      </div>
      <div className='cart__right'>
        <TotalReturn/>
      </div>
    </div>
  )
}

export default CartReturn
