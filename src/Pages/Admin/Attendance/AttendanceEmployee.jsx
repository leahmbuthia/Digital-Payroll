import React, { useState } from 'react';
import './AttendanceEmployee.scss'


const AttendanceEmployee = () => {
    const employees = [
        {
            FirstName:'John',
        LastName: 'Doe',
          employeeId: 'EMP001',
          clockIn: '08:00 AM',
          clockOut: '05:00 PM',
          hoursWorkedPerMonth: '160',
          overtime: '10',
          overtimeRate: '$20'
        },
        {
            FirstName: 'Jane',
            LastName: ' Smith',
          employeeId: 'EMP002',
          clockIn: '07:30 AM',
          clockOut: '04:30 PM',
          hoursWorkedPerMonth: '155',
          overtime: '8',
          overtimeRate: '$18'
        },
        // Add more dummy data as needed
      ];
      return (
        <div>
            <h2>Employee Attendance Table</h2>
        <table>
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Employee ID</th>
              <th>Clock In</th>
              <th>Clock Out</th>
              <th>Worked  </th>
              <th>Overtime</th>
              <th>Overtime Rate</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.FirstName}</td>
                <td>{employee.LastName}</td>
                <td>{employee.employeeId}</td>
                <td>{employee.clockIn}</td>
                <td>{employee.clockOut}</td>
                <td>{employee.hoursWorkedPerMonth}</td>
                <td>{employee.overtime}</td>
                <td>{employee.overtimeRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      );
    };
export default AttendanceEmployee