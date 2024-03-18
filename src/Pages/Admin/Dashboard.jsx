import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.scss';
import Avator from '../../assets/Avatar.png';
import { useGetEmployeesQuery } from '../../features/employee/employeeApi'; // Make sure to provide the correct path
import { SuccessToast, ErrorToast, LoadingToast, ToasterContainer } from '../../Toaster'; // Import toaster components

const Dashboard = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState('');
  const [employeeID, setEmployeeID] = useState(null); // State to hold the EmployeeID


  
  // Fetch all employees from the database
  const { data: employees = [], isLoading, isError } = useGetEmployeesQuery();

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    navigate("/admin/AdminAdd");
    SuccessToast("Employee added successfully!"); // Display success toast
  };

  const handleSeeMore = (EmployeeID) => {
    setEmployeeID(EmployeeID);
    navigate("/admin/seemore");
  };

  return (
    <>
      <ToasterContainer /> {/* Render ToasterContainer */}
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
            {LoadingToast()} {/* Display loading toast */}
            Loading...
          </div>
        ) : isError ? (
          <div>
            {ErrorToast("Error occurred while fetching data.")} {/* Display error toast */}
            Error occurred while fetching data.
          </div>
        ) : (
          // Render the list of employees
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
                <button onClick={() => handleSeeMore(1)}>See More</button> 
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
