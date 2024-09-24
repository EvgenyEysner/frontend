import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import CartItem from '../../components/CartItem/CartItem'
import Total from '../../components/Total/Total'
import { useAuthStore } from '../../store/auth'
import { useCartStore } from '../../store/cart'
import { Button, TextField } from '@mui/material';

function Cart() {
  const { isAuth } = useAuthStore()
  const token = useAuthStore.getState().access
  const navigate = useNavigate()
  const [note, setNote] = useState('')
  const [onStockItems, setOnStockItems] = useState(new Map())
  const [isDisabled, setDisabled] = useState(true)

  const { cart, clearCart } = useCartStore()

  useEffect(() => {
    const getOnStocks = async () => {
      const newOnStockItems = new Map([])
      setDisabled(true)
      for (const item of cart) {
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
  }, [cart.length])

  const handleClick = async () => {
    let allItemsOnStock = true

    for (const item of cart) {
      const currentOnStock = onStockItems.get(item.id)

      if (item.quantity > currentOnStock) {
        allItemsOnStock = false
        break
      }
    }

    if (!allItemsOnStock) return toast.error('Error! Double-check the products!')

    if (isAuth) {
      const data = {
        cart,
        note,
        user: {},
      }
      await fetch('/api/v1/cart/', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ data, note }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error()
          navigate('/')
          clearCart()
        })
        .catch(() => {
          toast.error('Error!')
        })
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-3/4 p-4">
        <div>
          <h3 className="text-xl font-semibold mb-4">Auftrag</h3>
          {cart?.map((item) => (
            <CartItem
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
        <div className="flex flex-col mt-4" id="text">
          <label className="mb-2 font-medium" htmlFor="text">
            Notiz
          </label>
          <TextField
            id="text"
            label="Notiz"
            multiline
            rows={8}
            variant="outlined"
            onChange={(event) => setNote(event.target.value)}
            value={note}
            fullWidth
            disabled={isDisabled}
          />
        </div>
        <Button
          variant="contained"
          color="inherit"
          size="small"
          onClick={handleClick}
          className="mt-4"
          disabled={isDisabled}
        >
          Abschließen
        </Button>
      </div>
      <div className="w-full md:w-1/4 p-4">
        <Total/>
      </div>
    </div>

)
}

export default Cart
