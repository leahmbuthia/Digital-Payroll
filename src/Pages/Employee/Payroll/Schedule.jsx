import React, { useEffect, useState } from 'react';
import './Schedule.scss';
import { useGetScheduleQuery } from '../../../features/Schedule/ScheduleApi'; // Import the generated API hook

const Schedule = () => {
  const loggedInEmployeeData = JSON.parse(localStorage.getItem("loggedInEmployee"));
  const employeeID = loggedInEmployeeData ? loggedInEmployeeData.EmployeeID : null;

  const { data: scheduleDetails, error, isLoading } = useGetScheduleQuery(employeeID);
  const [duration, setDuration] = useState('');

  useEffect(() => {
    // Fetch schedule details when component mounts or when employeeID changes
    // This will trigger the useGetScheduleQuery hook with the updated employeeID
    console.log("Schedule Details:", scheduleDetails);
    console.log("Error:", error);

    // Calculate duration when scheduleDetails changes
    if (scheduleDetails && scheduleDetails.schedule) {
      const { StartTime, EndTime } = scheduleDetails.schedule;
      const start = new Date(StartTime);
      const end = new Date(EndTime);
      const diff = Math.abs(end - start);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      setDuration(`${hours} hours ${minutes} minutes`);
    }
  }, [employeeID, error, scheduleDetails]);

  // Function to format time to 24-hour format without date and year
  const formatTime = (timeString) => {
    const time = new Date(timeString);
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

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
              <td>{formatTime(scheduleDetails.schedule.StartTime)}</td> {/* Format start time */}
              <td>{formatTime(scheduleDetails.schedule.EndTime)}</td> {/* Format end time */}
              <td>{duration}</td> {/* Display duration */}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Schedule;
