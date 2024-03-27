import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import { createPortal } from "react-dom";
import Avator from "../../assets/Avatar.png";
import edit from "../../assets/edit-512.webp";
import del from "../../assets/del.png";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
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
import UpdateEmployeeModal from "./UpdateEmployeeModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const [employeeID, setEmployeeID] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEditModal, setEditShowModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  const { data: employees = [], isError } = useGetEmployeesQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    navigate("/admin/AdminAdd");
    SuccessToast("Employee added successfully!");
  };

  const handleSeeMore = (employeeID) => {
    const employee = employees.find((emp) => emp.EmployeeID === employeeID);
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = async (EmployeeID) => {
    setIsLoading(true); // Set loading to true before calling the mutation
    try {
      const response = await deleteEmployee(EmployeeID).unwrap();
      if (response.error) {
        ErrorToast(response.error);
      } else {
        SuccessToast(response.message);
      }
    } catch (error) {
      ErrorToast("Error occurred while deleting employee.");
    }
    setIsLoading(false); // Set loading to false after the mutation is complete
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setEditShowModal(true);
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
          <table className="employee-table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Email</th>
                <th>Position</th>
                <th>See More Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr
                  key={employee.EmployeeID}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td>
                    <img src={Avator} alt="Avatar" />
                  </td>
                  <td>{`${employee.FirstName} ${employee.LastName}`}</td>
                  <td>{employee.EmployeeID}</td>
                  <td>{employee.Email}</td>
                  <td>{employee.Position}</td>
                  {/* <td>{employee.PhotoUrl}</td> */}
                  <td>
                    <button onClick={() => handleSeeMore(employee.EmployeeID)}>
                      See More
                    </button>
                  </td>
                  <td>
                    <div className="img-del-edit">
                    <FaRegEdit
                        onClick={() => handleEdit(employee)}
                        style={{
                          color: "blue",
                          fontSize:
                            "30px" /* Add any other inline styles here */,
                        }}
                      />
                      {/* <img src={edit} alt="" onClick={() => handleEdit(employee)} /> */}
                      {/* <MdDelete  onClick={() => handleEdit(employee)}/> */}
                      <MdDelete
                        onClick={() => handleDelete(employee.EmployeeID)}
                        style={{
                          color: "red",
                          fontSize:
                            "30px" /* Add any other inline styles here */,
                        }}
                      />
                      {/* <img src={del} alt="" onClick={() => handleDelete(employee.EmployeeID)} /> */}
                      {/* <FaRegEdit onClick={() => handleDelete(employee.EmployeeID)} /> */}
                    
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="closeModal">
              <img src={Avator} alt="" />
              <h3>Employee Details</h3>
              <span className="close-btn" onClick={closeModal} style={{ color: 'red', cursor: 'pointer', fontSize: '40px'}}>
  &times;
</span>
            </div>
            <div className="modal-Details">
              <div className="first-details">
                <div className="employee-inputs">
                  <strong>Employee ID:</strong> {selectedEmployee.EmployeeID}
                </div>
                <div className="employee-inputs">
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

      <div className="modal-container">
        {showEditModal &&
          createPortal(
            <UpdateEmployeeModal
              setShowModal={setEditShowModal}
              employee={selectedEmployee}
            />,
            document.body
          )}
      </div>
    </div>
  );
};

export default Dashboard;
