import { useState } from 'react'
import { NavLink, Link, Outlet } from "react-router"
import Logo from '../assets/HospitalLogo.jpg'
import '../styles/Index.css'
import Header from '../components/Header.jsx'
import { useSettings } from "../components/SettingsContext";

function Index() 
{
  return (
    <>
      <div className="index-container">
      
      <Header />
      
      <div className="index-content">

        <Outlet />
      
      </div>
      
      
      </div>
    </>
  )
}

export default Index
