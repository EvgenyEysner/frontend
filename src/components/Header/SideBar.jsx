import { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { FaUser } from 'react-icons/fa'
import { FaBarcode, FaBars, FaCartShopping, FaHouse } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

export const SideBar = () => {
  const [show, setShow] = useState(false)

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
              to={'#link'}
              className='d-flex gap-2 align-items-center text-decoration-none'
              style={{ color: '#2b3035' }}
            >
              <FaUser size={24} /> Benutzer
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
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
