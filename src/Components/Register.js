import React, { useState } from 'react';
import axios from "axios";
import { Navigate } from "react-router-dom";
import './Register.css';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [login, setLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://task-management-api-env.eba-esuuzu4p.ap-south-1.elasticbeanstalk.com/api/v1/user/register", { name, email, password, confirmPassword });
      setLogin(true);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="container">
      {login ? <Navigate to="/Login" /> : (
        <div className="form-container">
          <h1 style={{ color:'#0d6efd' }}>Welcome!</h1>
          <h3 style={{ color:'#000000' }}>Register Here</h3>

          <label className='form_ctrl'>Name <span>*</span></label>
          <input
            type="text"
            placeholder="Enter your username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className='form_ctrl'>Email <span>*</span></label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className='form_ctrl'>Password <span>*</span></label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className='form_ctrl'>Confirm Password <span>*</span></label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <p style={{ fontSize: "16px", margin:'10px' }}> If you have an account? <a href='/Login'>Login here</a></p>
          <button type="button" class="btn btn-info d-block mx-auto" onClick={handleSubmit}>Register</button>

        </div>
      )}
    </div>
  );
};

export default Register;
