import React from 'react'
import Avator from '../assets/Avatar.png'
import './SideProfile.scss'
const SideProfile = () => {
  return (
    <div className='sideProfile'>
        <div className="SideImage">
            <img src={Avator} alt="" />
            <div className="leftprofile">
            <p className="Profilename">Name</p>
            </div>
        </div>

    </div>
  )
}

export default SideProfile