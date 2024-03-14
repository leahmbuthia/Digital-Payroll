import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.scss';
import Avator from '../../assets/Avatar.png'

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const profilesPerPage = 10;

  const handleChange = (e) => {

    setUserInput(e.target.value);
  };

  // const handleAddUser = () => {
  //   // Add user logic here
  //   console.log('Adding user:', userInput);
  //   setUserInput('');
  //   // history.push('/add');
  // };
  const handleSeeMore = (userData) => {
    setSelectedUser(userData);
    setShowModal(true);
  };
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
          <button onClick={()=> navigate("/add")} className="add-user-button">
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
                    <span><button>See More</button></span>
                    {/* <span><GoDotFill /> Active</span> */}
                    {/* <button><HiDotsHorizontal /></button> */}
                </div>
                <div className="list">
                     <span>
                    <img src={Avator} alt="Avatar" />
                    </span>
                    <span>Leah Nyambura</span>
                    <span>345D</span>
                    <span>leahnyambura@gmail.com</span>
                    <span>Manager</span>
                    <span><button>See More</button></span>
                    {/* <span><GoDotFill /> Active</span> */}
                    {/* <button><HiDotsHorizontal /></button> */}
                </div>
                <div className="list">
                     <span>
                    <img src={Avator} alt="Avatar" />
                    </span>
                    <span>Leah Nyambura</span>
                    <span>345D</span>
                    <span>leahnyambura@gmail.com</span>
                    <span>Manager</span>
                    <span><button>See More</button></span>
                    {/* <span><GoDotFill /> Active</span> */}
                    {/* <button><HiDotsHorizontal /></button> */}
                </div>
            {/* </div> */}

     
      {/* Pagination controls */}

    </div>
  );
};

export default Dashboard;
