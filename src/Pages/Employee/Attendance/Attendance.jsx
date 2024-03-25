import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Attendance.scss";
import WorkHours from "./WorkHours";
import { useAddAttendanceMutation, useUpdateAttendanceMutation } from "../../../features/attendance/AttendanceApi";
import { ErrorToast } from "../../../Toaster";

const Attendance = () => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [addAttendance] = useAddAttendanceMutation();
  const [updateAttendance] = useUpdateAttendanceMutation();
  const [EmployeeID , setEmployeeID] = useState();
  const [lastStopTime, setLastStopTime] = useState(null);

  useEffect(() => {
    const loggedInEmployeeData = JSON.parse(localStorage.getItem("loggedInEmployee"));
    if (loggedInEmployeeData) {
      setEmployeeID(loggedInEmployeeData.EmployeeID); // Remove this line
    }
  }, []);

  useEffect(() => {
    const lastStopTimeStr=localStorage.getItem("lastStopTime");
 
    if (lastStopTimeStr) {
      setLastStopTime(new Date(lastStopTimeStr)) ;
    }
  }, [])

  const handleStartClick = async () => {
    const timeNow = new Date().getTime();
    setStartTime(timeNow);
    try {
      // Perform your API request to add attendance
      const response = await addAttendance({ EmployeeID: EmployeeID, CreatedDate: selectedDate, TimeIn: new Date() });
      console.log("API Response:", response);
  
      // Check if there's an error in the response
      if (response.error) {
        console.error("Error adding attendance:", response.error);
        return;
      }
  
      // Check if response contains data property
      if (!response.data) {
        console.error("Data not found in response.");
        return;
      }
  
      // Extract AttendanceID from response.data
      const { AttendanceID } = response.data;
  
      // Check if AttendanceID is available
      if (!AttendanceID) {
        console.error("AttendanceID not found in response data.");
        return;
      }
  
      // Now you can use AttendanceID and other data as needed
      const message = "Attendance created successfully.";
  
      // Store necessary details in local storage
      localStorage.setItem("attendanceDetails", JSON.stringify({
        AttendanceID: AttendanceID,
        EmployeeID: EmployeeID,
        SelectedDate: selectedDate,
        TimeIn: timeNow,
      }));
  
      localStorage.setItem('AttendanceID', AttendanceID);
  
      // SuccessToast(message);
    } catch (error) {
      console.error("Error adding attendance:", error);
    }
  };

  const handleEndClick = async () => {
    const timeNow = new Date(); // Create a Date object for the current time
    setEndTime(timeNow.getTime()); // Set endTime as milliseconds
  
    try {
      const AttendanceID = localStorage.getItem('AttendanceID');
      if (!AttendanceID) {
        ErrorToast("AttendanceID not found in localStorage");
        return;
      }
  let data = {
    AttendanceID: parseInt(AttendanceID), // Parse the AttendanceID to ensure it's a number
    TimeOut: timeNow, // Use the Date object for TimeOut
  }
  console.log("data", data);
      // Here you directly use the AttendanceID fetched from localStorage
      await updateAttendance(data);
  
      // Once done, remove the AttendanceID from localStorage
      localStorage.removeItem("AttendanceID");
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };
  
  
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="timer-container">
      <div className="top">
        <div className="attendee">
          <label>
            <span>Start your day with a smile </span>
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
      </div>
      <div className="workhours">
        <WorkHours />
      </div>
    </div>
  );
};

export default Attendance;
