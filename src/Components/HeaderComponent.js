import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const HeaderComponent = () => {
  
  return (
   
    <div>
      <header>
        <nav className="navbar navbar-dark bg-primary"> 
          <Link to="/" className="navbar-brand">Task Tracker</Link>
          <div className="button-container">
            <Link to="/login" className="btn btn-outline-light mr-2 login-link">Login</Link> {/* Added login-link class */}
            <Link to="/register" className="btn btn-outline-light mr-2 login-link">Register</Link> 
          </div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
