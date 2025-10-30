import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();         // clear auth state
    navigate('/');    // redirect to home
  };

  return (
    <header className='nav'>
      <div className='nav-inner container'>
        <Link to='/' className='brand'>
          <img src={logo} alt='WatchStore' className='brand-logo' />
          <span className='brand-text'>Pulse Watches</span>
        </Link>

        <nav className='nav-links'>
          <Link to='/'>Featured</Link>
          <Link to='/?section=men'>Men's</Link>
          <Link to='/?section=women'>Women's</Link>
          <Link to='/?section=new'>New Arrivals</Link>
          <Link to='/cart'>Cart</Link>
        </nav>

        <div className='nav-actions'>
          {user ? (
            <>
              <span className='nav-user'>Hi, {user.name}</span>
              <button onClick={handleLogout} className='btn-logout'>Logout</button>
            </>
          ) : (
            <>
              <Link to='/login' className='nav-link'>Login</Link>
              <Link to='/register' className='nav-link'>Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
