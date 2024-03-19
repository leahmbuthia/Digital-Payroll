import React, { useRef } from 'react';
import { useGetEmployeeQuery } from '../../features/employee/employeeApi.jsx'; // Import the hook
import './SeeMore.scss';
import Avator from '../../../src/assets/Avatar.png';
import edit from "../../assets/edit-512.webp";
import del from "../../assets/del.png";

import { useParams } from 'react-router-dom';


const SeeMore = () => {
  console.log(employeeID,"id employer");
const {employeeID} = useParams();
console.log(employeeID,"id employer");
  // const { employeeID } = useParams();
  const fileInputRef = useRef(null);
 
  const {  employee, error, isLoading } = useGetEmployeeQuery(); // Fetch employee data by EmployeeID
  console.log(employee,"employee");
  const handleEditClick = () => {
    fileInputRef.current.click();
  };


  return (
    <div>leahhhhhhhhhh</div>
    // <div className="container1">
    //   <div className="form-container1">
    //     <div className="profileedit">
    //       <img src={Avator} alt="" />
    //       <img src={edit} alt="" className='edit'/>
    //     </div>
    //     <div className="form-img">
    //       <h2>Employee Details</h2>
    //       <div className="img">
    //         <img src={edit} alt="" />
    //         <img src={del} alt="" />
    //       </div>
    //     </div>
    //     <form id="employee-form">
    //       {/* Render employee data */}
    //       {isLoading && <p>Loading...</p>}
    //       {error && <p>Error: {error.message}</p>}
    //       {/* console.log("hae"); */}
    //       {employee && (
    //         <div key={employee.EmployeeID} className="form-group">
    //           <label htmlFor="first-name">First Name:</label>
    //           <input
    //             type="text"
    //             id="first-name"
    //             name="first-name"
    //             value={employee.firstName}
    //             disabled
    //           />
    //           {/* Render other input fields similarly */}
    //         </div>
    //       )}
    //       <input
    //         type="file"
    //         accept="image/*"
    //         ref={fileInputRef}
    //         style={{ display: 'none' }}
    //         onChange={handleImageChange}
    //       />
    //     </form>
    //   </div>
    // </div>
  );
};

export default SeeMore;
