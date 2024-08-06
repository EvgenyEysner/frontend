import React from 'react'

export const Footer = () => {
  return (
    <footer data-bs-theme='dark' className='bg-body-tertiary text-center text-lg-start'>
      <div className='text-center p-3 d-flex flex-column gap-2'>
        <p className='text-white'>&copy; {new Date().getFullYear()} All rights reserved</p>
        <a className='text-body text-white text-decoration-none' href='https://softeis.net/'>
          SoftEis
        </a>
      </div>
    </footer>
  )
}
