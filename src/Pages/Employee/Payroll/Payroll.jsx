import React, { useState } from 'react';
import './Payroll.scss';
import Schedule from './Schedule';
import LeaveApplication from './LeaveApplication';
// import PayslipPDF from '../../../src/PayslipPDF'; // Make sure this path is correct
// import { PDFDownloadLink } from '@react-pdf/renderer';

const Payroll = () => {
  const [grossSalary, setGrossSalary] = useState('');
  const [nhif, setNHIF] = useState(500);
  const [nssf, setNSSF] = useState(1080);
  const [payeRate, setPAYErate] = useState(16);
  const [housingRate, setHousingRate] = useState(1.5);
  const [allowances, setAllowances] = useState(200);
  const [advances, setAdvances] = useState(0); // State variable for advances

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

  return (
    <div className="container">
      <div className="main">
      <div className="input-field">
        <h2>Your Pay Details</h2>
        <label className="label">
          Gross Salary:
          <input type="number" value={80000} readOnly />
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
      <button className='button'>Download Payslip</button>
      </div>
      <div className="external">
      <div className="schedule">
        <Schedule/>
      </div>
      <div className="leave">
        <LeaveApplication/>
      </div>
      </div>

      {/* PDF Download Link */}
      {/* <PDFDownloadLink document={<PayslipPDF />} fileName="payslip.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
      </PDFDownloadLink> */}
    </div>
  );
};

export default Payroll;
