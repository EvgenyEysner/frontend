import React from 'react'
import { Route, Routes } from 'react-router'
import Cart from '../../pages/cart/Cart.jsx'
import { Home } from '../../pages/home/Home.jsx'
import { Login } from '../../pages/login/Login.jsx'
import { Main } from '../../pages/main/Main.jsx'
import { Scanner } from '../../pages/scanner/Scanner.jsx'
import { Layout } from '../Layout.jsx'
import { Item } from '../../pages/item/Item.jsx'
import { PrivateRoute } from './PrivateRoute'
import {ItemUpdate} from "../../pages/item/ItemUpdate";
import {ReturnLayout} from "../ReturnLayout";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Layout />}>
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Main />} />
          <Route path='/scan' element={<Scanner />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/items' element={<Item />} />
          <Route path='/edit-item/:name' element={<ItemUpdate />} />
          <Route path='/result/:name' element={<Home />} />
        </Route>
      </Route>
        <Route path='/return-request' element={<ReturnLayout/>}>
            <Route path='/return-request/scan' element={<Scanner />} />
            <Route path='/return-request' element={<Main/>}/>
            <Route path='/return-request/result/:name' element={<Home />} />
            <Route path='/return-request/cart' element={<Cart />} />
        </Route>
    </Routes>
  )
}
