import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewAllAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments', error);
    }
  };

  const handleStatusFilterChange = (status) => {
    setFilterStatus(status);
  };

  const filteredAppointments = appointments.filter(appointment => {
    return filterStatus === 'all' || appointment.appointmentStatus === filterStatus;
  });

  return (
    <div>
      <h2>All Appointments</h2>

      <select onChange={(e) => handleStatusFilterChange(e.target.value)}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
      </select>

      <ul>
        {filteredAppointments.map(appointment => (
          <li key={appointment.id}>
            {`Appointment ID: ${appointment.id}, Status: ${appointment.appointmentStatus}`}
            <button onClick={() => navigate(`/appointment-details/${appointment.id}`)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewAllAppointments;
