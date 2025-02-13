import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";

function AppointmentDetails() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [estimateTime, setEstimateTime] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointmentDetails();
  }, []);

  const fetchAppointmentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/appointments/${id}`);
      const appointmentData = response.data;

      setAppointment(appointmentData);
      setEstimateTime(appointmentData.estimateTime || "");
      setActualPrice(appointmentData.actualPrice || "");
    } catch (error) {
      console.error("Error fetching appointment details", error);
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
      navigate("/view-all-appointments");
    } catch (error) {
      alert("Error updating appointment");
      console.error(error);
    }
  };

  if (!appointment)
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <CircularProgress />
        <Typography variant="h6" color="textSecondary">
          Loading appointment details...
        </Typography>
      </div>
    );

  return (
    <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#1565c0" }}>
              Appointment Details - ID: {appointment.id}
            </Typography>

            <Typography variant="body1"><strong>Status:</strong> {appointment.appointmentStatus}</Typography>
            <Typography variant="body1"><strong>Job Description:</strong> {appointment.jobDescription}</Typography>
            <Typography variant="body1"><strong>Booking Date:</strong> {new Date(appointment.bookingDate).toLocaleString()}</Typography>
            <Typography variant="body1"><strong>Job Status:</strong> {appointment.jobStatus}</Typography>
            <Typography variant="body1"><strong>Place to Fix:</strong> {appointment.placeToFix}</Typography>
            <Typography variant="body1"><strong>Service Type:</strong> {appointment.serviceType}</Typography>
            <Typography variant="body1" gutterBottom><strong>Vehicle Type:</strong> {appointment.vehicleType}</Typography>

            <TextField
              label="Estimated Time (minutes)"
              type="number"
              fullWidth
              margin="dense"
              value={estimateTime}
              onChange={(e) => setEstimateTime(e.target.value)}
            />

            <TextField
              label="Actual Price"
              type="number"
              fullWidth
              margin="dense"
              value={actualPrice}
              onChange={(e) => setActualPrice(e.target.value)}
            />

            <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
              <Grid item>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleUpdateAppointment("accepted")}
                >
                  Accept
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleUpdateAppointment("rejected")}
                >
                  Reject
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AppointmentDetails;
