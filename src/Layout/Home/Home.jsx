import React from 'react'
import './Home.scss'
import Sidebar from '../Sidebar/Sidebar'
import Main from '../Main/Main'
import Dashboard from '../../Pages/Admin/Dashboard'
import { Route, Routes } from 'react-router-dom';
import Attendance from '../../Pages/Employee/Attendance/Attendance'
import Payroll from '../../Pages/Employee/Payroll/Payroll'
import DashboardLeft from '../../Pages/Employee/DashboardLeft'


const Home = () => {
  return (
    <div className='hero'>
      <Sidebar/>
      <div className="main-contents">
                
                <Routes>
                    <Route path="/main" element={<DashboardLeft/>}/>
                    {/* <Route path="/admin" element={<Dashboard />} /> */}
                    <Route path="/payroll" element={<Payroll />} />
                    <Route path="/attendance" element={<Attendance/>} />
                  
                
                </Routes>
        </div>
      </div>
  )
}

export default Home