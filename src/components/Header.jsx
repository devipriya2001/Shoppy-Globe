import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cartIcon from '../assets/cart-icon.png';
import '../style.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear token
    alert('You have been logged out.');
    navigate('/login'); // Redirect to login
  };

  return (
    <header className="header">
      <div className="header-container">
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link cart-link">
            Cart
            <img src={cartIcon} alt="Cart Icon" className="cart-icon" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

