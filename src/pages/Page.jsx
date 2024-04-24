import React from "react";
import {Route, Routes} from "react-router";
import {Scanner} from "./Scanner";
import {Main} from "./Main";
import Container from 'react-bootstrap/Container';
import Home from "./Home";
import Cart from "./Cart";

export const Page = () => {
    return (
        <Container>
            <Routes>
                <Route path="/scan" element={<Scanner />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/result/:name" element={<Home />} />
                <Route path="*" element={<Main to="/" />} />
            </Routes>
        </Container>
    )
}