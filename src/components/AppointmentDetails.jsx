import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function AppointmentDetails() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [estimateTime, setEstimateTime] = useState('');
  const [actualPrice, setActualPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointmentDetails();
  }, []);

  const fetchAppointmentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/appointments/${id}`);
      const appointmentData = response.data;

      setAppointment(appointmentData);
      setEstimateTime(appointmentData.estimateTime || '');
      setActualPrice(appointmentData.actualPrice || '');
    } catch (error) {
      console.error('Error fetching appointment details', error);
    }
  };

  const handleUpdateAppointment = async (status) => {
    try {
      await axios.put(`http://localhost:8080/api/appointments/${id}`, {
        ...appointment,
        appointmentStatus: status,
        estimateTime,
        actualPrice,
      });
      alert(`Appointment ${status} successfully!`);
      navigate('/view-all-appointments');
    } catch (error) {
      alert('Error updating appointment');
      console.error(error);
    }
  };

  if (!appointment) return <p>Loading appointment details...</p>;

  return (
    <div>
      <h2>Appointment Details - ID: {appointment.id}</h2>
      <p><strong>Status:</strong> {appointment.appointmentStatus}</p>
      <p><strong>Job Description:</strong> {appointment.jobDescription}</p>
      <p><strong>Booking Date:</strong> {new Date(appointment.bookingDate).toLocaleString()}</p>
      <p><strong>Job Status:</strong> {appointment.jobStatus}</p>
      <p><strong>Place to Fix:</strong> {appointment.placeToFix}</p>
      <p><strong>Service Type:</strong> {appointment.serviceType}</p>
      <p><strong>Vehicle Type:</strong> {appointment.vehicleType}</p>

      <label><strong>Estimated Time (minutes):</strong></label>
      <input
        type="number"
        value={estimateTime}
        onChange={(e) => setEstimateTime(e.target.value)}
      />

      <label><strong>Actual Price:</strong></label>
      <input
        type="number"
        value={actualPrice}
        onChange={(e) => setActualPrice(e.target.value)}
      />

      <div>
        <button onClick={() => handleUpdateAppointment('accepted')}>Accept</button>
        <button onClick={() => handleUpdateAppointment('rejected')}>Reject</button>
      </div>
    </div>
  );
}

export default AppointmentDetails;