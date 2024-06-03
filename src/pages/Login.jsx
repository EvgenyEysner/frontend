import React, {useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";
// import {client} from "../api/products";
import {useNavigate} from 'react-router'

export const Login = () => {
    const [currentUser, setCurrentUser] = useState({
        'email': "",
        'password': ""
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    console.log(email, password)

    // useEffect(() => {
    //     fetch("api/v1/user", {
    //         method: 'GET'
    //     })
    //         .then(function (res) {
    //             setCurrentUser(true);
    //         })
    //         .catch(function (error) {
    //             setCurrentUser(false);
    //         });
    // }, []);

    function submitLogin(e) {
        e.preventDefault();
        fetch(
            "api/v1/login/",
            {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({email, password}),
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': 'nuqFzumo8avSIQuuXDzBP2HOLYVPtK90'
                },
                withCredentials: true,
            }
        ).then(function (res) {
            setCurrentUser(true);
        });
        e.target.reset()
        // navigate('/')
    }

    // function submitLogout(e) {
    //     e.preventDefault();
    //     client.post(
    //         "/logout",
    //         {withCredentials: true}
    //     ).then(function (res) {
    //         setCurrentUser(false);
    //     });
    // }

    return (
        <Container className="mt-5 container-sm w-25">
            <Form onSubmit={e => submitLogin(e)}>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={10}>
                        <Form.Control type="email" placeholder="Email" value={email}
                                      onChange={e => setEmail(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={10}>
                        <Form.Control type="password" placeholder="Password" value={password}
                                      onChange={e => setPassword(e.target.value)}/>
                    </Col>
                </Form.Group>
                <Col sm={{span: 10, offset: 2}}>
                    <Button type="submit">Log In</Button>
                </Col>
            </Form>
        </Container>
    )
}