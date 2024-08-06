import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthRoutes } from './components/Routes/AuthRoutes'
// import {Page} from "./pages/Page";
import React from 'react'
import { Footer } from './components/Footer/Footer'

function App() {
  return (
    <div className='d-flex flex-column' style={{ minHeight: window.innerHeight + 'px' }}>
      <AuthRoutes />
      <Footer />
    </div>
  )
}

export default App
