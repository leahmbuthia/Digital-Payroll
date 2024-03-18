import React from 'react';
import './Navbar.scss';
import logo from '../../assets/DIGITAL PAYROLL.png';
import Avator from '../../assets/Avatar.png';
import Dropdown from '../../assets/logout-line-icon-vector-46979846.webp';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('isLoggedIn');
    // Redirect to login page
    navigate('/');
  };

  return (
    <div className='nav'>
      <div className="logo">
        <img src={logo} alt="" />
        <p>Digital Payroll</p>
      </div>
      <div className="profile">
        <img src={Avator} alt='' />
        <img src={Dropdown} alt="" onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Navbar;
