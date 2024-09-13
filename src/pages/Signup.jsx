import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css'

const Signup = () => {
  const apiURL = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // POST: creates a new user and saves it in the DB
      await axios.post(`${apiURL}/users/signup`, {
        username,
        password,
      });

      setSuccess("User created successfully! You can now log in.");
      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const login = () =>{
    navigate('/')
  }

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div className="formGrp">
          <input
            type="text"
            id="username"
            value={username}
            placeholder="Username"
            className="inputField"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="formGrp">
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            className="inputField"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="errorMsg">{error}</div>}
        {success && <div className="successMsg">{success}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
      <p className="signup">
        Already have an account? <span onClick={login} className="loginLink">Login</span>
      </p>
    </div>
  );
};

export default Signup;