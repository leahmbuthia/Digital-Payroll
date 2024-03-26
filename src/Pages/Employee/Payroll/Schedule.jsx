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
    console.log("Schedule Details:", scheduleDetails);
    console.log("Error:", error);
  }, [employeeID, error, scheduleDetails]);
  return (
    <div className="schedule-container">
      <h2>Schedule Details</h2>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {scheduleDetails && scheduleDetails.schedule && (
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Days</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{scheduleDetails.schedule.Days}</td>
              <td>{scheduleDetails.schedule.StartTime}</td>
              <td>{scheduleDetails.schedule.EndTime}</td>
              <td>{scheduleDetails.schedule.Duration}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
      }  

export default Schedule;
