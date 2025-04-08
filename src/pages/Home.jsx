import { useState } from 'react'
import { NavLink, Link, Outlet } from "react-router"
import Logo from '../assets/HospitalLogo.jpg'
import '../styles/Home.css'
import Header from '../components/Header.jsx'

function Home() 
{
  return (
    <>
      <div className="home-container">

      <h1>Home</h1>
      
      <div className="links">
      
        <Link to="calendar">Calendar</Link>
      
      </div>
        
      
      </div>
    </>
  )
}

export default Home


