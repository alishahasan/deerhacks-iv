import React from 'react';
import logo from './logo2.png'; // Make sure to place your logo image in the same directory or update the path accordingly
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logo} alt="Logo" className="logo" />
    </div>
  );
};

export default Logo;