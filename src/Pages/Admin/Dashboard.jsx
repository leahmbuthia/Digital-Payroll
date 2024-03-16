import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.scss';
import Avator from '../../assets/Avatar.png'

const Dashboard = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState('');
 
 

  const handleChange = (e) => {

    setUserInput(e.target.value);
  };
  const handleSubmit = () => {
    navigate("/admin/AdminAdd"); 
  };
  const handleSeeMore =() =>{
    navigate("/admin/seemore");
  }
 
  return (
    <div className="profile-list">
      <div className="container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={userInput}
            onChange={handleChange}
            className="search-input"
          />
      <button onClick={handleSubmit} className="add-user-button">
      Add Employee
    </button>
        </div>
      </div>
      <div className="lists">
        <ul>
        <li>Profile</li>
          <li>Name</li>
          <li>EmployeeID</li>
          <li>Email</li>
          <li>Position</li>
          <li>See More Deatils</li>
        </ul>
      </div>
 
      <div className="list">
                     <span>
                    <img src={Avator} alt="Avatar" />
                    </span>
                    <span>Leah Nyambura</span>
                    <span>345D</span>
                    <span>leahnyambura@gmail.com</span>
                    <span>Manager</span>
                    <span><button onClick={handleSeeMore}>See More</button></span>
                </div>
                <div className="list">
                     <span>
                    <img src={Avator} alt="Avatar" />
                    </span>
                    <span>Leah Nyambura</span>
                    <span>345D</span>
                    <span>leahnyambura@gmail.com</span>
                    <span>Manager</span>
                    <span><button onClick={handleSeeMore}>See More</button></span>
                  
                </div>
                <div className="list">
                     <span>
                    <img src={Avator} alt="Avatar" />
                    </span>
                    <span>Leah Nyambura</span>
                    <span>345D</span>
                    <span>leahnyambura@gmail.com</span>
                    <span>Manager</span>
                    <span><button onClick={handleSeeMore}>See More</button></span>
                   
                </div>
                {/* <Modal isOpen={modalOpen} onClose={closeModal} /> */}
    </div>
  );
};

export default Dashboard;
