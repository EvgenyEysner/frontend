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
          <div className='flex flex-col gap-3'>
            <Link onClick={handleClose} to={'/'} className='flex gap-2 items-center'>
              <FaHouse size={24} /> Home
            </Link>
            <Link onClick={handleClose} to={'#link'} className='flex gap-2 items-center'>
              <FaUser size={24} /> Benutzer
            </Link>
            <Link onClick={handleClose} to={'/scan'} className='flex gap-2 items-center'>
              <FaBarcode size={24} /> Scanner
            </Link>
            <Link onClick={handleClose} to={'/cart'} className='flex gap-2 items-center'>
              <FaCartShopping size={24} /> Korb
            </Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
