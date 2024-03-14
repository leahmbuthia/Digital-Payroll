import React, { useState, useEffect } from "react";
import "./Credential.scss";

const Credential = () => {
  const [employeeID, setEmployeeID] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [grossSalary, setGrossSalary] = useState('');

  useEffect(() => {
    setEmployeeID(generateUniqueEmployeeID());
  }, []);

  const generateUniqueEmployeeID = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // List of letters
    const randomLetter = letters[Math.floor(Math.random() * letters.length)]; // Random letter
    const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Random four digits
    return randomLetter + randomDigits;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, e.g., send data to server
    console.log("Form submitted:", {
      employeeID,
      email,
      password,
      department,
      position,
      grossSalary
    });
  };

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <div className="credentials-container">
          <div className="credentials-section">
            <h2>View Your Credentials</h2>
            <div className="credential-item">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="credential-item">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          <div className="credentials-section">
            <div className="more">
            <h2>View Your Details</h2>
            <div className="credential-item">
              <label>Employee ID</label>
              <p>{employeeID}</p>
            </div>
            <div className="credential-item">
              <label>Department</label>
              <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required />
            </div>
            <div className="credential-item">
              <label>Position</label>
              <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
            </div>
            <div className="credential-item">
              <label>Gross Salary</label>
              <input type="text" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} required />
            </div>
          </div>
          <div className="btn">
        <button type="submit">Submit</button>
        </div>
          </div>
       
        </div>
       
      </form>
    </div>
  );
};

export default Credential;
