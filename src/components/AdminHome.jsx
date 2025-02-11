import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome, Admin!</h2>
      <button onClick={() => navigate('/view-all-appointments')}>View All Appointments</button>
    </div>
  );
}

export default AdminHome;
