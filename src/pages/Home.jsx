import Item from '../components/Item'
import './home.css'
import {ShoppingCart} from '@mui/icons-material'
import {useSelector} from 'react-redux';
import React, {useEffect, useRef, useState} from 'react'
import {useNavigate, useParams} from 'react-router'
import {Loader} from '../UI/Loader'
import {client} from "../api/api";

export const Home = () => {

    const navigate = useNavigate()
    const cart = useSelector((state) => state.cart)

    const button = useRef(null)
    const [isLoading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState('')
    const [bottom, setBottom] = useState(0)
    const params = useParams()

    const getTotalQuantity = () => {
        let total = 0
        cart.forEach(item => {
            total += item.quantity
        })
        return total
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            client.get(`item/${params.name}`)
                .then(function (response) {
                    console.log(response)
                    setData(response.data)
                })
                .catch(function (error) {
                    setError(error)
                    console.error(error)
                })
                .finally(function () {
                        setLoading(false)
                    }
                )
        }
        fetchData()
    }, [params.name])

    useEffect(() => {
        if (button.current) {
            setBottom(button.current.offsetHeight)
        }
    }, [button])

    if (isLoading)
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
                    <Loader/>
                </div>
                <div className="result__button" ref={button}>
                    <button onClick={() => navigate('/')}>Scan again</button>
                </div>
            </>
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
                    <p className="result__error">{error}</p>
                </div>
                <div className="result__button" ref={button}>
                    <button onClick={() => navigate('/scan')}>Scan again</button>
                </div>
            </>
        )

    return (
        <div className="home">
            <div className="home__container">
                <div className="home__row">
                    <Item
                        id={data.id}
                        name={data.name}
                        description={data.description}
                        ean={data.ean}
                        stock={data.stock}
                        image={data.image}
                    />
                </div>
            </div>
            <div className='shopping-cart' onClick={() => navigate('/cart')}>
                <ShoppingCart id='cartIcon'/>
                <p>{getTotalQuantity() || 0}</p>
            </div>
        </div>
    )
}