import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Attendance.scss";
import WorkHours from "./WorkHours";
// import Overtime from "./Overtime";

const Attendance = () => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [leaveRemaining, setLeaveRemaining] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleStartClick = () => {
    const timeNow = new Date().getTime();
    setStartTime(timeNow);
  };

  const handleEndClick = () => {
    const timeNow = new Date().getTime();
    setEndTime(timeNow);
    const totalTimeInMilliseconds = endTime - startTime;
    const totalHours = Math.floor(totalTimeInMilliseconds / (1000 * 60 * 60));
    const totalMinutes = Math.floor((totalTimeInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const totalTime = `${totalHours} Hours ${totalMinutes} Minutes`;
    const leaveDays = totalDays - (totalHours + totalMinutes / 60);
    setLeaveRemaining(leaveDays);
  };

  const handleInputChange = (event) => {
    setTotalDays(event.target.value);
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
          {startTime
            ? `Start Time: ${new Date(startTime).toLocaleTimeString()}`
            : null}
        </span>
      </div>
      <div className="btn-clockin">
        <button onClick={handleEndClick}>Clock End</button>
        <span>
          {endTime
            ? `End Time: ${new Date(endTime).toLocaleTimeString()}`
            : null}
        </span>
      </div>
      </div>
      <div className="hours">
        <span>Total Hours {leaveRemaining} Hours</span>
      </div>
      /</div>
        <div className="workhours">
          <WorkHours/>
        </div>
    </div>
  );
};

export default Attendance;
