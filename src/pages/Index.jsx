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

        <div className="bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 text-4xl font-bold text-white p-8 rounded-lg shadow-lg transform hover:scale-110 transition-transform duration-300 ease-in-out">
  Tailwind is Working!
</div>


          <img src={Logo} className="logo" alt="Vite logo" />
        </div>
        </a>
      </div>
      <h1>SYS PROJEKT Patient Assist</h1>
    </>
  )
}

export default Index
