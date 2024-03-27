import React, { useState, useEffect } from 'react';
import './Payroll.scss';
import Schedule from './Schedule';
import LeaveApplication from './LeaveApplication';
import { useGetPayrollQuery } from '../../../features/payroll/payrollApi'; // Import the generated API hook
import PayrollDetails from '../../Admin/Payroll/PayrollDetails';
import DownloadPayroll from './DownloadPayroll';
import RotateLoader from "react-spinners/RotateLoader";


const Payroll = () => {
  const [payrollId, setPayrollId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const loggedInUser = localStorage.getItem('loggedInEmployee');
  const formattedLoggedInUser = JSON.parse(loggedInUser);
  const { data: payrollDetails, error, isLoading } = useGetPayrollQuery(formattedLoggedInUser);

  // const handleDownloadPayslip = () => {
  //   // Open the payroll details modal
  //   setShowPayrollModal(true);
  // };
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleDownloadPayslip = (payrollId) => {
    setPayrollId(payrollId);
    setShowModal(true); // Set showModal to true when the button is clicked
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Adding 1 since getMonth() returns zero-based month
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  // const handleCloseModal = () => {
  //   // Close the payroll details modal
  //   setShowPayrollModal(false);
  // };
  const renderPayrollTable = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    if (!payrollDetails || !payrollDetails.payroll) {
      return null;
    }
  
    const payroll = payrollDetails.payroll; // Access the payroll details
  
    return (
      <table>
        <thead>
          <tr>
            <th>Payroll ID</th>
            <th>Employee ID</th>
            <th>NHIF</th>
            <th>NSSF</th>
            <th>PAYE</th>
            <th>Total Deductions</th>
            <th>Gross Pay</th>
            <th>Net Pay</th>
            <th>Payroll Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{payroll.PayrollID}</td>
            <td>{payroll.EmployeeID}</td>
            <td>{payroll.NHIF}</td>
            <td>{payroll.NSSF}</td>
            <td>{payroll.PAYE}</td>
            <td>{payroll.TotalDeductions}</td>
            <td>{payroll.GrossPay}</td>
            <td>{payroll.NetPay}</td>
            <td>{formatDate(payroll.PayrollDate)}</td> {/* Format date here */}
            <td>
              <button onClick={() => handleDownloadPayslip(payroll.PayrollID)} >Download Payslip</button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div className="container">
       <div className="main">
        <div className="input-field">
          <h2>Your Pay Details</h2>
         
        </div>
      
        {/* <button className='button' onClick={handleDownloadPayslip}>Download Payslip</button> */}
      </div>
         {/* <button className="button" onClick={() => handlepay(payroll.PayrollID)} >Download Payslip</button> */}
    
      {/* Render PayrollDetails modal */}
    
         <div className="payroll-table">
        {renderPayrollTable()}
      </div>
      <div className="external">
        <div className="schedule">
          <Schedule/>
        </div>
       
      </div>
      {showModal && (
        <DownloadPayroll
          payrollID={payrollId} // Pass the payrollId to the DownloadPayroll component
          onClose={() => setShowModal(false)} // Close modal when needed
          showModal={showModal}
          isLoading={isLoading} 
        />
      )}
   
    </div>
  );
};

export default Payroll;
