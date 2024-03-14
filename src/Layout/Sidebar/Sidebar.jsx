import React from 'react'
import './Sidebar.scss'
import SideProfile from '../../component/SideProfile'
import SideMenu from '../../component/SideMenu'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="SideProfile">
      <SideProfile/>
      </div>
      <div className="sidenav-menu">
      <SideMenu/>
      </div>   
    </div>
  )
}

export default Sidebar