import React from "react";
import AdminSidebar from "../Pages/Admin/SideMenu/AdminSidebar";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Dashboard from "../Pages/Admin/Dashboard";
import Add from "../Pages/Admin/AddEmployee/Add";
import AdminAttendance from "../Pages/Admin/Attendance/AdminAttendance";
import AdminSchedule from "../Pages/Admin/Schedule/AdminSchedule";
import AdminPayroll from "../Pages/Admin/Payroll/AdminPayroll";
// import SeeMore from "../Pages/Admin/SeeMore";



import "./AdminMain.scss";


const AdminMain = () => {
  return (
    <div className="adminmain">
      <AdminSidebar />
      <div className="main-contents">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/AdminAdd" element={<Add />} />
          <Route path="/Attendance" element={<AdminAttendance />} />
          <Route path="/schedule" element={<AdminSchedule />} />
          <Route path="/payroll" element={<AdminPayroll />} />
          {/* <Route path="/seemore" element={<SeeMore />} /> */}
        
        </Routes>
      </div>
    </div>
  );
};

export default AdminMain;
