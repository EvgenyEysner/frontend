// import Container from 'react-bootstrap/Container'
// import Navbar from 'react-bootstrap/Navbar'
// import {FaHelmetSafety} from 'react-icons/fa6'
// import {Link} from 'react-router-dom'


import {SideBar} from "./Drawler";
import useLogout from "../../hooks/useLogout";

export const ReturnRequestNavBar = () => {
    return (
        <nav className="bg-gray-800">
            <SideBar/>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    </div>
                </div>
            </div>
        </nav>
    )
}