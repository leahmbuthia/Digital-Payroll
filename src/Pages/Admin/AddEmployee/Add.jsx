import React, { useState } from 'react';
import "./Add.scss"
import Credential from './Credential';

const Add = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    address: '',
    dob: '',
    email: '',
    phone: '',
    gender: '',
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profileImage: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, you can use formData object here
    console.log(formData);
  };

  return (
    <div className='main'>
      <div className="cont">
      <h2>Add Employee</h2>
      <div className="form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className='gender'>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className='profile'>
          <label htmlFor="profileImage">Upload Profile Image:</label>
          <input type="file" id="profileImage" name="profileImage" onChange={handleImageChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      </div>
      </div>
      <div className="credential">
        <Credential/>
      </div>

    </div>

  );
};

export default Add;
