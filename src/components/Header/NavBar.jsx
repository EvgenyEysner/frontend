import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { FaHelmetSafety } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { SideBar } from './SideBar'

export const NavBar = () => {
  return (
    <Navbar expand='lg' data-bs-theme='dark' className='py-0'>
      <Container fluid className='bg-body-tertiary'>
        <SideBar />
        <Link to={'/'} className='w-12 aspect-square py-1'>
          <FaHelmetSafety size={48} color='white' />
        </Link>
      </Container>
    </Navbar>
  )
}
