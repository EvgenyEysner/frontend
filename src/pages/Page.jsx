import React from "react";
import {Route, Routes} from "react-router";
import {Scanner} from "./Scanner";
import {Main} from "./Main";
import {Home} from "./Home";
import Cart from "./Cart";
import {Login} from "./Login";

export const Page = () => {
    return (
        <Routes>
            <Route path="/scan" element={<Scanner/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/result/:name" element={<Home/>}/>
            <Route path="*" element={<Main to="/"/>}/>
        </Routes>
    )
}