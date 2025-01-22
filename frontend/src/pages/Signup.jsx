import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Teacher');
  const [secretCode, setSecretCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (role === 'Admin' && secretCode !== '1234567') {
      setError('Invalid secret code for Admin role');
      return;
    }
    try {
      console.log('Signing up with:', { name, email, password, role });
      navigate('/profile');
    } catch (err) {
      setError('Error creating account');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('https://media.istockphoto.com/id/157194293/photo/nightride.jpg?s=612x612&w=0&k=20&c=a6ibBdkE6IFOKj-yjCXp0NCdGzDyt4ZBCHbTmHtrqoE=')` }}
    >
      <div className="w-full max-w-md p-8 bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-white">Sign Up</h2>
        {error && <p className="text-red-300 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-white">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          {role === 'Admin' && (
            <div className="mb-6">
              <label htmlFor="secretCode" className="block text-sm font-medium text-white">Secret Code</label>
              <input
                type="password"
                id="secretCode"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                required={role === 'Admin'}
                className="w-full px-4 py-2 mt-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-white text-[#481E2D] font-semibold rounded-md hover:bg-gray-200 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-white">
          Already have an account?{' '}
          <a href="/login" className="text-yellow-300 hover:text-yellow-400">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;