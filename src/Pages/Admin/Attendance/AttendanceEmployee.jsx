import React, { useState } from 'react';
import { useGetAttendancesQuery, useGetAttendanceQuery, useGetDateAttendanceQuery, useDeleteAttendanceMutation } from '../../../features/attendance/AttendanceApi';
import './AttendanceEmployee.scss';
import { ErrorToast, LoadingToast, ToasterContainer } from "../../../Toaster";

const AttendanceEmployee = () => {
  const { data, isLoading, isError } = useGetAttendancesQuery();
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedAttendanceID, setSelectedAttendanceID] = useState(null);
  const { data: selectedAttendanceData } = useGetAttendanceQuery(selectedFilter === 'FirstName' ? selectedValue : null);
  const { data: selectedDateAttendanceData } = useGetDateAttendanceQuery(selectedFilter === 'CreatedDate' ? selectedValue : null);
  const { data: selectedEmployeeAttendanceData } = useGetDateAttendanceQuery(selectedFilter === 'EmployeeID' ? selectedValue : null);
  const [deleteAttendance] = useDeleteAttendanceMutation();

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    setSelectedValue('');
  };

  const handleValueChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleDelete = (attendanceID) => {
    if (attendanceID) {
      deleteAttendance(attendanceID)
        .unwrap()
        .then(() => {
          // Handle successful deletion
          console.log("Deleted successfully!");
          // Remove the deleted item from the UI
          setData((prevData) => ({
            attendance: prevData.attendance.filter(
              (attendance) => attendance.AttendanceID !== attendanceID
            ),
          }));
        })
        .catch((error) => {
          console.error("Failed to delete:", error);
        });
    }
  };
  

  return (
    <>
      {isLoading ? (
        <>{LoadingToast()}</>
      ) : (
        <>
          <div>
            <ToasterContainer />
            <div className="FilterByAttendance">
              <div className='FilterSelection'>
                <label htmlFor="filter">Filter By:</label>
                <select id="filter" name="filter" value={selectedFilter} onChange={handleFilterChange}>
                  <option value="">Select Filter</option>
                  <option value="FirstName">FirstName</option>
                  <option value="CreatedDate">CreatedDate</option>
                  <option value="EmployeeID">EmployeeID</option>
                </select>
              </div>
              {selectedFilter && (
                <div className='SearchByFilterValue'>
                  <label htmlFor="filterValue">{selectedFilter}:</label>
                  <select id="filterValue" name="filterValue" value={selectedValue} onChange={handleValueChange}>
                    <option value="">Select {selectedFilter}</option>
                    {selectedFilter === 'FirstName' && data?.attendance.map((attendance) => (
                      <option key={attendance.FirstName} value={attendance.FirstName}>{attendance.FirstName}</option>
                    ))}
                    {selectedFilter === 'CreatedDate' && data?.attendance.map((attendance) => (
                      <option key={attendance.CreatedDate} value={attendance.CreatedDate}>{attendance.CreatedDate}</option>
                    ))}
                    {selectedFilter === 'EmployeeID' && data?.attendance.map((attendance) => (
                      <option key={attendance.EmployeeID} value={attendance.EmployeeID}>{attendance.EmployeeID}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {selectedAttendanceData && (
              <div>
                <h3>Selected Attendance Details</h3>
                <p>Employee ID: {selectedAttendanceData.EmployeeID}</p>
                <p>Created Date: {new Date(selectedAttendanceData.CreatedDate).toLocaleDateString()}</p>
                <p>Time In: {new Date(selectedAttendanceData.TimeIn).toLocaleTimeString('en-US', {hour12: false})}</p>
                <p>Time Out: {new Date(selectedAttendanceData.TimeOut).toLocaleTimeString('en-US', {hour12: false})}</p>
              </div>
            )}
            {selectedDateAttendanceData && (
              <div>
                <h3>Selected Date Attendance Details</h3>
                <p>Employee ID: {selectedDateAttendanceData.EmployeeID}</p>
                <p>Created Date: {new Date(selectedDateAttendanceData.CreatedDate).toLocaleDateString()}</p>
                <p>Time In: {new Date(selectedDateAttendanceData.TimeIn).toLocaleTimeString('en-US', {hour12: false})}</p>
                <p>Time Out: {new Date(selectedDateAttendanceData.TimeOut).toLocaleTimeString('en-US', {hour12: false})}</p>
              </div>
            )}
            {selectedEmployeeAttendanceData && (
              <div>
                <h3>Selected Employee Attendance Details</h3>
                <p>Employee ID: {selectedEmployeeAttendanceData.EmployeeID}</p>
                <p>Created Date: {new Date(selectedEmployeeAttendanceData.CreatedDate).toLocaleDateString()}</p>
                <p>Time In: {new Date(selectedEmployeeAttendanceData.TimeIn).toLocaleTimeString('en-US', {hour12: false})}</p>
                <p>Time Out: {new Date(selectedEmployeeAttendanceData.TimeOut).toLocaleTimeString('en-US', {hour12: false})}</p>
              </div>
            )}
            <h2>Employee Attendance Table</h2>
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Created Date</th>
                  <th>Time In</th>
                  <th>Time Out</th>
                </tr>
              </thead>
              <tbody>
                {data?.attendance.map((attendance) => (
                 <tr key={attendance.AttendanceID} style={{ backgroundColor: (selectedFilter === 'FirstName'
                  && attendance.FirstName === selectedValue) || (selectedFilter === 'CreatedDate'
                   && attendance.CreatedDate === selectedValue) || (selectedFilter === 'EmployeeID' 
                   && parseInt(attendance.EmployeeID) === parseInt(selectedValue)) ? 'yellow' : 'transparent' }}>

                    <td>{attendance.EmployeeID}</td>
                    <td>{attendance.FirstName}</td>
                    <td>{attendance.LastName}</td>
                    <td>{new Date(attendance.CreatedDate).toLocaleDateString()}</td>
                    <td>{new Date(attendance.TimeIn).toLocaleTimeString('en-US', {hour12: false})}</td>
                    <td>{new Date(attendance.TimeOut).toLocaleTimeString('en-US', {hour12: false})}</td>
                    <td><button onClick={() => handleDelete(attendance.AttendanceID)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {isError && (
        <div>
          {ErrorToast("Error occurred while fetching data.")}
          Error occurred while fetching data.
        </div>
      )}
    </>
  );
};

export default AttendanceEmployee;
