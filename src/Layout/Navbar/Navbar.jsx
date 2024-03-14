import React from 'react'
import './Navbar.scss'
import logo from '../../assets/DIGITAL PAYROLL.png'
import Avator from '../../assets/Avatar.png'
import Dropdown from '../../assets/chevron-down.png'


const Navbar = () => {
  return (
    <div className='nav'>
       <div className="logo">
        <img src={logo} alt="" />
            <p>Digital Payroll</p>
        </div>
        <div className="profile">
            <img src={Avator} alt=''/>
            <img src={Dropdown} alt="" />
        </div>
    </div>
  )
}

export default Navbar