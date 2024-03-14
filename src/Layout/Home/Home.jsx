import React from 'react'
import './Home.scss'
import Sidebar from '../Sidebar/Sidebar'
import Main from '../Main/Main'
import Dashboard from '../../Pages/Admin/Dashboard'
import { Route, Routes } from 'react-router-dom';
import Attendance from '../../Pages/Employee/Attendance/Attendance'
import Payroll from '../../Pages/Employee/Payroll/Payroll'
import Add from '../../Pages/Admin/AddEmployee/Add'
import AdminAttendance from '../../Pages/Admin/Attendance/AdminAttendance'
import AdminSchedule from '../../Pages/Admin/Schedule/AdminSchedule'
import AdminPayroll from '../../Pages/Admin/Payroll/AdminPayroll'


const Home = () => {
  return (
    <div className='hero'>
      <Sidebar/>
      <div className="main-contents">
                
                <Routes>
                    <Route path="/main" element={<Main/>}/>
                    <Route path="/admin" element={<Dashboard />} />
                    <Route path="/payroll" element={<Payroll />} />
                    <Route path="/attendance" element={<Attendance/>} />
                    <Route path="/add" element={<Add/>}/>
                    <Route path="/adminAttend" element={<AdminAttendance/>} />
                    <Route path="/admin/schedule" element={<AdminSchedule/>}/>
                    <Route path="/admin/payroll" element={<AdminPayroll/>}/>
                    {/* <Route path="/friends" element={<Friends/>} />
                    <Route path="/groups" element={<Groups/>} />
                   <Route path="/videos" element={<Videos/>}/>
                   <Route path="/Photos" element={<PhotosPages/>}/>
                   <Route path="/events" element={<Events/>}/> */}
                
                </Routes>
        </div>
      </div>
  )
}

export default Home