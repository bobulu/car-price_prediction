import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice'; // Fixed import
import authService from '../../appwrite/auth';

const LogoutBtn = ({ className = '' }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await authService.logout(); // Ensuring proper logout call
      dispatch(logout()); // Dispatching logout action
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button
      className={`inline-block px-6 py-2 duration-200 hover:bg-blue-600 rounded-3xl ${className}`}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
