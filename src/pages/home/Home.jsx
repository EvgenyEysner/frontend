import {ShoppingCart} from '@mui/icons-material'
import React, {useEffect, useMemo, useRef, useState} from 'react'
import {useNavigate, useParams} from 'react-router'
import {Item} from '../../components/Item/Item'
import {useCartStore} from '../../store/cart'
import {Loader} from '../../UI/loader/Loader'
import styles from './home.module.css'
import {useAuthStore} from "../../store/auth";

export const Home = () => {
  const navigate = useNavigate()
  const button = useRef(null)
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const params = useParams()
  const token = useAuthStore.getState().access

  const {cart} = useCartStore()
  const getTotalQuantity = useMemo(() => {
    let total = 0
    cart.forEach((item) => {
      total += item.quantity
    })
    return total
  }, [cart])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/v1/item/${params.name}`, {
          method: 'GET',
          mode: 'cors',
          body: JSON.stringify(),
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error()

        const result = await res.json()
        setData(result)
      } catch (e) {
        setError('Artikel nicht gefunden')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.name])

  if (isLoading)
    return (
      <div className='d-flex gap-4 pt-5 justify-content-center'>
        <Loader/>
      </div>
    )

  if (error.length !== 0 || !data)
    return (
      <>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '30px',
          }}
        >
          <p className={styles.result__error}>{error}</p>
        </div>
        <div className={styles.result__button} ref={button}>
          <button onClick={() => navigate('/scan')}>Scan again</button>
        </div>
      </>
    )

  return (
    <>
      <Item
        id={data.id}
        name={data.name}
        description={data.description}
        ean={data.ean}
        stock={data.stock}
        onStock={data.on_stock}
        category={data.category}
        image={data.image}
      />
      <div className={styles.shopping__cart} onClick={() => navigate('/cart')}>
        <ShoppingCart id='cartIcon' style={{width: '28px', height: '28px', color: 'white'}}/>
        {getTotalQuantity !== 0 && <p>{getTotalQuantity > 99 ? '99+' : getTotalQuantity}</p>}
      </div>
    </>
  )
}
