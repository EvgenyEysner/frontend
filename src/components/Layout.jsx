import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import { NavBar } from './Header/NavBar'

export const Layout = () => {
  return (
    <>
      <NavBar />
      <Toaster />
      <div className='px-3 pb-3 flex-grow-1 bg-white bg-body-dark'>
        <Outlet />
      </div>
    </>
  )
}
