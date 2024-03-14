import React, { useState } from 'react';
import './LeaveApplication.scss';

const LeaveApplication = () => {
  const [leaves, setLeaves] = useState([
    { id: 1, reason: 'Family vacation', startDate: '2024-03-01', endDate: '2024-03-05' },
    { id: 2, reason: 'Sick leave', startDate: '2024-04-10', endDate: '2024-04-12' },
    // Add more sample leave data as needed
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [leaveRemaining, setLeaveRemaining] = useState(21);

  const handleApplyLeave = () => {
    // Calculate days between start date and end date
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    // Update leave remaining
    setLeaveRemaining(leaveRemaining - days);

    // Add new leave to the list
    const newLeave = {
      id: leaves.length + 1,
      reason,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    };
    setLeaves([...leaves, newLeave]);

    // Close modal and reset form
    setModalOpen(false);
    setReason('');
    setStartDate(new Date());
    setEndDate(new Date());
  };

  return (
    <div className="leave-application">
      <h2>Leave Application</h2>
      <div className="leave-info">
        <div className="leave-infop">
        <p>Leave Remaining: {leaveRemaining} days</p>
        </div>
        <button className="apply-button" onClick={() => setModalOpen(true)}>Apply for Leave</button>
      </div>

      <div className="leave-list">
        <h3>Applied Leaves</h3>
        <ul>
          {leaves.map((leave) => (
            <li key={leave.id}>
              <span>{leave.reason}</span>
              <span>{leave.startDate} to {leave.endDate}</span>
            </li>
          ))}
        </ul>
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
            <h3>Apply for Leave</h3>
            <div className="form">
              <label>
                Reason:
                <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} />
              </label>
              <label>
                When:
                <input type="date" value={startDate.toISOString().split('T')[0]} onChange={(e) => setStartDate(new Date(e.target.value))} />
                <span>to</span>
                <input type="date" value={endDate.toISOString().split('T')[0]} onChange={(e) => setEndDate(new Date(e.target.value))} />
              </label>
              <button onClick={handleApplyLeave}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveApplication;
