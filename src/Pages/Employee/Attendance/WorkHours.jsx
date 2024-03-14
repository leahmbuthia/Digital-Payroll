import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./WorkHours.scss";

const WorkHours = () => {
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // You may want to update workHours based on the selected date here
  };

  return (
    <div className="work-hours-container">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
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
        {workHours.map((day, index) => (
          <div className="row" key={index}>
            <div className="cell">{day.day}</div>
            <div className="cell">
              <input
                type="time"
                value={day.timeIn}
                readOnly
              />
            </div>
            <div className="cell">
              <input
                type="time"
                value={day.timeOut}
                readOnly
              />
            </div>
            <div className="cell">
              <span>{day.workedHours}</span>
            </div>
            <div className="cell">
              <span>{calculateOvertime(day.workedHours)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkHours;
