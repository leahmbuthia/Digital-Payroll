import React from 'react'
import { useUpdateEmployeeMutation } from '../../features/employee/employeeApi'
import { useState } from 'react';
import './UpdateEmployeModal.scss'

const UpdateEmployeeModal = ({ setShowModal, employee }) => {
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

  const [formData, setFormData] = useState({
    FirstName: employee.FirstName,
    LastName: employee.LastName,
    Address: employee.Address,
    DOB: employee.DOB,
    Email: employee.Email,
    PhoneNo: employee.PhoneNo,
    Gender: employee.Gender,
    Password: employee.Password,
    Position: employee.Position,
    Schedule: employee.Schedule,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (data) => {
    try {
      LoadingToast();
      const response = await updatePost({
        EmployeeID: employee.EmployeeID, ...formData
      }).unwrap();
      SuccessToast(response.message);
    } catch (error) {
      ErrorToast("Error updating post: " + error.data.message);
    }
    LoadingToast(false);
  }
  const handleClose = () => {
    setShowModal(false);
  }
  return (
    <div className="modal">
      <div className="header">
        <div>Employee Update Form</div>
        <button className="close-btn" onClick={handleClose}>Close</button>
      </div>
      <form onSubmit={handleSubmit} className="form">

        <div className='form-inputs'>
          <div className="first1">
          <div>
              <label htmlFor="FirstName">Employee ID:</label>
              <input type="text" id="FirstName" name="FirstName" value={employee.EmployeeID} onChange={handleChange} />
            </div>
            <button type="submit">{isLoading ? 'Loading' : 'Save Post'}</button>
            <div>
              <label htmlFor="FirstName">First Name:</label>
              <input type="text" id="FirstName" name="FirstName" value={employee.FirstName} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="LastName" name="LastName" value={employee.LastName} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="Address">Address:</label>
              <input type="text" id="Address" name="Address" value={employee.Address} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="DOB">Date of Birth:</label>
              <input type="date" id="DOB" name="DOB" value={employee.DOB} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="Email">Email:</label>
              <input type="Email" id="Email" name="Email" value={formData.Email} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="PhoneNo">Phone:</label>
              <input type="tel" id="PhoneNo" name="PhoneNo" value={employee.PhoneNo} onChange={handleChange} />
            </div>
            <div className='Gender'>
              <label htmlFor="Gender">Gender:</label>
              <select id="Gender" name="Gender" value={employee.Gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
        <div className="credentials-container">
          <div className="credentials-section">
            <h2>View Your Credentials</h2>
          </div>
          <div className="more">
            <h2>View Your Details</h2>
            <div className="credential-item">
              <label>Schedule</label>
              <input type="text" id='Schedule' name='Schedule' value={employee.Schedule} onChange={handleChange} />
            </div>
            <div className="credential-item">
              <label>Position</label>
              <input type="text" id='Position' name='Position' value={employee.Position} onChange={handleChange} />
            </div>
            <div className="credential-item">
              <label>Role</label>
              <input type="text" id='Role' name='Role' value={formData.Role} onChange={handleChange} />
            </div>
          </div>
        </div>

       
      </form>
    </div>
  

  )
}

export default UpdateEmployeeModal