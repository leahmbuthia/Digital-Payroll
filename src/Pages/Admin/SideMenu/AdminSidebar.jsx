import React from 'react'
import './AdminSidebar.scss'

import AdminSideMenu from '../SideMenu/AdminSideMenu'
import AdminSideProfile from '../SideMenu/AdminSideProfile'
const AdminSidebar = () => {
  return (
    <div className='sideba'>
      <div className="SideProfil">
      <AdminSideProfile/>
      </div>
      <div className="sidenav-men">
      <AdminSideMenu/>
      </div>   
    </div>
  )
}

export default AdminSidebar