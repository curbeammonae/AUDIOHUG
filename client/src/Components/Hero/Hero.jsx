import React from 'react'
import './Hero.css'
import headphone1 from "../Assets/one.jpg"
import { Link } from 'react-router-dom'


export default function Hero() {
  return (
    <>
    <div className='hero'>
        <div className="hero-left">
            <span>LATEST PRODUCT</span>
            <h1>SuperSonic Headphones</h1>
            <p>Introducing the SuperSonic Wireless Headphones – your ultimate audio companion for a seamless listening experience.</p>
          
            <Link to='/product/234'>  <button className='hero-button'>See Product</button></Link>
        </div>
        <div className="hero-right">
            <img src={headphone1} alt='headphone1' />
        </div>
    </div>
    </>
  )
}
