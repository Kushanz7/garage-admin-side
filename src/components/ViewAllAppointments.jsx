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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/appointments`);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };

  const handleStatusFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const getGradient = (status) => {
    switch (status) {
      case "accepted":
        return "linear-gradient(135deg, #66ff99 10%, #33cc66 100%)";
      case "rejected":
        return "linear-gradient(135deg, #ff6666 10%, #cc3333 100%)";
      case "pending":
        return "linear-gradient(135deg, #66ccff 10%, #3399ff 100%)";
      default:
        return "linear-gradient(135deg, #E1EEC3 10%, #F05053 100%)";
    }
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
        <FormControl variant="outlined" sx={{
          minWidth: 200,
          mb: 3,
          background: "linear-gradient(135deg, #a1c4fd 10%, #c2e9fb 100%)",
          borderRadius: "8px",
          boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
          "& .MuiInputLabel-root": { color: "black" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "transparent" },
            "&:hover fieldset": { borderColor: "transparent" },
            "&.Mui-focused fieldset": { borderColor: "transparent" },
          }
        }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            onChange={handleStatusFilterChange}
            label="Status"
            sx={{
              color: "white",
              "& .MuiSvgIcon-root": { color: "white" }
            }}
          >
            <MenuItem value="all" sx={{ fontSize: "1rem", padding: "10px 20px" }}>All</MenuItem>
            <MenuItem value="pending" sx={{ fontSize: "1rem", padding: "10px 20px" }}>Pending</MenuItem>
            <MenuItem value="accepted" sx={{ fontSize: "1rem", padding: "10px 20px" }}>Accepted</MenuItem>
            <MenuItem value="rejected" sx={{ fontSize: "1rem", padding: "10px 20px" }}>Rejected</MenuItem>
          </Select>
        </FormControl>

        {/* Appointment List */}
        <Grid container spacing={2}>
          {filteredAppointments.map((appointment) => (
            <Grid item xs={12} sm={6} md={4} key={appointment.id}>
              <Card sx={{
                background: getGradient(appointment.appointmentStatus),
                color: "white",
                textAlign: "center",
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                }
              }}>
                <CardContent>
                  <Typography variant="h6">Appointment ID: {appointment.id}</Typography>
                  <Typography variant="body1" color="white">
                    Status: <strong>{appointment.appointmentStatus}</strong>
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 2, background: "rgba(0, 0, 0, 0.5)" }}
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
