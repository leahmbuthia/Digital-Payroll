import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import Avator from "../../assets/Avatar.png";
import edit from "../../assets/edit-512.webp";
import del from "../../assets/del.png";
import {
  useDeleteEmployeeMutation,
  useGetEmployeeQuery,
  useGetEmployeesQuery,
} from "../../features/employee/employeeApi";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  ToasterContainer,
} from "../../Toaster";
// import Avator from '../../assets/Avatar.png'

const Dashboard = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const [employeeID, setEmployeeID] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for managing modal visibility
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to hold the selected employee data

  const { data: employees = [], isLoading, isError } = useGetEmployeesQuery();
  const { mutate: deleteEmployee } = useDeleteEmployeeMutation();

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    SuccessToast("Employee added successfully!");
  };

  const handleSeeMore = (employeeID) => {
    const employee = employees.find(emp => emp.EmployeeID === employeeID);
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = async (employeeID) => {
    try {
      await deleteEmployee(employeeID);
      SuccessToast("Employee deleted successfully!");
    } catch (error) {
      ErrorToast("Error occurred while deleting employee.");
    }
  };

  return (
    <div className="Dashboard-Container">
      <ToasterContainer />
      <div className="profile-list">
        <div className="container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              value={userInput}
              onChange={handleChange}
              className="search-input"
            />
            <button onClick={handleSubmit} className="add-user-button">
              Add Employee
            </button>
          </div>
        </div>
        <div className="lists">
          <ul>
            <li>Profile</li>
            <li>Name</li>
            <li>EmployeeID</li>
            <li>Email</li>
            <li>Position</li>
            <li>See More Details</li>
          </ul>
        </div>

        {isLoading ? (
          <div>
            {LoadingToast()}
            Loading...
          </div>
        ) : isError ? (
          <div>
            {ErrorToast("Error occurred while fetching data.")}
            Error occurred while fetching data.
          </div>
        ) : (
          <div>
            {employees.map((employee) => (
              <div className="list" key={employee.EmployeeID}>
                <span>
                  <img src={Avator} alt="Avatar" />
                </span>
                <span>{employee.FirstName}</span>
                <span>{employee.LastName}</span>
                <span>{employee.EmployeeID}</span>
                <span>{employee.Email}</span>
                <span>{employee.Position}</span>
                <span>
                  <button onClick={() => handleSeeMore(employee.EmployeeID)}>
                    See More
                  </button>
                </span>
                <div className="img-del-edit">
            <img src={edit} alt="" />
            <img src={del} alt="" onClick={() => handleDelete(employee.EmployeeID)} />
            </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">

              <div className="closeModal">
              <img src={Avator} alt="" />
            <h3>Employee Details</h3>
           
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            
            </div>
            <div className="modal-Details">
            <div className="first-details">
           
           
                <div className="employee-inputs">
                  <strong>Employee ID:</strong> {selectedEmployee.EmployeeID}
                </div>
                <div>
                  <strong>FirstName:</strong> {selectedEmployee.FirstName}
                </div>
                <div className="employee-inputs">
                  <strong>LastName:</strong> {selectedEmployee.lastName} 
                </div>
                <div className="employee-inputs">
                  <strong>Address:</strong> {selectedEmployee.Address} 
                </div>
                <div className="employee-inputs">
                  <strong>DOB:</strong> {selectedEmployee.DOB} 
                </div>
                <div className="employee-inputs">
                  <strong>Email:</strong> {selectedEmployee.Email}
                </div>
                <div className="employee-inputs">
                  <strong>Phone NO:</strong> {selectedEmployee.PhoneNo}
                </div>
            </div>
            {selectedEmployee && (
              <div className="employee-detail">
                <div className="employee-inputs">
                <strong>Gender:</strong> {selectedEmployee.Gender} 
                </div>
                <div className="employee-inputs">
                  <strong>Position:</strong> {selectedEmployee.Position}
                </div>
                <div className="employee-inputs">
                  <strong>Schedule:</strong> {selectedEmployee.Schedule}
                </div>
                <div className="employee-inputs">
                  <strong>Position:</strong> {selectedEmployee.Position}
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
