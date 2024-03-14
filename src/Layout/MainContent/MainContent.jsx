import React from 'react'
import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
import './MainContent.scss'

const MainContent = () => {
  return (
    <div className='app'>
       <Navbar/>
       <Home/> 

    </div>
  )
}

export default MainContent