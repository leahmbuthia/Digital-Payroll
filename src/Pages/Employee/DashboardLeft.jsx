import React, { useState, useEffect } from "react";
import Avator from "../../assets/Avatar.png";
import "./DashboardLeft.scss";
import { useGetEmployeeQuery } from "../../features/employee/employeeApi"; // Import the individual employee query
import {
  LoadingToast,
  ErrorToast,
  ToasterContainer,
} from "../../Toaster"; // Import toaster components

const DashboardLeft = () => {
  const [userInput, setUserInput] = useState(""); // State to hold user input for search
  const [loggedInUser, setLoggedInUser] = useState(null); // State to hold the logged-in user's details

  // Define logged-in user ID
  const loggedInUserID = {EmployeeID}; // Replace this with the actual logged-in user ID

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  // Fetch the details of the logged-in user
  const { data: loggedInUserData, isLoading, isError } = useGetEmployeeQuery(loggedInUserID);

  useEffect(() => {
    if (loggedInUserData) {
      setLoggedInUser(loggedInUserData);
    }
  }, [loggedInUserData]);

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
          </div>
        </div>
        <div className="lists">
          <ul>
            <li>Avatar</li>
            <li>Name</li>
            <li>Employee ID</li>
            <li>Email</li>
            <li>Position</li>
            <li>Gender</li>
            <li>Schedule</li>
          </ul>
        </div>

        {isLoading ? (
          <div>
            {LoadingToast()} {/* Display loading toast */}
            Loading...
          </div>
        ) : isError ? (
          <div>
            {ErrorToast("Error occurred while fetching data.")}{" "}
            {/* Display error toast */}
            Error occurred while fetching data.
          </div>
        ) : (
          // Render the details of the logged-in user
          loggedInUser && (
            <div className="list" key={loggedInUser.EmployeeID}>
              <span>
                <img src={Avator} alt="Avatar" />
              </span>
              <span>{loggedInUser.FirstName} {loggedInUser.LastName}</span>
              <span>{loggedInUser.EmployeeID}</span>
              <span>{loggedInUser.Email}</span>
              <span>{loggedInUser.Position}</span>
              <span>{loggedInUser.Gender}</span>
              <span>{loggedInUser.Schedule}</span>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default DashboardLeft;
