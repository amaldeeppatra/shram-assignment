import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  const apiURL = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST: logs in the user
      const response = await axios.post(`${apiURL}/users/login`, { username, password });
      const { userId, token, username: receivedUsername } = response.data;

      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);
      localStorage.setItem('username', receivedUsername);

      navigate('/play');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const signup = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="loginTitle">Welcome Back</h2>
        <p className="loginSubtitle">Please log in to continue</p>
        <form onSubmit={handleSubmit} className="loginForm">
          <div className="formGroup">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="inputField"
            />
          </div>
          <div className="formGroup">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="inputField"
            />
          </div>
          <button type="submit" className="loginBtn">Login</button>
          {error && <p className="errorMsg">{error}</p>}
        </form>
        <p className="signup">
          Don't have an account? <span onClick={signup} className="signupLink">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;