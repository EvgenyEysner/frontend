import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import {ReturnRequestNavBar} from "./Header/ReturnRequestNavBar";

export const ReturnLayout = () => {
  return (
    <>
        <ReturnRequestNavBar/>
      <Toaster />
      <div className='px-3 pb-3 flex-grow-1 bg-white'>
        <Outlet />
      </div>
    </>
  )
}
