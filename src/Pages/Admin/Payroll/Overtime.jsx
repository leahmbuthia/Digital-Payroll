// Overtime.js

import React, { useState } from 'react';
import './Overtime.scss'; // Import the CSS file

const Overtime = () => {
  const [totalHours, setTotalHours] = useState('');
  const [overtimeHours, setOvertimeHours] = useState('');
  const [totalAmount, setTotalAmount] = useState(null);

  const handleTotalHoursChange = (event) => {
    setTotalHours(event.target.value);
  };

  const calculateOvertime = () => {
    const regularHours = 40;
    const totalHoursInt = parseInt(totalHours);
    if (totalHoursInt > regularHours) {
      const overtime = totalHoursInt - regularHours;
      setOvertimeHours(overtime);
      const amount = overtime * 500; // Assuming 500 shillings per hour
      setTotalAmount(amount);
    } else {
      setOvertimeHours(0);
      setTotalAmount(0);
    }
  };

  return (
    <div className="overtime-container">
      <h2 className="overtime-heading">Payroll Calculator</h2>
      <div className="overtime-input">
        <label htmlFor="totalHours">Total Hours Worked:</label>
        <input type="number" id="totalHours" value={totalHours} onChange={handleTotalHoursChange} />
      </div>
      <div>
        <button className="overtime-button" onClick={calculateOvertime}>Calculate Overtime</button>
      </div>
      {overtimeHours !== '' && (
        <div className="overtime-result">
          <p>Total Overtime Hours: {overtimeHours}</p>
          <p>Total Amount: {totalAmount} shillings</p>
        </div>
      )}
    </div>
  );
};

export default Overtime;
