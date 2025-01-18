import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // For testing purposes, bypassing email/password validation
    const isValidLogin = email && password; // Allow any email/password combination for testing

    if (isValidLogin) {
      localStorage.setItem('authToken', 'some-auth-token'); // Simulate login by storing an auth token
      setIsAuthenticated(true); // Update the authentication state

      // Check if the profile is completed
      const profileCompleted = localStorage.getItem('profileCompleted') === 'true';

      if (!profileCompleted) {
        // If profile is not completed, redirect to profile completion page
        navigate('/profile');
      } else {
        // If profile is completed, redirect to the dashboard
        navigate('/teacher-dashboard');
      }
    } else {
      setError('Invalid email or password'); // Optional, can be removed for testing purposes
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/src/assets/images/bg.png')` }}
    >
      <div className="w-full max-w-md p-8 bg-white bg-opacity-80 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#481E2D]"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#481E2D]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#481E2D] text-white font-semibold rounded-md hover:bg-[#3C1926] focus:outline-none focus:ring-2 focus:ring-[#481E2D]"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-[#481E2D] hover:text-[#3C1926]">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
