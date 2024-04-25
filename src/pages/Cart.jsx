import './cart.css'
import Total from '../components/Total'
import CartItem from '../components/CartItem'
import {useSelector} from 'react-redux'
import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import {client} from "../api/api";

function Cart() {
    const [data, setData] = useState({
        cart: {},
        note: ''
    })
    const [note, setNote] = useState(null)
    const cart = useSelector((state) => state.cart)

    useEffect(() => {
        setData(cart)
    }, [cart])


    function handleClick() {
        client.post('cart/', {
            data,
            note
        })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
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