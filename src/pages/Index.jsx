import { useState } from 'react'
import Logo from '../assets/HospitalLogo.jpg'
import '../styles/Index.css'

function Index() 
{
  return (
    <>
      <div>
        <a href="/" target="_blank">
        <div className="logo">
          <img src={Logo} className="logo" alt="Vite logo" />
        </div>
        </a>
      </div>
      <h1>SYS PROJEKT Patient Assist</h1>
    </>
  )
}

export default Index
