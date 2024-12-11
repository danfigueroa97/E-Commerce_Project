import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Loginn.module.css';

const CreateAccount = () => {
  const [formData, setFormData] = useState({ username: '', password: '', email: '', address: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/user/create', { ...formData, role: 'USER' });
      if (response.status === 200) {
        navigate('/user'); // Redirige a la página de usuario después de crear la cuenta
      }
    } catch (error) {
      alert('Account creation failed: ' + error.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Create Account</h2>
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
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Create Account</button>
          <button type="button" onClick={() => navigate('/')}>Return</button> {/* Botón "Volver" */}
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
