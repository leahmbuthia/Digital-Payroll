import React from 'react'
import "./Attendance.scss"
import Employee from '../../../../src/assets/images.png'
import AttendanceGraph from './AttendanceGraph'
import AttendanceEmployee from './AttendanceEmployee'



const AdminAttendance = () => {
  return (
  <div className="main-adminattendance">
    <div className="admin-card">
    <div className="card">
      <div className="card-content">
        <h3 className="title">
         Total Employees</h3>
         <div className="img">
      <img src={Employee} alt="" />
       <p>Number of Employee</p>
       </div>
      </div>
    </div>
    <div className="card">
      <div className="card-content">
        <h3 className="title">
         Total Employees</h3>
         <div className="img">
      <img src={Employee} alt="" />
       <p>Number of Employee</p>
       </div>
       
      </div>
    </div>
    <div className="card">
      <div className="card-content">
        <h3 className="title">
         Total Employees</h3>
         <div className="img">
      <img src={Employee} alt="" />
       <p>Number of Employee</p>
       </div>
       
      </div>
    </div>
    </div>
   
    <div className="AttendanceEmployee">
      <AttendanceEmployee/>
    </div>
    {/* <div className="graph">
      <AttendanceGraph/>
    </div> */}
    </div>
  )
}

export default AdminAttendance