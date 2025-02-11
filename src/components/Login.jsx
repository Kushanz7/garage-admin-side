import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const googleLogin = () => {
    console.log("logging in with google")
    window.location.href = 'http://localhost:8080/login/google';
  };
  

  const handleLocalLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login/local', {
        email,
        password
      });

      // Store customer info after successful login
      localStorage.setItem('customerId', response.data.id);
      localStorage.setItem('customerName', response.data.firstName);
      localStorage.setItem('customerEmail', response.data.email);
      
      navigate('/admin-home'); // Navigate to home page
      alert('Login successful!');
    } catch (error) {
      alert('Login failed!');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleLocalLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Enter Email ...' />
        
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required  placeholder='Enter Password ...'/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
