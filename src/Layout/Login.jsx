import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {

  const [values, setValues] = useState({
    Email: '',
    Password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8800/api/employee/auth/login', values);
      console.log("data",res.data);
      if (res.data) {
        navigate('/main');
      } else {
        alert("No record found");
      }
      console.log(res);
    } catch (err) {
      console.log(err);
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
              <button type="button" onClick={forgotPassword}>Reset Password</button>
              <input type="password" placeholder='Enter your password' value={values.Password} onChange={(e) => setValues({ ...values, Password: e.target.value })} />
            </div>
            <div className="btn">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
