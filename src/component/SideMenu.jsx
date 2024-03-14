import React from 'react'
import dashboard from '../assets/calendar.png'
import Attendance from '../assets/briefcase.png'
import Payroll from '../assets/Group.png'
import Schedule from '../assets/layout-grid.png'
// import { NavLink } from 'react-router-dom';
import './SideMenu.scss'


const SideMenu = () => {
    const menuItems = [
        {
          name: "Dashboard",
          icon: dashboard,
          path: "/dashboard",
        },
        {
          name: "Attendance",
          icon: Attendance,
        //   path: "/friends",
        },
        {
          name: "Payroll",
          icon: Payroll,
          path: "/payroll",
        },
        {
          name: "Schedule",
          icon: Schedule,
          path: "/schedule",
        },
     
      ];
  return (
    <div className="sidemenu">
    <div className='heading'>
      <p>Menu</p>
    </div>
    <div className="menu-down">
    {menuItems &&
        menuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <img src={item.icon} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}

    </div>
    
  </div>
  )
}

export default SideMenu