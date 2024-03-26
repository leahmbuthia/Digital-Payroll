import React from 'react'
import { useUpdateEmployeeMutation } from '../../features/employee/employeeApi'
import { useState } from 'react';
import './UpdateEmployeModal.scss'

const UpdateEmployeeModal = ({ setShowModal, employee }) => {
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

  const [formData, setFormData] = useState({
    FirstName: "" || employee.FirstName,
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
    console.log(value );
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      // LoadingToast();
      const response = await updateEmployee({
        EmployeeID: employee.EmployeeID, ...formData
      }).unwrap();
      SuccessToast(response.message);
    } catch (error) {
      // ErrorToast("Error updating post: " + error.data.message);
    }
    // LoadingToast(false);
  }
  const handleClose = () => {
    setShowModal(false);
  }
  return (
    <div className="modal">
      <div className="header33">
        <div>Employee Update Form</div>
        <button className="close-btn" onClick={handleClose}>Close</button>
      </div>
      <form onSubmit={handleSubmit} className="form">

        <div className='form-inputs'>
          <div className="first1">
            {/* <div>
              <label htmlFor="FirstName">Employee ID:</label>
              <input type="text" id="FirstName" name="FirstName" defaultValue={employee.EmployeeID} onChange={(e) => handleChange (e)} />
            </div> */}
            
            <div>
              <label htmlFor="FirstName">First Name:</label>
              <input type="text" id="FirstName" name="FirstName" defaultValue={employee.FirstName} onChange={ (e) => handleChange (e)} />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="LastName" name="LastName" defaultValue={employee.LastName} onChange={ (e) => handleChange (e)}  />
            </div>
            <div>
              <label htmlFor="Address">Address:</label>
              <input type="text" id="Address" name="Address" defaultValue={employee.Address} onChange={ (e) => handleChange (e)}  />
            </div>
            <div>
              <label htmlFor="DOB">Date of Birth:</label>
              <input type="date" id="DOB" name="DOB" defaultValue={employee.DOB} onChange={ (e) => handleChange (e)}  />
            </div>
            {/* <div>
              <label htmlFor="Email">Email:</label>
              <input type="Email" id="Email" name="Email" defaultValue={formData.Email} onChange={ (e) => handleChange (e)} />
            </div> */}
            <div>
              <label htmlFor="PhoneNo">Phone:</label>
              <input type="tel" id="PhoneNo" name="PhoneNo" defaultValue={employee.PhoneNo} onChange={ (e) => handleChange (e)}  />
            </div>
            <div className='Gender'>
              <label htmlFor="Gender">Gender:</label>
              <select id="Gender" name="Gender" defaultValue={employee.Gender} onChange={ (e) => handleChange (e)} >
                <option defaultValue="">Select Gender</option>
                <option defaultValue="male">Male</option>
                <option defaultValue="female">Female</option>
                <option defaultValue="other">Other</option>
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
              <input type="text" id='Schedule' name='Schedule' defaultValue={employee.Schedule} onChange={ (e) => handleChange (e)} />
            </div>
            <div className="credential-item">
              <label>Position</label>
              <input type="text" id='Position' name='Position' defaultValue={employee.Position} onChange={ (e) => handleChange (e)} />
            </div>
            <button type="submit">{isLoading ? 'Loading' : 'Save Post'}</button>
            {/* <div className="credential-item">
              <label>Role</label>
              <input type="text" id='Role' name='Role' defaultValue={formData.Role}onChange={ (e) => handleChange (e)}  />
            </div> */}
          </div>
        </div>


      </form>
    </div>


  )
}

export default UpdateEmployeeModal