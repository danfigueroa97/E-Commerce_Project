import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/Loginn.module.css';

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
      const response = await axios.post('http://localhost:8080/user/login', {
        ...formData,
        role,
      });

      if (response.status === 200) {
        localStorage.setItem(
          'user',
          JSON.stringify({
            username: response.data.username,
            role: response.data.role,
            id: response.data.id,
            email: response.data.email,
          })
        );

        // Redirección según rol
        navigate(role === 'ADMIN' ? '/admin' : '/user');
      }
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className={styles['login-container']}>
      {!showForm ? (
        <div className={styles['login-box']}>
          <h1 className={styles['login-title']}>Welcome</h1>
          <div className={styles['login-button-container']}>
            <button
              onClick={() => handleButtonClick('ADMIN')}
              className={styles['login-button']}
              aria-label="Login as Admin"
            >
              Login as Admin
            </button>
            <button
              onClick={() => handleButtonClick('USER')}
              className={styles['login-button']}
              aria-label="Login as User"
            >
              Login as User
            </button>
          </div>
          <p
            className={styles['login-create-account']}
            onClick={() => navigate('/create-account')}
          >
            Don't have an account? <span>Create Account</span>
          </p>
        </div>
      ) : (
        <div className={styles['login-box']}>
          <h2 className={styles['login-title']}>Login as {role}</h2>
          <form onSubmit={handleSubmit} className={styles['login-form']}>
            <div>
              <label htmlFor="username" className={styles['login-label']}>
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className={styles['login-input']}
              />
            </div>
            <div>
              <label htmlFor="password" className={styles['login-label']}>
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className={styles['login-input']}
              />
            </div>
            <button
              type="submit"
              className={`${styles['login-button']} ${styles['submit']}`}
              aria-label="Submit Login"
            >
              Enter
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className={`${styles['login-button']} ${styles['cancel']}`}
              aria-label="Return to Role Selection"
            >
              Return
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
