import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Admin from './components/Admin';
import User from './components/User';
import CreateAccount from './components/CreateAccount';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />  {/* Página de inicio de sesión */}
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/admin" element={<Admin />} />  {/* Página de cliente, solo accesible después de iniciar sesión */}
          <Route path="/user" element={<User />} />  {/* Página de cliente, solo accesible después de iniciar sesión */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
