import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import Sidebar from "./sidebar";

const ViewAllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };

  const handleStatusFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    return filterStatus === "all" || appointment.appointmentStatus === filterStatus;
  });

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box flex={1} p={3} bgcolor="#F9FAFC">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          All Appointments
        </Typography>

        {/* Filter Dropdown */}
        <FormControl variant="outlined" sx={{ minWidth: 200, mb: 3 }}>
          <InputLabel>Status</InputLabel>
          <Select value={filterStatus} onChange={handleStatusFilterChange} label="Status">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>

        {/* Appointment List */}
        <Grid container spacing={2}>
          {filteredAppointments.map((appointment) => (
            <Grid item xs={12} sm={6} md={4} key={appointment.id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6">Appointment ID: {appointment.id}</Typography>
                  <Typography variant="body1" color="textSecondary">
                    Status: <strong>{appointment.appointmentStatus}</strong>
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/appointment-details/${appointment.id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ViewAllAppointments;
