import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from '@tanstack/react-router';
import * as jwt_decode from 'jwt-decode';
import axiosInstance from '../utils/axiosInstance'; // axios with baseURL

// API call to refresh access token using refresh token cookie
const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.post(
      '/refresh',
      {},
      { withCredentials: true } // important: send cookies
    );
    const { accessToken } = response.data;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      return true;
    }
    return false;
  } catch (err) {
    console.error('Refresh token failed', err);
    return false;
  }
};

// API call to logout user, clears refresh cookie server side
const logoutUser = async () => {
  try {
    await axiosInstance.post('/logout', {}, { withCredentials: true });
  } catch (err) {
    console.error('Logout API error:', err);
  }
};

const isTokenExpired = (token) => {
  try {
    const { exp } = jwt_decode(token);
    if (!exp) return true;
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setIsLoggedIn(false);
        return;
      }
      if (isTokenExpired(token)) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          localStorage.removeItem('accessToken');
          setIsLoggedIn(false);
          return;
        }
      }
      setIsLoggedIn(true);
    };
    checkAuth();
  }, [location.pathname]);

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    navigate('/auth');
  };

  // Decide which links to show based on your table and current path
  const path = location.pathname;

  const showLogin = !isLoggedIn && (path === '/' || path === '/auth');
  const showDashboard =
    isLoggedIn && (path === '/' || path === '/auth' || path === '/track');
  const showTrack = isLoggedIn && path === '/dashboard';
  const showLogout = isLoggedIn;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              URL Shortener
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {showDashboard && (
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
            )}
            {showTrack && (
              <Link
                to="/track"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Track
              </Link>
            )}
            {showLogin && (
              <Link
                to="/auth"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
            {showLogout && (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
