import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { AuthRoutes } from './components/Routes/AuthRoutes'
// import {Page} from "./pages/Page";
import React from 'react'
import { Footer } from './components/Footer/Footer'

function App() {
  return (
    <>
      <AuthRoutes />
      <Footer />
    </>
  )
}

export default App
