import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';



export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
     
      </BrowserRouter>
    </div>
  )
}
