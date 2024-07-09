import React from 'react'
import {Outlet} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import {useNavigate} from 'react-router'
import {NavBar} from "./Header/NavBar";

export const Layout = () => {
    const navigate = useNavigate()
    return (
        <div>
            <NavBar/>
            <Toaster/>
            <div className='min-h-[1000px] bg-white dark:bg-gray-900'>
                <Outlet/>
            </div>
        </div>
    )
}
