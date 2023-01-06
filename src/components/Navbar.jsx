import React from 'react'
import logo from '../assets/Graviti Logo 1.png'
import './navbar.css'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <div>
            <a href='#'>
                <img src={logo} />
            </a>
        </div>
    </nav>
  )
}

export default Navbar