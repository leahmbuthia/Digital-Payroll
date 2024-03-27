import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Attendance.scss";
import WorkHours from "./WorkHours";
import { useAddAttendanceMutation, useUpdateAttendanceMutation, useGetAttendanceQuery } from "../../../features/attendance/AttendanceApi";
import { ErrorToast, SuccessToast, ToasterContainer } from "../../../Toaster";

const Attendance = () => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [leaveRemaining, setLeaveRemaining] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [addAttendance] = useAddAttendanceMutation();
  const [updateAttendance] = useUpdateAttendanceMutation();
  const [EmployeeID, setEmployeeID] = useState(null); // Initialize EmployeeID with null
  const [lastStopTime, setLastStopTime] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInEmployee'));
  const { data: AttendanceDetails, error, isLoading } = useGetAttendanceQuery(loggedInUser.EmployeeID);

  useEffect(() => {
    if (loggedInUser) {
      setEmployeeID(loggedInUser.EmployeeID);
      console.log("data",loggedInUser.EmployeeID);
    }
  }, [loggedInUser]);

  const handleStartClick = async () => {
    const timeNow = new Date().getTime();
    setStartTime(timeNow);
    try {
      const response = await addAttendance({ EmployeeID: EmployeeID, CreatedDate: selectedDate, TimeIn: new Date() });
      if (response.error) {
        ErrorToast("Error adding attendance");
        return;
      }
      const { AttendanceID } = response.data;
      if (!AttendanceID) {
        ErrorToast("AttendanceID not found in response data");
        return;
      }
      const message = "Attendance created successfully.";
      SuccessToast(message);
      localStorage.setItem("attendanceDetails", JSON.stringify({
        AttendanceID: AttendanceID,
        EmployeeID: EmployeeID,
        SelectedDate: selectedDate,
        TimeIn: timeNow,
      }));
      localStorage.setItem('AttendanceID', AttendanceID);
    } catch (error) {
      console.error("Error adding attendance:", error);
      ErrorToast("Error adding attendance");
    }
  };

  const handleEndClick = async () => {
    const timeNow = new Date().getTime();
    setEndTime(timeNow);
    try {
      const AttendanceID = localStorage.getItem('AttendanceID');
      if (!AttendanceID) {
        ErrorToast("AttendanceID not found in localStorage");
        return;
      }
      const data = {
        AttendanceID: parseInt(AttendanceID),
        TimeOut: new Date(),
      };
      await updateAttendance(data);
      localStorage.removeItem("AttendanceID");
      const message = "Attendance updated successfully.";
      SuccessToast(message);
    } catch (error) {
      console.error("Error updating attendance:", error);
      ErrorToast("Error updating attendance");
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const renderAttendanceTable = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (!AttendanceDetails || AttendanceDetails.length === 0) {
      return <div>No attendance data available.</div>;
    }
    // Filter attendance data based on EmployeeID
    const userAttendanceData = AttendanceDetails.filter(attendance => attendance.EmployeeID === EmployeeID);
    return (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Day of the Week</th>
            <th>Time In</th>
            <th>Time Out</th>
          </tr>
        </thead>
        <tbody>
          {userAttendanceData.map((attendance) => (
            <tr key={attendance.AttendanceID}>
              <td>{new Date(attendance.CreatedDate).toLocaleDateString()}</td>
              <td>{new Date(attendance.TimeIn).toLocaleDateString("en-US", { weekday: 'long' })}</td>
              <td>{new Date(attendance.TimeIn).toLocaleTimeString()}</td>
              <td>{attendance.TimeOut ? new Date(attendance.TimeOut).toLocaleTimeString() : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };


  return (
    <div className="timer-container">
      <ToasterContainer />
      <div className="top">
        <div className="attendee">
          <label>
            <span>Start your day with a smile</span>
          </label>
        </div>
        <div className="date">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showWeekNumbers
            dateFormat="MM/dd/yyyy"
          />
        </div>
        <div className="clock">
          <div className="btn-clockin">
            <button onClick={handleStartClick}>Clock IN</button>
            <span>
              {startTime ? `Start Time: ${new Date(startTime).toLocaleTimeString()}` : null}
            </span>
          </div>
          <div className="btn-clockin">
            <button onClick={handleEndClick}>Clock End</button>
            <span>
              {endTime ? `End Time: ${new Date(endTime).toLocaleTimeString()}` : null}
            </span>
          </div>
        </div>
        <div className="hours">
          <span>Total Hours {leaveRemaining} Hours</span>
        </div>
        <div className="workhours">
          <WorkHours />
        </div>
      </div>
    </div>
  );
};

export default Attendance;
