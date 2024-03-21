import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FaAnglesRight, FaAddressCard, FaLock } from "react-icons/fa6";
import { ToasterContainer, SuccessToast, ErrorToast, LoadingToast } from "../../src/Toaster";

const Login = () => {

  const [values, setValues] = useState({
    Email: '',
    Password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      LoadingToast(true);
      const res = await axios.post('http://localhost:8800/api/employee/auth/login', values);
      // console.log("data",res.data);
      // localStorage.setItem('isLoggedIn', 'true');
      if (res.data.loggedInUser.employee) {
        const { employee, token } = res.data.loggedInUser;
        if(!res.data.loggedInUser.employee.Role){
          alert("Please consult the administrator to assign a role.")
          return
        }
        if(res.data.loggedInUser.employee.Role === "user"){
        navigate('/main');
        }else if(res.data.loggedInUser.employee.Role === "admin"){
          navigate('/admin');
        }
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', token);
        localStorage.setItem('loggedInEmployee', JSON.stringify(employee));
        localStorage.setItem('firstName', employee.FirstName);
        localStorage.setItem('lastName', employee.LastName);
        localStorage.setItem('Address', employee.Address);
        localStorage.setItem('DOB', employee.DOB);
        localStorage.setItem('Email', employee.Email);
        localStorage.setItem('Gender', employee.Gender);
        localStorage.setItem('Position', employee.Position);
        localStorage.setItem('Password', employee.Password);
        localStorage.setItem('PhoneNo', employee.PhoneNo);
        localStorage.setItem('Schedule', employee.Schedule);
        // localStorage.setItem('isLoggedIn', 'true');
      } else {
        ErrorToast("User Not found");
      }
      console.log(res);
      LoadingToast(false);
    } catch (err) {
      ErrorToast("An error occurred. Please try again."); // Display error toast
      LoadingToast(false); // Dismiss loading toast
    }
  };

  const forgotPassword = () => {
    alert('Please contact the support center to reset your logins!');
  };

  return (
    <div className="login">
      <div className="cardd">
        <div className="left">
          <h1>Digital Payroll</h1>
          <span>Your all in one people solution Seamlessly manage your employees, from onboarding to retirement with Digital Payroll.</span>
          <p>Welcome back! Please login to your account.</p>
        </div>
        <div className="right">
          <div className="login-header">
            <h1>Login to Digital Payroll</h1>
            <p>Enter your email and password to continue</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-card1">
              <input type="email" placeholder='Enter your email address' value={values.Email} onChange={(e) => setValues({ ...values, Email: e.target.value })} />
            </div>
            <div className="input-card2">
              <label htmlFor="password">Password:</label>
              {/* <button type="button" onClick={forgotPassword}>Reset Password</button> */}
              <input type="password" placeholder='Enter your password' value={values.Password} onChange={(e) => setValues({ ...values, Password: e.target.value })} />
            </div>
            <div className="btn">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
      <ToasterContainer /> {/* Render the toaster container */} 
    </div>
  );
};

export default Login;
