import React, { useState } from 'react';
import './PayrollDetails.scss';
import { ErrorToast, LoadingToast } from '../../../Toaster';
import { PDFDownloadLink, PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import jsPDF from 'jspdf';
import { useGetPayrollByIDQuery } from '../../../features/payroll/payrollApi';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
const PayrollDetails = ({ payrollID, onClose, isLoading }) => {
    const { data: payroll, isError, isLoading: dataLoading } = useGetPayrollByIDQuery(payrollID);
    console.log('payroll', payroll);

// const PayrollDetails = ({ payrollID, onClose, isLoading }) => {
  const [showModal, setShowModal] = useState(true); // State to control modal visibility

  const generatePDF = (payroll) => {
    const doc = new jsPDF();
    doc.text(`TillHappens Payslip`, 10, 10);
    doc.text(`PayrollID: ${payroll.payroll.PayrollID}`, 10, 20);
    doc.text(`EmployeeID: ${payroll.payroll.EmployeeID}`, 10, 30);
    doc.text(`Gross Pay: ${payroll.payroll.GrossPay}`, 10, 40);
    doc.text(`NHIF: ${payroll.payroll.NHIF}`, 10, 50);
    doc.text(`NSSF: ${payroll.payroll.NSSF}`, 10, 60);
    doc.text(`Net Pay: ${payroll.payroll.NetPay}`, 10, 70);
    doc.text(`PAYE: ${payroll.payroll.PAYE}`, 10, 80);
    doc.text(`Payroll Date: ${payroll.payroll.PayrollDate}`, 10, 90);
    doc.text(`Total Deductions: ${payroll.payroll.TotalDeductions}`, 10, 100);
    doc.save("payroll_details.pdf");
  };
  

  const closeModal = () => {
    setShowModal(false);
    onClose();
  };

  if (isLoading) {
    return <LoadingToast message="Loading payroll details..." />;
  }

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={closeModal}>X</button>
            <button onClick={() => generatePDF(payroll)}>Print</button>
            <div className='payslip'>
              <h2>TillHappens Payslip</h2>
              <div className="empDetails">
                <p>PayrollID: {payroll.payroll.PayrollID}</p>
                {/* <p>Name: {`${payroll.FirstName} ${payroll.LastName}`}</p> */}
                <p>Position: {payroll.Title}</p>
                <p>Email Address: {payroll.Email}</p>
              </div>
              <p>Date: {payroll.PayrollDate}</p>
              <p>BankName: {payroll.BankName}</p>
              <p>AccountNumber: {payroll.AccountNumber}</p>
              <div className="amounts">
                <p><strong>Basic Salary:</strong> {payroll.BasicSalary}</p>
                <p><strong>OvertimeEarnings:</strong> {payroll.OvertimeEarnings}</p>
                <div className="gross">
                  <p><strong>Gross Pay: {payroll.GrossPay}</strong></p>
                </div>
                <p><strong>TotalDeductions: {payroll.TotalDeductions}</strong></p>
                <div className="gross">
                  <p><strong>NetPay: {payroll.NetPay}</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PayrollDetails;
