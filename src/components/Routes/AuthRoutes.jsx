import React from 'react'
import { Route, Routes } from 'react-router'
import Cart from '../../pages/cart/Cart.jsx'
import { Home } from '../../pages/home/Home.jsx'
import { Login } from '../../pages/login/Login.jsx'
import { Main } from '../../pages/main/Main.jsx'
import { Scanner } from '../../pages/scanner/Scanner.jsx'
import { Layout } from '../Layout.jsx'
import { PrivateRoute } from './PrivateRoute'

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Layout />}>
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Main />} />
          <Route path='/scan' element={<Scanner />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/result/:name' element={<Home />} />
        </Route>
      </Route>
    </Routes>
  )
}
