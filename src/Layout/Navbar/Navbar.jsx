import React from 'react'
import './Navbar.scss'
import logo from '../../assets/DIGITAL PAYROLL.png'
import Avator from '../../assets/Avatar.png'
import Dropdown from '../../assets/chevron-down.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions here
      // clear local storage
      localStorage.removeItem('loggedInUser');
    navigate('/'); 
    // Hide the logout statement after logout
  }
  return (
    <div className='nav'>
       <div className="logo">
        <img src={logo} alt="" />
            <p>Digital Payroll</p>
        </div>
        <div className="profile">
            <img src={Avator} alt=''/>
            <img src={Dropdown} alt="" onClick={handleLogout} />
           
        </div>
    </div>
  )
}

export default Navbar