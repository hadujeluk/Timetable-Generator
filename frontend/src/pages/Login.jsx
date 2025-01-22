import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidLogin = email && password;

    if (isValidLogin) {
      localStorage.setItem('authToken', 'some-auth-token');
      setIsAuthenticated(true);
      const profileCompleted = localStorage.getItem('profileCompleted') === 'true';

      if (!profileCompleted) {
        navigate('/profile');
      } else {
        navigate('/teacher-dashboard');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('https://media.istockphoto.com/id/157194293/photo/nightride.jpg?s=612x612&w=0&k=20&c=a6ibBdkE6IFOKj-yjCXp0NCdGzDyt4ZBCHbTmHtrqoE=')` }}
    >
      <div className="w-full max-w-md p-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-white">Login</h2>
        {error && <p className="text-red-300 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-white text-[#481E2D] font-semibold rounded-md hover:bg-gray-200 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-white">
          Don't have an account?{' '}
          <a href="/signup" className="text-yellow-300 hover:text-yellow-400">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;