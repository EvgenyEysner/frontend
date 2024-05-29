import './cart.css'
import Total from '../components/Total'
import CartItem from '../components/CartItem'
import {useDispatch, useSelector} from 'react-redux'
import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router";
import {clearCart} from "../redux/cartSlice";

function Cart() {
    const [data, setData] = useState({
        cart: {},
        note: ''
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [note, setNote] = useState(null)
    const cart = useSelector((state) => state.cart)

    useEffect(() => {
        setData(cart)
    }, [cart])


    const handleClick = async () => {
        await fetch(
            // 'https://demo.softeis.net/api/v1/cart',
            'api/v1/cart/', {
                method: 'POST',
                mode: 'cors',
                // credentials: "same-origin",
                // referrerPolicy: "no-referrer",
                body: JSON.stringify({data, note}),
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                },
            }
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

    return (
        <div className="cart">
            <div className="cart__left">
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
                <div className="d-flex flex-column form-outline" id="text">
                    <label className="form-label" htmlFor="text">Notiz</label>
                    <textarea
                        className="form-control"
                        rows={8}
                        onChange={event => setNote(event.target.value)}
                        value={note || ''}
                    >
                    </textarea>
                </div>
                <Button
                    onClick={handleClick}
                    variant="secondary"
                    size="sm"
                    className="mt-3"
                >
                    Abschließen
                </Button>
            </div>
            <div className="cart__right">
                <Total/>
            </div>
        </div>
    )
}

export default Cart