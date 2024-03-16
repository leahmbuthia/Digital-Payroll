import React from "react";
import "./Login.scss";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const users = [
      {
          "id": "1",
          "role": "Admin",
          "first_name": "Leah Nyambura",
          "last_name": "Nyambura",
          "email": "admin@payroll.com",
          "password": "Admin"
      },
      {
          "id": "2",
          "role": "employee",
          "first_name": "Leah",
          "last_name": "Nyambura",
          "email": "leah@payroll.com",
          "password": "123456"
      },
     
  ];

  const handleLogin = () => {

      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
          localStorage.setItem('loggedInUser', JSON.stringify({ email,password }));

          if (user.role.toLowerCase() === 'admin') {
              navigate('/admin');
          } else if (user.role.toLowerCase() === 'employee') {
              navigate('/main');
          } else {
              alert('You are not assigned any role, please contact the support center');
          }
      } else {
          alert('Invalid email or password');
      }
  };

  const forgotPassword = () => {
      alert('Please contact the support center to reset your logins!')
  }
  return (
    <div className="login">
      <div className="cardd">
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
          <form onSubmit={handleLogin}>
            <div className="input-card1">
            <input type="email" placeholder='Enter your email address' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-card2">
              <label htmlFor="password">Password:</label>
              <button type="button">Reset Password</button>
              <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
              {/* <input type="password" id="password" placeholder="Password" /> */}
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
