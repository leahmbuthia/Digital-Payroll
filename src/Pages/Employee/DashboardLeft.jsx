import React, { useState, useEffect } from "react";
import Avator from "../../assets/Avatar.png";
import edit from "../../assets/edit-512.webp";
import del from "../../assets/del.png";
import "./DashboardLeft.scss";
import { createPortal } from 'react-dom';
import { ToasterContainer } from "../../Toaster"; // Import toaster components
import { useGetEmployeeQuery } from "../../features/employee/employeeApi";
import UpdateEmployeeModal from "../Admin/UpdateEmployeeModal";
import EditSingleEmployee from "./EditSingleEmployee";

const DashboardLeft = (employee) => {
  const [userInput, setUserInput] = useState(""); // State to hold user input for search
  const [loggedInUser, setLoggedInUser] = useState(null); // State to hold the logged-in user's details

  const [showEditModal , setEditShowModal] =useState(false);

  // const { data: employees = [], isLoading, isError } = useGetEmployeeQuery();
  useEffect(() => {
    // Retrieve logged-in employee data from local storage
    const loggedInEmployeeData = JSON.parse(
      localStorage.getItem("loggedInEmployee")
    );
    if (loggedInEmployeeData) {
      setLoggedInUser(loggedInEmployeeData);
    }
    // console.log(loggedInEmployeeData);
  }, []);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };
   
  const handleEdit =(employee) =>{

    setLoggedInUser(employee);
    setEditShowModal(true);
  }
  return (
    <>
      <ToasterContainer /> {/* Render ToasterContainer */}
      <div className="leah">
        <div className="topper">
          <div className="tit">
            <h2 className="title">Profile Details</h2>
          </div>
          <div className="details-img">
            <img src={edit} alt="" onClick={() => handleEdit(employee)} />
          </div>
        </div>
        <div className="profile">
          {loggedInUser && (
            <div className="profile-details list" key={loggedInUser.EmployeeID}>
              <img src={Avator} alt="Avatar" />
              <div className="modal-Details">
                <div className="first-details">
                  <div className="employee-inputs">
                    <strong>Employee ID:</strong> {loggedInUser.EmployeeID}
                  </div>
                  <div>
                    <strong>FirstName:</strong> {loggedInUser.FirstName}
                  </div>
                  <div className="employee-inputs">
                    <strong>LastName:</strong> {loggedInUser.LastName}
                  </div>
                  <div className="employee-inputs">
                    <strong>Address:</strong> {loggedInUser.Address}
                  </div>
                  <div className="employee-inputs">
                    <strong>DOB:</strong> {loggedInUser.DOB}
                  </div>
                  <div className="employee-inputs">
                    <strong>Email:</strong> {loggedInUser.Email}
                  </div>
                  <div className="employee-inputs">
                    <strong>Phone NO:</strong> {loggedInUser.PhoneNo}
                  </div>
                </div>
                <div className="employee-detail">
                  <div className="employee-inputs">
                    <strong>Gender:</strong> {loggedInUser.Gender}
                  </div>
                  <div className="employee-inputs">
                    <strong>Position:</strong> {loggedInUser.Position}
                  </div>
                  <div className="employee-inputs">
                    <strong>Schedule:</strong> {loggedInUser.Schedule}
                  </div>
                  <div className="employee-inputs">
                    <strong>Role:</strong> {loggedInUser.Role}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="modal-container">
        {
          showEditModal && createPortal(
            <EditSingleEmployee setShowModal={setEditShowModal} employee={employee} />,
            document.body
          )
        }
    </div>
    </>
  );
};

export default DashboardLeft;
