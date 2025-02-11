import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import AdminHome from './components/AdminHome';
import ViewAllAppointments from './components/ViewAllAppointments';
import AppointmentDetails from './components/AppointmentDetails';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const customerId = params.get('userId'); 
    const customerEmail = params.get('email');
    const customerName = params.get('name');

    if (customerId && customerEmail) {
      // Store user information in localStorage
      localStorage.setItem('customerId', customerId);
      localStorage.setItem('customerEmail', customerEmail);
      localStorage.setItem('customerName', customerName);
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/view-all-appointments" element={<ViewAllAppointments />} />
        <Route path="/appointment-details/:id" element={<AppointmentDetails />} />
      </Routes>
    </div>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
