import React, { useState } from 'react';
import axios from "axios";
import { Navigate } from "react-router-dom";
import './Register.css';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://task-management-api-env.eba-esuuzu4p.ap-south-1.elasticbeanstalk.com/api/v1/authentication/login", { userName, password });
      localStorage.setItem('token', res.data.token);
      setLogin(true); // Set login to true only after successful authentication
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid username or password"); // Set error message if authentication fails
    }
  };

  if (login) {
    return <Navigate to="/home" />;
  }

  return (
    <div className='container'>
      <div className='form-container'>
        <h1 style={{ color:'#0d6efd' }}>Welcome!</h1>
        <h3>Login Here</h3>

        <label>Email <span>*</span></label>
        <input
          type="email"
          placeholder="Enter your email"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <label>Password <span>*</span></label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if authentication fails */}
        
        <p style={{ fontSize: "16px", margin:'10px' }}>Don't have an account? <a href='/register'>Register here</a></p>
        <button type="button" className="btn btn-info d-block mx-auto" onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
};

export default Login;
