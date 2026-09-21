import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/logo.png'
import navProfile from '../../assets/admin profile.png'

const Navbar = ({setToken}) => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="" className="nav-logo"/>
      <div className="nav-right">
        <button onClick={()=>setToken('')} className='nav_button'>Logout</button>
        <img src={navProfile} className='nav-profile' alt="" />
      </div>        
    </div>
  )
}

export default Navbar