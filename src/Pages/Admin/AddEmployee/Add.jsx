import React, { useState } from 'react';
import "./Add.scss"
import { useNavigate } from 'react-router-dom';
import { useAddEmployeeMutation } from '../../../features/employee/employeeApi.jsx'; 

const Add = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Address: '',
    DOB: '',
    Email: '',
    PhoneNo: '',
    Gender: '',
    Position: '',
    Password: '',
    Schedule: '',
    PhotoURL: '',
    Role: '',
  });

  // Mutation hook for adding an employee
  const [addEmployee, { isLoading, isError, error }] = useAddEmployeeMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, PhotoURL: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addEmployee(formData);

      if (!response.error) {
        console.log('Employee added successfully:', response.data);
        navigate("/admin");
      } else {
        console.error('Error adding employee:', response.error);
        // Handle error state as needed
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      // Handle error state as needed
    }
  };
  
  return (
    <div className='add-main'>
      <div className="cont">
      <h2>Add Employee</h2>
      <div className="add-form">
      <form onSubmit={handleSubmit} className='formSubmit'>
      <div className='form-inputs'>
        <div className="first1">
       
        <div>
          <label htmlFor="FirstName">First Name:</label>
          <input type="text" id="FirstName" name="FirstName" value={formData.FirstName} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="LastName" name="LastName" value={formData.LastName} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="Address">Address:</label>
          <input type="text" id="Address" name="Address" value={formData.Address} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="DOB">Date of Birth:</label>
          <input type="date" id="DOB" name="DOB" value={formData.DOB} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="Email">Email:</label>
          <input type="Email" id="Email" name="Email" value={formData.Email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="PhoneNo">Phone:</label>
          <input type="tel" id="PhoneNo" name="PhoneNo" value={formData.PhoneNo} onChange={handleChange} />
        </div>
        <div className='Gender'>
          <label htmlFor="Gender">Gender:</label>
          <select id="Gender" name="Gender" value={formData.Gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className='profile'>
  <label htmlFor="PhotoURL">Upload Profile Image:</label>
  <input type="file" onChange={handleImageChange} />

</div> 
        </div>
        <div className="credentials-container">
        <div className="credentials-section">
            {/* <h2>View Your Credentials</h2> */}
            <div className="credential-item">
              <label>Password</label>
              <input type="Password"id='Password'name='Password' value={formData.Password} onChange={handleChange} />
            </div>
          </div>
          <div className="more">
            {/* <h2>View Your Details</h2> */}
            <div className="credential-item">
              <label>Schedule</label>
              <input type="text" id='Schedule' name='Schedule' value={formData.Schedule} onChange={handleChange} />
            </div>
            <div className="credential-item">
              <label>Position</label>
              <input type="text" id='Position' name='Position' value={formData.Position} onChange={handleChange} />
            </div>
            <div className="credential-item">
              <label>Role</label>
              <input type="text" id='Role' name='Role' value={formData.Role} onChange={handleChange} />
            </div>
          </div>
        </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      </div>
      </div>


    </div>

  );
};

export default Add;
