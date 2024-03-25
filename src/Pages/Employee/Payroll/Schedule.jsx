import React, { useEffect } from 'react';
import './Schedule.scss';
import { useGetScheduleQuery } from '../../../features/Schedule/ScheduleApi'; // Import the generated API hook

const Schedule = () => {
  const loggedInEmployeeData = JSON.parse(localStorage.getItem("loggedInEmployee"));
  const employeeID = loggedInEmployeeData ? loggedInEmployeeData.EmployeeID : null;

  const { data: scheduleDetails, error, isLoading } = useGetScheduleQuery(employeeID);

  useEffect(() => {
    // Fetch schedule details when component mounts or when employeeID changes
    // This will trigger the useGetScheduleQuery hook with the updated employeeID
  }, [employeeID]);

  return (
    <div className="schedule-container">
      <h2>Schedule Details</h2>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {scheduleDetails && (
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
            <tr>
              <td>{scheduleDetails.name}</td>
              <td>{scheduleDetails.checkIn}</td>
              <td>{scheduleDetails.checkOut}</td>
              <td>{scheduleDetails.duration}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Schedule;
