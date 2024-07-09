import React from "react";
import {Route, Routes} from "react-router";
import {Scanner} from "./Scanner";
import {Home} from "./Home";
import Cart from "./Cart";
import {Login} from "./Login";
import {PrivateRoute} from "../components/PrivateRoute"
import {Layout} from "../components/Layout"
import {Main} from "./Main";

export const Page = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Layout/>}>
                <Route element={<PrivateRoute/>}>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/scan" element={<Scanner/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/result/:name" element={<Home/>}/>
                </Route>
            </Route>
        </Routes>
    )
}