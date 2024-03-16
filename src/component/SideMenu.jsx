import React from 'react'
import { NavLink } from 'react-router-dom';
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
          path: "/main",
        },
        {
          name: "Attendance",
          icon: Attendance,
          path: "/attendance",
        },
        {
          name: "Payroll",
          icon: Payroll,
          path: "/payroll",
        },
        // {
        //   name: "Schedule",
        //   icon: Payroll,
        //   path: "/admin/schedule",
        // },
     
      ];
  return (
    <div className="sidemenu">
    <div className='heading'>
      <p>Menu</p>
    </div>
    <div className="menu-down">
    {menuItems &&
          menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}

            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </NavLink>
          ))}

    </div>
    
  </div>
  )
}

export default SideMenu