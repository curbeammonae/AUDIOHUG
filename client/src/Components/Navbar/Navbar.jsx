import React, { useContext, useState, useRef } from "react";
import "./Navbar.css";
import logo from "../Assets/logo1.png";
import cart from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
// import { ShopContext } from "../../Context/ShopContext";
import dropdown from "../Assets/nav_dropdown.png"

export default function Navbar() {
const [menu, setMenu] = useState("")
// const {getTotalCartItems} = useContext(ShopContext)

//dropdown menu
const menuRef = useRef();

const dropdown_toggle = (e) => {
  menuRef.current.classList.toggle('nav-menu-visible')
  e.target.classList.toggle('open')
}

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
      <img className="nav-dropdown" src={dropdown} onClick={dropdown_toggle} />
      <ul ref={menuRef} className="nav-menu">
        {/* on click, menu = shop,if menu === shop,give it the horizonal line else give it nothing */}
        <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu === "shop" ? <hr/>: <></>}</li>
        <li onClick={()=>{setMenu("earphones")}}><Link style={{textDecoration: 'none'}} to='/earphones'>Earphones</Link>{menu === "earphones" ? <hr/>: <></>}</li>
        <li onClick={()=>{setMenu("headphones")}}><Link style={{textDecoration: 'none'}} to='/headphones'>Headphones</Link>{menu === "headphones" ? <hr/>: <></>}</li>
        <li onClick={()=>{setMenu("speakers")}}><Link style={{textDecoration: 'none'}} to='/speakers'>Speakers</Link>{menu === "speakers" ? <hr/>: <></>}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token")?<button >Logout</button>
        :<Link to='/login'><button>Login</button></Link>}
      
      <Link to='/cart'> <img src={cart} alt="cart_icon" /></Link>
        
        {/* <div className="nav-cart-count">{getTotalCartItems()}</div> */}
      </div>
    </div>
  );
}

