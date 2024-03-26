import React, { useState, useEffect } from 'react';
import './Payroll.scss';
import Schedule from './Schedule';
import LeaveApplication from './LeaveApplication';
import { useGetPayrollQuery } from '../../../features/payroll/payrollApi'; // Import the generated API hook
import PayrollDetails from '../../Admin/Payroll/PayrollDetails';
import DownloadPayroll from './DownloadPayroll';


const Payroll = () => {
  const [payrollId, setPayrollId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [showPayrollModal, setShowPayrollModal] = useState(false); // State to control modal visibility

  const loggedInUser = localStorage.getItem('loggedInEmployee');
  const formattedLoggedInUser = JSON.parse(loggedInUser);
  const { data: payrollDetails, error, isLoading } = useGetPayrollQuery(formattedLoggedInUser);

  const handleDownloadPayslip = () => {
    // Open the payroll details modal
    setShowPayrollModal(true);
  };

  const handleCloseModal = () => {
    // Close the payroll details modal
    setShowPayrollModal(false);
  };
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
            <td>{payroll.PayrollDate}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div className="container">
      {/* <div className="main">
        <div className="input-field">
          <h2>Your Pay Details</h2>
         
        </div>
        <div className="net-salary">
         
        </div>
        <button className='button' onClick={handleDownloadPayslip}>Download Payslip</button>
      </div> */}
         <button className="button" onClick={handleDownloadPayslip}>Download Payslip</button>
    
      {/* Render PayrollDetails modal */}
    
         <div className="payroll-table">
        {renderPayrollTable()}
      </div>
      <div className="external">
        <div className="schedule">
          <Schedule/>
        </div>
        <div className="leave">
          <LeaveApplication/>
        </div>
      </div>
      {showPayrollModal && (
        <DownloadPayroll
          payrollID={payrollDetails?.payroll?.PayrollID} 
          onClose={handleCloseModal} 
          isLoading={isLoading} 
        />
      )}
   
    </div>
  );
};

export default Payroll;
