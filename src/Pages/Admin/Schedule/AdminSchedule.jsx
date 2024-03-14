import React, { useState } from 'react';
import './Schedule.scss';

const AdminSchedule = () => {
  const [showModal, setShowModal] = useState(false);
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [timeDifference, setTimeDifference] = useState(null);

  const schedules = [
    { name: 'Early Bird', checkIn: '0100 HRS', checkOut: '0900 HRS', duration: '8 Hours' },
    { name: 'Day Shift', checkIn: '0900 HRS', checkOut: '1700 HRS', duration: '8 Hours' },
    { name: 'Swing Shift', checkIn: '1700 HRS', checkOut: '0100 HRS', duration: '8 Hours' },
  ];

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleTimeInChange = (event) => {
    setTimeIn(event.target.value);
  };

  const handleTimeOutChange = (event) => {
    setTimeOut(event.target.value);
  };

  const calculateTimeDifference = (event) => {
    event.preventDefault();
    const timeInDate = new Date(`2000-01-01T${timeIn}`);
    const timeOutDate = new Date(`2000-01-01T${timeOut}`);
    const differenceInMillis = timeOutDate - timeInDate;
    const hours = Math.floor(differenceInMillis / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMillis % (1000 * 60 * 60)) / (1000 * 60));
    setTimeDifference({ hours, minutes });
  };

  return (
    <div className="schedule-container1">
      <div className="h2">
        <button onClick={toggleModal}>Add Schedule</button>
        <h2>Schedule Details</h2>
      </div>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => (
            <tr key={index}>
              <td>{schedule.name}</td>
              <td>{schedule.checkIn}</td>
              <td>{schedule.checkOut}</td>
              <td>{schedule.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <h2>Add Schedule</h2>
            <form onSubmit={calculateTimeDifference}>
              <div className="form-group">
                <label htmlFor="timeIn">Time In:</label>
                <input type="time" id="timeIn" name="timeIn" value={timeIn} onChange={handleTimeInChange} />
              </div>
              <div className="form-group">
                <label htmlFor="timeOut">Time Out:</label>
                <input type="time" id="timeOut" name="timeOut" value={timeOut} onChange={handleTimeOutChange} />
              </div>
              <button type="submit">Calculate Difference</button>
          <div className="btn">
          <button> Submit</button>
          </div>
            </form>
            {timeDifference && (
              <div>
                <p>Time Difference: {timeDifference.hours} hours {timeDifference.minutes} minutes</p>
              </div>
            )}
 
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSchedule;
