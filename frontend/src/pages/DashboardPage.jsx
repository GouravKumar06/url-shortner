import React, { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import axiosInstance from '../utils/axiosInstance';
import UrlForm from '../components/UrlForm';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async (token) => {
      try {
        const response = await axiosInstance.post('/me', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Ensure cookies are sent for refresh token
        });
        if (isMounted) {
          setUser(response.data.user);
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          throw err; // Propagate error to outer try-catch
        }
      }
    };

    const refreshAccessToken = async () => {
      try {
        const res = await axiosInstance.post('/refresh', {}, {
          withCredentials: true, // Send cookie refresh token
        });
        return res.data.accessToken;
      } catch (err) {
        console.error('Failed to refresh token', err);
        return null;
      }
    };

    const checkAuthAndFetch = async () => {
      let token = localStorage.getItem('accessToken');
      if (!token) {
        navigate({ to: '/auth' });
        return;
      }

      try {
        await fetchProfile(token);
      } catch (err) {
        console.error('Failed to fetch profile', err);
        const newToken = await refreshAccessToken();
        if (!newToken) {
          setError('Session expired. Please login again.');
          navigate('/auth');
          return;
        }
        localStorage.setItem('accessToken', newToken);
        try {
          await fetchProfile(newToken);
        } catch {
          setError('Unauthorized. Please login again.');
          navigate('/auth');
        }
      }
    };

    checkAuthAndFetch();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-5">URL Shortener</h1>         
          <UrlForm/>
        </div>
    </div>
  );
};

export default DashboardPage;
