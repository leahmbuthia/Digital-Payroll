import React from 'react'
import { useGetEmployeeQuery, useUpdateEmployeeMutation } from '../../features/employee/employeeApi'
import { useState, useEffect } from 'react';
// import './UpdateEmployeModal.scss'

const EditSingleEmployee = ({ setShowModal, employee }) => {
  const user=JSON.parse(localStorage.getItem('loggedInEmployee'))
  // console.log("user",user);
    const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation(user.EmployeeID);
    // const [loggedInUser, setLoggedInUser] = useState(null);
   
  
    // const { data: employeeData, error,  refetch } = useGetEmployeeQuery(formattedLoggedInUser);
    // useEffect(() => {
    //   // Retrieve logged-in employee data from local storage
    //   const loggedInEmployeeData = JSON.parse(
    //     localStorage.getItem("loggedInEmployee")
    //   );
    //   if (loggedInEmployeeData) {
    //     setLoggedInUser(loggedInEmployeeData);
    //   }
    //   console.log(loggedInEmployeeData);
    // }, []);
 
  
    const [formData, setFormData] = useState({
      EmployeeID: user.EmployeeID,
      FirstName: '' || employee.FirstName,
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
  
    // useEffect(() => {
    //   if (employeeData) {
    //     const employee = employeeData;
    //     setFormData(employee);
    //   }
    // }, [employeeData]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await updateEmployee(formData).unwrap();
        console.log("Employee updated:", response);
        // Add success handling here
      } catch (error) {
        console.error("Error updating employee:", error);
        // Handle error, show error message, etc.
      }
    };
  
    const handleClose = () => {
      setShowModal(false);
    };
  return (
    <div className="modal">
      <div className="header">
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

export default EditSingleEmployee 