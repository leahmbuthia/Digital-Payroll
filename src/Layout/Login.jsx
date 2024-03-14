import React from "react";
import logo from "../assets/DIGITAL PAYROLL.png";
import "./Login.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Digital Payroll</h1>
          <span>Your all in one people solution Seamlessly manage your employees, from onboarding to retirement with Digital Payroll.</span>
          <p>Welcome  back! Please login to your account.</p>
      
        </div>
        <div className="right">
          <div className="login-header">
          <h1>Login to Digital Payroll</h1>
          <p>Enter your email and password to continue</p>
          </div>
          <form>
            <div className="input-card1">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" placeholder="Enter your Email" />
            </div>
            <div className="input-card2">
              <label htmlFor="password">Password:</label>
              <button type="button">Reset Password</button>
              <input type="password" id="password" placeholder="Password" />
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
