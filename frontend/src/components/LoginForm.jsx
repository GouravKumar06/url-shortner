import { useState } from 'react';
import { loginUser } from '../apis/createShortUrl';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({setIsLogin}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!validateEmail(formData.email)) {
      return setError('Please enter a valid email address');
    }
    if (!formData.password) {
      return setError('Password is required');
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await loginUser(formData.email, formData.password);
      
      console.log("Login response:", response);
      
      if (response.data.message === "Login successful") {
        // Store the access token
        localStorage.setItem('accessToken', response.data.accessToken);
        navigate({ to: '/dashboard' });
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (err) {
        console.log("Login error:", err);
      setError(err.response.data.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <span onClick={()=>setIsLogin(false)} className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer">
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;