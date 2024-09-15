import { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { FaUser, FaServer } from 'react-icons/fa'
import {
  FaArrowRightFromBracket,
  FaBarcode,
  FaBars,
  FaCartShopping,
  FaHouse,
} from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import useLogout from '../../hooks/useLogout'

export const SideBar = () => {
  const [show, setShow] = useState(false)
  const logout = useLogout()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <FaBars size={48} color={'white'} onClick={handleShow} />

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menü</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='d-flex flex-column gap-3'>
            <Link
              onClick={handleClose}
              to={'/'}
              className='d-flex gap-2 align-items-center text-decoration-none'
              style={{ color: '#2b3035' }}
            >
              <FaHouse size={24} /> Home
            </Link>
            <Link
              onClick={handleClose}
              to={'/items'}
              className='d-flex gap-2 align-items-center text-decoration-none'
              style={{ color: '#2b3035' }}
            >
              <FaServer size={24} /> Bestand
            </Link>
            <Link
              onClick={handleClose}
              to={'/scan'}
              className='d-flex gap-2 align-items-center text-decoration-none'
              style={{ color: '#2b3035' }}
            >
              <FaBarcode size={24} /> Scanner
            </Link>
            <Link
              onClick={handleClose}
              to={'/cart'}
              className='d-flex gap-2 align-items-center text-decoration-none'
              style={{ color: '#2b3035' }}
            >
              <FaCartShopping size={24} /> Korb
            </Link>
            <Link
                onClick={handleClose}
                to={'/return-request'}
                className='d-flex gap-2 align-items-center text-decoration-none'
                style={{ color: '#2b3035' }}
            >
              <FaCartShopping size={24} /> Rückgabe
            </Link>
            <button
              className='d-flex gap-2 align-items-center text-decoration-none p-0'
              style={{ color: '#2b3035', background: 'none', outline: 'none', border: 'none' }}
              onClick={logout}
            >
              <FaArrowRightFromBracket size={24} />
              Logout
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
