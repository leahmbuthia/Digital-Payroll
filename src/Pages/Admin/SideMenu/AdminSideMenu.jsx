import React from 'react'
import { NavLink } from 'react-router-dom';
import dashboard from '../../../assets/calendar.png'
import Attendance from '../../../assets/briefcase.png'
import Payroll from '../../../assets/Group.png'
// import dash from '../../../assets/dash.png'
import Schedule from '../../../assets/layout-grid.png'
import { MdDelete } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import './AdminSideMenu.scss'


const AdminSideMenu = () => {
    const menuItems = [
        {
          name: "Dashboard",
          icon: dashboard,
          path: "/admin",
        },
        {
          name: "Attendance",
          icon: Attendance,
          path: "/admin/Attendance",
        },
        {
          name: "Payroll",
          icon: Payroll,
          path: "/admin/payroll",
        },
        {
          name: "Schedule",
          icon: Payroll,
          path: "/admin/schedule",
        },
     
      ];
  return (
    <div className="sidemenu1">
    <div className='heading1'>
      <p>Menu</p>
    </div>
    <div className="menu-down1">
    {menuItems &&
          menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? "menu-item active1" : "menu-item1")}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </NavLink>
          ))}

    </div>
    
  </div>
  )
}

export default AdminSideMenu