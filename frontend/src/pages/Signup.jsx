import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/images/bg.png'; // Ensure this path matches your folder structure

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
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-md p-8 bg-white bg-opacity-80 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center" style={{ color: '#481E2D' }}>
          Sign Up
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium" style={{ color: '#481E2D' }}>
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2"
              style={{ borderColor: '#481E2D' }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium" style={{ color: '#481E2D' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2"
              style={{ borderColor: '#481E2D' }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium" style={{ color: '#481E2D' }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2"
              style={{ borderColor: '#481E2D' }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium" style={{ color: '#481E2D' }}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2"
              style={{ borderColor: '#481E2D' }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium" style={{ color: '#481E2D' }}>
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2"
              style={{ borderColor: '#481E2D' }}
            >
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          {role === 'Admin' && (
            <div className="mb-6">
              <label htmlFor="secretCode" className="block text-sm font-medium" style={{ color: '#481E2D' }}>
                Secret Code
              </label>
              <input
                type="password"
                id="secretCode"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                required={role === 'Admin'}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: '#481E2D' }}
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 font-semibold rounded-md focus:outline-none"
            style={{
              backgroundColor: '#481E2D',
              color: 'white',
            }}
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm" style={{ color: '#481E2D' }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: '#481E2D', textDecoration: 'underline' }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
