import React from 'react'
import "./Attendance.scss"
import Employee from '../../../../src/assets/images.png'
import AttendanceGraph from './AttendanceGraph'
import AttendanceEmployee from './AttendanceEmployee'
import { useEffect } from 'react';
import { useGetEmployeesQuery } from '../../../features/employee/employeeApi'; // Import the query hook
// import { useGetEmployeesCountMutation } from '../../../features/employee/employeeApi'; 



const AdminAttendance = () => {
//   const { data: employees, isFetching } = useGetEmployeesQuery(); // Query to get all employees
//   // const [getEmployeesCount, { data: employeeCount }] = useGetEmployeesCountMutation(); // Mutation to get employee count

//   useEffect(() => {
//     getEmployeesCount(); // Fetch the employee count when component mounts
//   }, [getEmployeesCount]);

  return (
  <div className="main-adminattendance">
    <h2>Attendance Statics</h2>
    {/* <div className="admin-card">
    // <div className="card">
    //   <div className="card-content">
    //     <h3 className="title">
    //      Total Employees</h3>
    //      <div className="img">
    //   <img src={Employee} alt="" />
    //   <p>{employeeCount}</p>
    //    </div>
    //   </div>
    // </div>
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
    */}
    <div className="AttendanceEmployee">
      <AttendanceEmployee/>
    </div>
    <div className="graph">
      <AttendanceGraph/>
    </div>
    </div>
  )
}

export default AdminAttendance