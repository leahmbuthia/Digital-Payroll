import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Attendance.scss";
import WorkHours from "./WorkHours";
import { useAddAttendanceMutation, useUpdateAttendanceMutation,useGetDateAttendanceQuery  } from "../../../features/attendance/AttendanceApi";
import { ErrorToast, SuccessToast } from "../../../Toaster";

const Attendance = () => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  // const [workHours, setWorkHours] = useState([]);
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [addAttendance] = useAddAttendanceMutation();
  const [updateAttendance] = useUpdateAttendanceMutation();
  const [EmployeeID , setEmployeeID] = useState();
  const [lastStopTime, setLastStopTime] = useState(null);
  const [isClockedIn, setIsClockedIn] = useState(false);

  useEffect(() => {
    const loggedInEmployeeData = JSON.parse(localStorage.getItem("loggedInEmployee"));
    if (loggedInEmployeeData) {
      setEmployeeID(loggedInEmployeeData.EmployeeID); // Remove this line
    }
  }, []);

  useEffect(() => {
    const lastStopTimeStr = localStorage.getItem("lastStopTime");
    if (lastStopTimeStr) {
      setLastStopTime(new Date(lastStopTimeStr));
    }
  }, [])

  const handleStartClick = async () => {
    const timeNow = new Date().getTime();
    if (isClockedIn) {
      ErrorToast("You have already checked in.");
      return;
    }
    setStartTime(timeNow);
    try {
      const response = await addAttendance({ EmployeeID: EmployeeID, CreatedDate: selectedDate, TimeIn: new Date() });
      if (response.error) {
        console.error("Error adding attendance:", response.error);
        return;
      }
      if (!response.data) {
        console.error("Data not found in response.");
        return;
      }
      const { AttendanceID } = response.data;
      if (!AttendanceID) {
        console.error("AttendanceID not found in response data.");
        return;
      }
      const message = "Attendance created successfully.";
      localStorage.setItem("attendanceDetails", JSON.stringify({
        AttendanceID: AttendanceID,
        EmployeeID: EmployeeID,
        SelectedDate: selectedDate,
        TimeIn: timeNow,
      }));
      localStorage.setItem('AttendanceID', AttendanceID);
      setIsClockedIn(true);
      SuccessToast(message);
    } catch (error) {
      console.error("Error adding attendance:", error);
    }
  };

  const handleEndClick = async () => {
    const timeNow = new Date();
    setEndTime(timeNow.getTime());
    try {
      const AttendanceID = localStorage.getItem('AttendanceID');
      if (!AttendanceID) {
        ErrorToast("AttendanceID not found in localStorage");
        return;
      }
      let data = {
        AttendanceID: parseInt(AttendanceID),
        TimeOut: timeNow,
      }
      await updateAttendance(data);
      localStorage.removeItem("AttendanceID");
      setIsClockedIn(false);
      SuccessToast("Clocked out successfully.");
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workHours, setWorkHours] = useState([
    { day: "Monday", timeIn: "09:00", timeOut: "17:00", workedHours: "8.00", overtime: "0.00" },
    { day: "Tuesday", timeIn: "09:15", timeOut: "17:30", workedHours: "8.25", overtime: "0.25" },
    { day: "Wednesday", timeIn: "08:45", timeOut: "17:15", workedHours: "8.50", overtime: "0.50" },
    { day: "Thursday", timeIn: "09:30", timeOut: "18:00", workedHours: "8.50", overtime: "0.50" },
    { day: "Friday", timeIn: "09:00", timeOut: "17:00", workedHours: "8.00", overtime: "0.00" },
  ]);

  const calculateOvertime = (workedHours) => {
    const parsedWorkedHours = parseFloat(workedHours);
    if (parsedWorkedHours > 8) {
      return (parsedWorkedHours - 8).toFixed(2);
    }
    return "0.00";
  };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   // You may want to update workHours based on the selected date here
  // };


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
      <div className="work-hours-container">
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          showWeekNumbers
          dateFormat="MM/dd/yyyy"
        />
        <div className="table">
          <div className="row header">
            <div className="cell">Day</div>
            <div className="cell">Time In</div>
            <div className="cell">Time Out</div>
            <div className="cell">Worked Hours</div>
            <div className="cell">Overtime</div>
          </div>
          {daysOfWeek.map(day => {
            const dayData = workHours.find(item => item.day === day) || { timeIn: "", timeOut: "", workedHours: "", overtime: "" };
            return (
              <div className="row" key={day}>
                <div className="cell">{day}</div>
                <div className="cell">
                  <input
                    type="time"
                    value={dayData.timeIn}
                    readOnly
                  />
                </div>
                <div className="cell">
                  <input
                    type="time"
                    value={dayData.timeOut}
                    readOnly
                  />
                </div>
                <div className="cell">
                  <span>{dayData.workedHours}</span>
                </div>
                <div className="cell">
                  <span>{calculateOvertime(dayData.workedHours)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Attendance;
