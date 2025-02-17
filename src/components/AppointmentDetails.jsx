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
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

function AppointmentDetails() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [estimateTime, setEstimateTime] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointmentDetails();
    fetchEmployees();
  }, []);

  const fetchAppointmentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/appointments/${id}`);
      const appointmentData = response.data;

      setAppointment(appointmentData);
      setEstimateTime(appointmentData.estimateTime || "");
      setActualPrice(appointmentData.actualPrice || "");
      setEmployeeId(appointmentData.employee ? appointmentData.employee.id : "");
    } catch (error) {
      console.error("Error fetching appointment details", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/customer/employees`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  const handleUpdateAppointment = async (status) => {
    try {
      await axios.put(`http://localhost:8080/api/appointments/${id}`, {
        ...appointment,
        appointmentStatus: status,
        estimateTime,
        actualPrice,
        employee: employeeId ? { id: employeeId } : null,
      });
      alert(`Appointment ${status} successfully!`);
      navigate("/appointments");
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

  const { vehicle } = appointment;

  return (
    <Grid container spacing={2} justifyContent="center" style={{ marginTop: "20px" }}>
      <Grid item xs={12} sm={6}>
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
            <Typography variant="body1" gutterBottom><strong>Service Type:</strong> {appointment.serviceType}</Typography>

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

            <FormControl fullWidth margin="dense">
              <InputLabel>Assign Employee</InputLabel>
              <Select
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">None</MenuItem>
                {employees.map((emp) => (
                  <MenuItem key={emp.id} value={emp.id}>
                    {emp.firstName} {emp.lastName} (ID: {emp.id})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
              <Grid item>
                <Button variant="contained" color="success" onClick={() => handleUpdateAppointment("accepted")}>
                  Accept
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="error" onClick={() => handleUpdateAppointment("rejected")}>
                  Reject
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Vehicle Details */}
      <Grid item xs={12} sm={6}>
        <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#1565c0" }}>
              Vehicle Details
            </Typography>
            <Typography variant="body1"><strong>Vehicle Number:</strong> {vehicle.vehicleNumber}</Typography>
            <Typography variant="body1"><strong>Model:</strong> {vehicle.model}</Typography>
            <Typography variant="body1"><strong>Year:</strong> {vehicle.year}</Typography>
            <Typography variant="body1"><strong>Color:</strong> {vehicle.color}</Typography>
            <Typography variant="body1"><strong>Fuel Type:</strong> {vehicle.fuelType}</Typography>
            <Typography variant="body1"><strong>Current Range:</strong> {vehicle.currentRange}</Typography>
            <Typography variant="body1"><strong>Description:</strong> {vehicle.description}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AppointmentDetails;
