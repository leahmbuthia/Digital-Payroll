import React from 'react';
import './Schedule.scss'

const Schedule = () => {
  const schedules = [
    { name: 'Early Bird', checkIn: '0100 HRS', checkOut: '0900 HRS', duration: '8 Hours' },
    { name: 'Day Shift', checkIn: '0900 HRS', checkOut: '1700 HRS', duration: '8 Hours' },
    { name: 'Swing Shift', checkIn: '1700 HRS', checkOut: '0100 HRS', duration: '8 Hours' },
  ];

  return (
    <div className="schedule-container">
      {/* <h2>Schedule Details</h2> */}
      <h2>Schedule Details</h2>
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
    </div>
  );
};

export default Schedule;
