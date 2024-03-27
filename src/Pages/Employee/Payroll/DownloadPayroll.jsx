import React, { useState } from 'react';
import './DownloadPayroll.scss';
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
const DownloadPayroll = ({ payrollID, onClose, isLoading }) => {
  const { data: payroll, isError, isLoading: dataLoading } = useGetPayrollByIDQuery(payrollID);
  console.log('payroll', payroll);

  // const PayrollDetails = ({ payrollID, onClose, isLoading }) => {
  const [showModal, setShowModal] = useState(true); // State to control modal visibility

  const generatePDF = (payroll) => {
    const doc = new jsPDF();
    doc.text(`Happy PaySlipDay Payslip`, 15, 10);
    doc.text(`PayrollID: ${payroll.payroll.PayrollID}`, 15, 30);
    doc.text(`EmployeeID: ${payroll.payroll.EmployeeID}`, 15, 40);
    doc.text(`Gross Pay: ${payroll.payroll.GrossPay}`, 15, 50);
    doc.text(`NHIF: ${payroll.payroll.NHIF}`, 15, 60);
    doc.text(`NSSF: ${payroll.payroll.NSSF}`, 15, 70);
    doc.text(`Net Pay: ${payroll.payroll.NetPay}`, 15, 80);
    doc.text(`PAYE: ${payroll.payroll.PAYE}`, 15, 90);
    doc.text(`FirstName: ${payroll.payroll.FirstName}`, 15, 110);
    doc.text(`LastName: ${payroll.payroll.LastName}`, 15, 120);
    doc.text(`Email: ${payroll.payroll.Email}`, 15, 130);
    doc.text(`Address: ${payroll.payroll.Address}`, 15, 140);
    // doc.text(`Payroll Date: ${payroll.payroll.PayrollDate}`, 15, 150);
    doc.text(`Payroll Date: ${formatDate(payroll.payroll.PayrollDate)}`, 15, 150);
    doc.text(`Net Pay: ${payroll.payroll.NetPay}`, 15, 80);
    doc.save("payroll_details.pdf");
  };
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString('en-US', options);
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
              <h2>THappy Payroll Day Payslip</h2>
              {/* <div className="empDetails"> */}
              {/* <p>PayrollID: {payroll.payroll.PayrollID}</p> */}
              {/* <p>Name: {`${payroll.payroll.FirstName} ${payroll.payroll.LastName}`}</p> */}
              {/* <p>Position: {payroll.Title}</p>
                <p>Email Address: {payroll.Email}</p>
              </div> */}
              {/* {/* <p>Date: {payroll.PayrollDate}</p> */}
              {/* <p>BankName: {payroll.BankName}</p>
              <p>Date: {payroll.PayrollDate}</p> */}
              {/* <p>AccountNumber: {payroll.AccountNumber}</p>  */}
              {/* <div className="empDetails">
                <p>PayrollID: {payroll.PayrollID}</p>
                // <p>Date: {payroll.PayrollDate}</p>
              </div> */}
              {/* <div className="amounts">
                <p><strong>Gross Pay: {payroll.GrossPay}</strong></p>
                <p><strong>Total Deductions: {payroll.payroll.TotalDeductions}</strong></p>
                <p><strong>Net Pay: {payroll.payroll.NetPay}</strong></p>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadPayroll;
