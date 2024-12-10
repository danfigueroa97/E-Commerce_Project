import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Loginn.css';

const Login = () => {
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleButtonClick = (selectedRole) => {
    setRole(selectedRole);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/user/login', { ...formData, role });
      if (response.status === 200) {
        if (role === 'ADMIN') {
          navigate('/admin');
        } else if (role === 'USER') {
          navigate('/user');
        }
      }
    } catch (error) {
      alert('Login failed: ' + error.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <div className="login-container">
      {!showForm ? (
        <div className="login-box">
          <h1>Welcome</h1>
          <div className="button-container">
            <button onClick={() => handleButtonClick('ADMIN')}>Login as Admin</button>
            <button onClick={() => handleButtonClick('USER')}>Login as User</button>
          </div>
          <p className="create-account" onClick={() => navigate('/create-account')}>
            Don't have an account? <span>Create Account</span>
          </p>
        </div>
      ) : (
        <div className="login-box">
          <h2>Login como {role}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Enter</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Return
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;

