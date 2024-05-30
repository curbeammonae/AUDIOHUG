import React from 'react'
import './Footer.css'
import logo from '../Assets/logo1.png'
import ig from '../Assets/instagram_icon.png'
import pin from '../Assets/pintester_icon.png'
import whatsapp from "../Assets/whatsapp_icon.png"

export default function Footer() {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={logo} alt=''/>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={ig} alt=''/>
            </div>
            <div className="footer-icons-container">
                <img src={pin} alt=''/>
            </div>
            <div className="footer-icons-container">
                <img src={whatsapp} alt=''/>
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright 2024 - All Rights Reserved</p>
        </div>
    </div>
  )
}
