import React, { useState, useEffect } from 'react';
import './Payroll.scss';
import Schedule from './Schedule';
import LeaveApplication from './LeaveApplication';
import { useGetPayrollQuery } from '../../../features/payroll/payrollApi'; // Import the generated API hook

const Payroll = () => {
  const [payrollId, setPayrollId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);

  // const { data: payrollDetails, error, isLoading } = useGetPayrollQuery(employeeId);
  // Fetch EmployeeID from local storage on component mount
  // useEffect(() => {
  //   const loggedInEmployeeData = JSON.parse(localStorage.getItem("loggedInEmployee"));
  //   if (loggedInEmployeeData) {
  //     setEmployeeId(loggedInEmployeeData.EmployeeID);
  //   }
  // }, []);

  const loggedInUser = localStorage.getItem('loggedInEmployee');
  const formattedLoggedInUser = JSON.parse(loggedInUser);
  const { data: payrollDetails, error, isLoading } = useGetPayrollQuery(formattedLoggedInUser);

  const handleDownloadPayslip = () => {
    // Logic to download the payslip
    // You can use payrollDetails to generate the payslip
    // For simplicity, I'll just log the payrollDetails
    console.log("Payslip Details:", payrollDetails);
  };

  const renderPayrollTable = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!payrollDetails) {
      return null;
    }

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
            <td>{payrollDetails.PayrollID}</td>
            <td>{payrollDetails.EmployeeID}</td>
            <td>{payrollDetails.NHIF}</td>
            <td>{payrollDetails.NSSF}</td>
            <td>{payrollDetails.PAYE}</td>
            <td>{payrollDetails.TotalDeductions}</td>
            <td>{payrollDetails.GrossPay}</td>
            <td>{payrollDetails.NetPay}</td>
            <td>{payrollDetails.PayrollDate}</td>
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
   
    </div>
  );
};

export default Payroll;
