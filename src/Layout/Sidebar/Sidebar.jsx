import React from 'react'
import './Sidebar.scss'
import SideProfile from '../../component/SideProfile'
import SideMenu from '../../component/SideMenu'
import logout from '../../assets/logout-line-icon-vector-46979846.webp'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="SideProfile">
      <SideProfile/>
      </div>
      <div className="sidenav-menu">
      <SideMenu/>
      </div> 
     {/* <div className="logout">
        <img src={logout} alt="" />
        </div> */}
    </div>
  )
}

export default Sidebar