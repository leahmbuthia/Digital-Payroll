// AddPayroll.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAddPayrollMutation } from '../../../features/payroll/payrollApi';
import { ErrorToast, SuccessToast } from '../../../Toaster';
import './AddPayroll.scss';

const AddPayroll = ({ onClose }) => {
  const [addPayroll, { isLoading }] = useAddPayrollMutation();
  const [formData, setFormData] = useState({
    EmployeeID: '',
    NHIF: '',
    NSSF: '',
    GrossPay: '',
    PayrollDate: new Date() // Default to today's date
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPayroll(formData).unwrap();
      SuccessToast("Payroll added successfully");
      onClose();
    } catch (error) {
      console.error("Error adding Payroll:", error);
      ErrorToast("Failed to add Payroll");
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, PayrollDate: date });
  };

  return (
    <div className="modal">
      <section className="modal-content">
        <h2>Add a New Payroll</h2>
        <button className="close-button" onClick={onClose}>Close</button>
        <form onSubmit={handleSubmit} className="form">
          <label className="form-input" htmlFor="EmployeeID">
            EmployeeID:
            <input
              id="EmployeeID"
              name="EmployeeID"
              value={formData.EmployeeID}
              onChange={handleChange}
            />
          </label>
          <label className="form-input" htmlFor="NHIF">
            NHIF:
            <input
              id="NHIF"
              name="NHIF"
              value={formData.NHIF}
              onChange={handleChange}
            />
          </label>
          <label className="form-input" htmlFor="NSSF">
            NSSF:
            <input
              id="NSSF"
              name="NSSF"
              value={formData.NSSF}
              onChange={handleChange}
            />
          </label>
          <label className="form-input" htmlFor="GrossPay">
            GrossPay:
            <input
              id="GrossPay"
              name="GrossPay"
              value={formData.GrossPay}
              onChange={handleChange}
            />
          </label>
          <label className="form-input" htmlFor="PayrollDate">
            Payroll Date:
            <DatePicker
              id="PayrollDate"
              selected={formData.PayrollDate}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
            />
          </label>
          <button type="submit">{isLoading ? "Loading" : "Save"}</button>
        </form>
      </section>
    </div>
  );
};

export default AddPayroll;
