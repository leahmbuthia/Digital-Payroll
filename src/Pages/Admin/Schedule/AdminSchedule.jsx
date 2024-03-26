import React, { useState } from 'react';
import './Schedule.scss';
import {
  useGetSchedulesQuery,
  useDeleteScheduleMutation,
  useAddScheduleMutation
} from "../../../features/Schedule/ScheduleApi";

const AdminSchedule = () => {
  const [showModal, setShowModal] = useState(false);
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [timeDifference, setTimeDifference] = useState(null);
  const [employeeID, setEmployeeID] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState('');

  const { data, isLoading, isError } = useGetSchedulesQuery();
  const [deleteScheduleMutation] = useDeleteScheduleMutation(); // Mutation hook for deleting a schedule
  const [addScheduleMutation] = useAddScheduleMutation(); // Mutation hook for adding a schedule

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

  const handleEmployeeIDChange = (event) => {
    setEmployeeID(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleDaysChange = (event) => {
    setDays(event.target.value);
  };

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const handleDeleteSchedule = async (scheduleID) => {
    try {
      await deleteScheduleMutation(scheduleID); // Call the delete mutation with the schedule ID
    } catch (error) {
      console.error('Error deleting schedule:', error);
      // Handle error if deletion fails
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addScheduleMutation({ EmployeeID: employeeID, StartTime: startTime, EndTime: endTime, Days: days });
      // Clear input fields after successful submission
      setEmployeeID('');
      setStartTime('2024-03-20T16:30:00Z'); // Reset to default datetime value
      setEndTime('');
      setDays('');
    } catch (error) {
      console.error('Error adding schedule:', error);
      // Handle error if adding schedule fails
    }
  };
  return (
    <div className="schedule-container1">
      <div className="h2">
        
        <h2>Schedule Details</h2>
        <button onClick={toggleModal}>Add Schedule</button>
      </div>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Days</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr><td colSpan="5">Loading...</td></tr>
          ) : isError ? (
            <tr><td colSpan="5">Error occurred while fetching data.</td></tr>
          ) : (
            data && data.schedules && data.schedules.length > 0 ? (
              data.schedules.map((schedule) => (
                <tr key={schedule.ScheduleID}>
                  <td>{schedule.EmployeeID}</td>
                  <td>{formatTime(schedule.StartTime)}</td>
                  <td>{formatTime(schedule.EndTime)}</td>
                  <td>{schedule.Days}</td>
                  <td>
                    <button onClick={() => handleDeleteSchedule(schedule.ScheduleID)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5">No schedule data available.</td></tr>
            )
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal} style={{color:'red', padding:'25px', fontSize:'30px'}}>&times;</span>
            <h2>Add Schedule</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="employeeID">Employee ID:</label>
                <input type="text" id="employeeID" name="employeeID" value={employeeID} onChange={handleEmployeeIDChange} />
              </div>
              <div className="form-group">
                <label htmlFor="startTime">Start Time:</label>
                <input type="datetime-local" id="startTime" name="startTime" value={startTime} onChange={handleStartTimeChange} />
              </div>
              <div className="form-group">
                <label htmlFor="endTime">End Time:</label>
                <input type="datetime-local" id="endTime" name="endTime" value={endTime} onChange={handleEndTimeChange} />
              </div>
              <div className="form-group">
                <label htmlFor="days">Days:</label>
                <input type="text" id="days" name="days" value={days} onChange={handleDaysChange} />
              </div>
              <button type="submit">Add Schedule</button>
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
