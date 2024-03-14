import React, { useState } from 'react';
import './Payroll.scss';
import Overtime from './Overtime';
// import PayslipPDF from '../../../src/PayslipPDF'; // Make sure this path is correct
// import { PDFDownloadLink } from '@react-pdf/renderer';

const AdminPayroll = () => {
  const [grossSalary, setGrossSalary] = useState('');
  const [nhif, setNHIF] = useState(500);
  const [nssf, setNSSF] = useState(1080);
  const [payeRate, setPAYErate] = useState(16);
  const [housingRate, setHousingRate] = useState(1.5);
  const [allowances, setAllowances] = useState(200);
  const [advances, setAdvances] = useState(0);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(''); // State variable for advances

  const calculateNetSalary = () => {
    const gross = parseFloat(grossSalary);
  
    if (gross < 24000) {
      // If gross salary is less than 24,000, only deduct allowances and advances
      const netSalary = gross - advances; // Deduct only advances
      return netSalary.toFixed(2);
    } else {
      // Otherwise, apply all deductions
      const paye = (gross * payeRate) / 100;
      const housing = (gross * housingRate) / 100;
      const netSalary = gross - nhif - nssf - paye - housing - allowances - advances; // Deduct advances
      return netSalary.toFixed(2);
    }
  };
  const handleEmployeeIdChange = (event) => {
    setSelectedEmployeeId(event.target.value);
  };

  return (
    <div className="container1">
      <div className="main">
      <div className="input-field">
      <select id="employeeId" value={selectedEmployeeId} onChange={handleEmployeeIdChange}>
                  <option value="">Select Employee ID</option>
                  <option value="1">Employee ID 1</option>
                  <option value="2">Employee ID 2</option>
                  {/* Add more options as needed */}
              </select>
        <h2>Your Pay Details</h2>
        <label className="label">
          Gross Salary:
          <input type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} />
        </label>
        <br />
        <label className="label">
          NHIF:
          <input type="number" value={nhif} disabled />
        </label>
        <br />
        <label className="label">
          NSSF:
          <input type="number" value={nssf} disabled />
        </label>
        <br />
        <label className="label">
          PAYE:
          <input type="number" value={payeRate} onChange={(e) => setPAYErate(e.target.value)} />
        </label>
        <br />
        <label className="label">
          Housing:
          <input type="number" value={housingRate} onChange={(e) => setHousingRate(e.target.value)} />
        </label>
        <br />
        <label className="label">
          Allowances:
          <input type="number" value={allowances} onChange={(e) => setAllowances(e.target.value)} />
        </label>
        <br />
        <label className="label">
          Advances:
          <input type="number" value={advances} onChange={(e) => setAdvances(e.target.value)} />
        </label>
      </div>

      {/* <button className="button">Calculate Net Salary</button> */}
      <div className="net-salary">
        Net Salary: ${calculateNetSalary()}
       
      </div>
      <button className='button'>Generate Payslip</button>
      </div>
      <div className="overtime">
        <Overtime/>
      </div>
    </div>
  );
};

export default AdminPayroll;
