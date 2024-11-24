import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
        <Link to="/admin/dashboard" className={location.pathname === '/admin/dashboard' ? 'active' : ''}>Admin Dashboard</Link>

      </div>
    </nav>
  );
};

export default Navbar;





