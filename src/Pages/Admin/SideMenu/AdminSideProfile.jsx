import React from 'react'
import Avator from '../../../assets/Avatar.png'
import  './AdminSideProfile.scss'

const AdminSideProfile = () => {
  return (
         <div className='sideProfile1'>
        <div className="SideImage1">
            <img src={Avator} alt="" />
            <div className="leftprofile1">
            <p className="Profilename">Name</p>
            {/* <p className="Profilename">Name</p> */}
            </div>
        </div>

   
    </div>
  )
}

export default AdminSideProfile