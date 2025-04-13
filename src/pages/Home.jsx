import { useState } from 'react'
import { NavLink, Link, Outlet } from "react-router"
import Logo from '../assets/HospitalLogo.jpg'
import '../styles/Home.css'
import Header from '../components/Header.jsx'

function Home() 
{
  return (
    <>
      <div className="home__container">

      <div className="home__links">
      
        <Link to="/calendar"> <img src={Logo} /> <h1>Mad bestilling</h1> </Link>
        <Link to="/calendar"> <img src={Logo} /> <h1>Øvelser</h1> </Link>
        <Link to="/calendar"> <img src={Logo} /> <h1>Kontakt</h1> </Link>
        <Link to="/calendar"> <img src={Logo} /> <h1>Hospital info</h1> </Link>
        <Link to="/calendar"> <img src={Logo} /> <h1>Underholdning</h1> </Link>
        <Link to="/calendar"> <img src={Logo} /> <h1>Min SP</h1> </Link>
      
      </div>
        
      
      </div>
    </>
  )
}

export default Home


