import React, { useState } from 'react';
import { useGetPayrollsQuery, useGetPayrollQuery, useDeletePayrollMutation, useGetPayrollByIDQuery } from '../../../features/payroll/payrollApi';
// import './AdminPayroll.scss';
import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../../Toaster';
import RotateLoader from "react-spinners/RotateLoader";
import AddPayroll from './AddPayroll';
import PayrollDetails from './PayrollDetails';

const AdminPayroll = () => {
  const { data, isLoading, isError, isFetching, error } = useGetPayrollsQuery();
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedPayrollID, setSelectedPayrollID] = useState(null); // State to store the selected payroll ID
  const { data: selectedPayrollData } = useGetPayrollQuery(selectedFilter === 'FirstName' ? selectedValue : null);
  const { data: selectedDatePayrollData } = useGetPayrollQuery(selectedFilter === 'PayrollDate' ? selectedValue : null);
  const { data: selectedEmployeePayrollData } = useGetPayrollQuery(selectedFilter === 'EmployeeID' ? selectedValue : null);
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const [deletePayroll] = useDeletePayrollMutation();
  const { data: payrollDetails, isLoading: detailsLoading } = useGetPayrollByIDQuery(selectedPayrollID, {
    skip: !selectedPayrollID, // Skip fetching if no payroll ID is selected
  });

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    setSelectedValue('');
  };

  const handleValueChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleDelete = async (PayrollID) => {
    try {
      await deletePayroll(PayrollID).unwrap();
      SuccessToast("Deleted Successfully");
    } catch (error) {
      console.error("Error deleting Payroll:", error);
    }
  };

  if (isLoading || isFetching) {
    LoadingToast("Loading");
    return <RotateLoader color="#36d7b7" loading={true} size={15} />;
  }

  // if (error || isError || !payroll || payroll.length === 0) {
  //   console.log("Error caught or no Payrolls");
  //   ErrorToast("No Payrolls");
  //   return <div> <h2>No Payrolls at the moment</h2>  </div>;
  // }
  const handlepay = (PayrollID) => {
    setSelectedPayrollID(PayrollID);
  };

  return (
    <>
      {isLoading ? (
        <>{LoadingToast()}</>
      ) : (
        <>
          <div>
            <ToasterContainer />
            <div className="FilterByPayroll">
              <div className='FilterSelection'>
                <label htmlFor="filter">Filter By:</label>
                <select id="filter" name="filter" value={selectedFilter} onChange={handleFilterChange}>
                  <option value="">Select Filter</option>
                  <option value="FirstName">FirstName</option>
                  <option value="PayrollDate">PayrollDate</option>
                  <option value="EmployeeID">EmployeeID</option>
                </select>
              </div>
              {selectedFilter && (
                <div className='SearchByFilterValue'>
                  <label htmlFor="filterValue">{selectedFilter}:</label>
                  <select id="filterValue" name="filterValue" value={selectedValue} onChange={handleValueChange}>
                    <option value="">Select {selectedFilter}</option>
                    {selectedFilter === 'FirstName' && data?.payroll.map((payroll) => (
                      <option key={payroll.FirstName} value={payroll.FirstName}>{payroll.FirstName}</option>
                    ))}
                    {selectedFilter === 'PayrollDate' && data?.payroll.map((payroll) => (
                      <option key={payroll.PayrollDate} value={payroll.PayrollDate}>{new Date(payroll.PayrollDate).toLocaleDateString('en-US')}</option>
                    ))}
                    {selectedFilter === 'EmployeeID' && data?.payroll.map((payroll) => (
                      <option key={payroll.EmployeeID} value={payroll.EmployeeID}>{payroll.EmployeeID}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            {selectedPayrollData && (
              <div>
                <h3>Selected Payroll Details</h3>
                <p>Employee ID: {selectedPayrollData.EmployeeID}</p>
                <p>Gross Pay: {selectedPayrollData.GrossPay}</p>
                <p>Payroll Date: {new Date(selectedPayrollData.PayrollDate).toLocaleDateString('en-US')}</p>
                <p>Net Pay: {selectedPayrollData.NetPay}</p>
              </div>
            )}
            {selectedDatePayrollData && (
              <div>
                <h3>Selected Date Payroll Details</h3>
                <p>Employee ID: {selectedDatePayrollData.EmployeeID}</p>
                <p>Gross Pay: {selectedDatePayrollData.GrossPay}</p>
                <p>Payroll Date: {new Date(selectedDatePayrollData.PayrollDate).toLocaleDateString('en-US')}</p>
                <p>Net Pay: {selectedDatePayrollData.NetPay}</p>
              </div>
            )}
            {selectedEmployeePayrollData && (
              <div>
                <h3>Selected Employee Payroll Details</h3>
                <p>Employee ID: {selectedEmployeePayrollData.EmployeeID}</p>
                <p>Gross Pay: {selectedEmployeePayrollData.GrossPay}</p>
                <p>Payroll Date: {new Date(selectedEmployeePayrollData.PayrollDate).toLocaleDateString('en-US')}</p>
                <p>Net Pay: {selectedEmployeePayrollData.NetPay}</p>
              </div>
            )}

            <h2>Payroll Management Table</h2>
            <button onClick={() => setShowModal(true)}>Add Payroll</button>
            {/* AddPayroll modal */}
            {showModal && (
              <AddPayroll onClose={handleModalClose} />
            )}
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>First Name</th>
                  <th>Gross Pay</th>
                  <th>Net Pay</th>
                  <th>Payroll Date</th>
                  <th>NHIF</th>
                  <th>NSSF</th>
                  <th>PAYE</th>
                  <th>Total Deductions</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.payroll.map((payroll) => (
                  <tr key={payroll.PayrollID}>
                    <td>{payroll.EmployeeID}</td>
                    <td>{payroll.FirstName}</td>
                    <td>{payroll.GrossPay}</td>
                    <td>{payroll.NetPay}</td>
                    <td>{new Date(payroll.PayrollDate).toLocaleDateString('en-US')}</td>
                    <td>{payroll.NHIF}</td>
                    <td>{payroll.NSSF}</td>
                    <td>{payroll.PAYE}</td>
                    <td>{payroll.TotalDeductions}</td>
                    <td>
                      <button onClick={() => handleDelete(payroll.PayrollID)}>Delete</button>
                    </td>
                    <td>
                      <button onClick={() => handlepay(payroll.PayrollID)}>Pay</button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </>
      )}
      {isError && (
        <div>
          {ErrorToast("Error occurred while fetching data.")}
          Error occurred while fetching data.
        </div>
      )}
      {/* Render the PayrollDetails modal */}
      {selectedPayrollID && (
        <PayrollDetails
          payrollID={selectedPayrollID}
          onClose={() => setSelectedPayrollID(null)}
          isLoading={detailsLoading}
          showModal={showModal} // Pass the showModal state to the PayrollDetails component
          setShowModal={setShowModal} // Pass the setShowModal function to the PayrollDetails component
        />
      )}
    </>
  );
};

export default AdminPayroll;
