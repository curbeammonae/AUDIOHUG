import React from 'react'
import "./Navbar.css"
import logo from "../../assets/logo1.png"
import navProfile from "../../assets/nav-profile.svg"

export default function Navbar() {
  return (
    <div className='navbar'>
        <img src={logo} alt='' className='nav-logo'/>
        <img src={navProfile} className='nav-profile' alt=''/>
    </div>
  )
}
