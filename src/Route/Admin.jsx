import React from "react";
import Navbar from "../Layout/Navbar/Navbar";
import AdminMain from "./AdminMain";
import './Admin.scss'

const Admin = () => {
  return (
    <div className="admin">
      <Navbar />
      <AdminMain />
    </div>
  );
};

export default Admin;
