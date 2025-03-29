import React, { useState, useEffect } from "react";
import axios from "axios";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
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
  const [appointments, setAppointments] = useState([]);
  const [estimateTime, setEstimateTime] = useState("");
  const [price, setPrice] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [employeeAppointments, setEmployeeAppointments] = useState([]);
  const [contactNo, setContactNo] = useState("");
  const [bookingDate, setBookingDate] = useState(""); // New state for booking date
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointmentDetails();
    fetchAppointments();
    fetchEmployees();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/appointments`);
      // Filter only accepted appointments
      const acceptedAppointments = response.data.filter(appointment => appointment.appointmentStatus === "accepted");
      setAppointments(acceptedAppointments);
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };

  useEffect(() => {
    if (employeeId) fetchEmployeeAppointments(employeeId);
  }, [employeeId]);

  const fetchAppointmentDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/appointments/${id}`);
      const appointmentData = response.data;

      setAppointment(appointmentData);
      setEstimateTime(appointmentData.estimateTime || "");
      setPrice(appointmentData.price || "");
      setEmployeeId(appointmentData.employee ? appointmentData.employee.id : "");
      setBookingDate(appointmentData.bookingDate ? new Date(appointmentData.bookingDate).toLocaleDateString() : ""); // Set initial booking date
      setContactNo(appointmentData.customer ? appointmentData.customer.contactNo : "N/A");
    } catch (error) {
      console.error("Error fetching appointment details", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/customer/employees`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  const fetchEmployeeAppointments = async (employeeId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/appointments/employee/${employeeId}`);
      setEmployeeAppointments(response.data);
    } catch (error) {
      console.error("Error fetching employee appointments", error);
    }
  };

  const handleUpdateAppointment = async (status) => {
    try {
      const formattedBookingDate = bookingDate
        ? new Date(bookingDate).toISOString() // Convert to ISO 8601 format
        : null;

      await axios.put(`${process.env.REACT_APP_API_URL}/api/appointments/${id}`, {
        ...appointment,
        appointmentStatus: status,
        price,
        employee: employeeId ? { id: employeeId } : null,
        bookingDate: formattedBookingDate, // Send formatted date
      });

       // Create separate messages for Accepted and Rejected
    let message = "";
    if (status === "accepted") {
      message = encodeURIComponent(
        `Dear Customer,\n\nWe are pleased to inform you that your appointment (ID: ${appointment.id}) for *${appointment.service}* on *${formattedBookingDate}* has been *ACCEPTED*.\n\nOur team looks forward to serving you at AutoSlot. If you have any questions, feel free to reach out.\n\nThank you for choosing AutoSlot!`
      );
    } else if (status === "rejected") {
      message = encodeURIComponent(
        `Dear Customer,\n\nWe regret to inform you that your appointment (ID: ${appointment.id}) for *${appointment.service}* on *${formattedBookingDate}* has been *REJECTED*.\n\nUnfortunately, we are unable to accommodate this request at the moment. Please contact us for further assistance.\n\nThank you for understanding.\n\nBest regards,\nAutoSlot Team`
      );
    }

    // Open WhatsApp chat
    if (appointment.customer?.contactNo) {
      window.open(`https://wa.me/${appointment.customer.contactNo}?text=${message}`, "_blank");
    } else {
      alert("Customer contact number is missing!");
    }

      alert(`Appointment ${status} successfully!`);
      navigate("/appointments");
    } catch (error) {
      alert("Error updating appointment");
      console.error(error);
    }
  };

  const handleUpdateActualPrice = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/appointments/${id}`, {
        ...appointment,
        price, // Update the price
        appointmentStatus: "finished", // Change the status to "finished"
      });
      alert("Payment confirmed!");
      fetchAppointmentDetails(); // Refresh data after update
    } catch (error) {
      alert("Error confirming payment");
      console.error(error);
    }
  };

  const openWhatsApp = async (phoneNumber) => {
    if (!phoneNumber) {
      alert("Customer contact number is missing!");
      return;
    }
  
    // Format the new date (without time for display)
    const formattedDate = bookingDate
      ? new Date(bookingDate).toLocaleDateString()
      : "a new date";
  
    // Professional message asking for confirmation
    const message = encodeURIComponent(
      `Dear Customer,\n\nWe would like to confirm your appointment (ID: ${appointment.id}).\n\nYou initially requested ${new Date(appointment.bookingDate).toLocaleDateString()}, but we are proposing a new date: *${formattedDate}*.\n\nPlease reply with 'YES' if this date works for you, or contact us to reschedule.\n\nThank you for choosing AutoSlot!`
    );
  
    // Open WhatsApp with the message
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  
    // Update the booking date in the database
    try {
      const updatedBookingDate = bookingDate
        ? `${new Date(bookingDate).toISOString().split("T")[0]}T00:00:00` // Send default time (00:00:00)
        : null;
  
      await axios.put(`${process.env.REACT_APP_API_URL}/api/appointments/${appointment.id}`, {
        ...appointment,
        bookingDate: updatedBookingDate, // Update the booking date with default time
      });
  
      alert("Booking date updated successfully in the database!");
    } catch (error) {
      console.error("Error updating booking date in the database", error);
      alert("Failed to update booking date in the database.");
    }
  };
  

  
  const handleConfirmPayment = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/appointments/${id}`, { price });
      alert("Payment confirmed successfully!");
    } catch (error) {
      alert("Error confirming payment");
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
    <Grid container spacing={3} justifyContent="center" style={{ marginTop: "20px" }}>
      {/* Appointment Details */}
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h5">Appointment Details - ID: {appointment.id}</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1">Status: {appointment.appointmentStatus}</Typography>
            <Typography variant="body1">Job Status: {appointment.jobStatus}</Typography>
            <Typography variant="body1">Service: {appointment.service}</Typography>
            <Typography variant="body1">
              Requested Date: {appointment.bookingDate ? new Date(appointment.bookingDate).toLocaleDateString() : "N/A"}
            </Typography>
            {/* <Typography variant="body1">Booking Date: {new Date(bookingDate).toLocaleString()}</Typography>  */}
            <TextField 
              label="Booking Date" 
              type="date" 
              fullWidth 
              value={bookingDate ? new Date(bookingDate).toISOString().split("T")[0] : ""} // Format to YYYY-MM-DD
              onChange={(e) => setBookingDate(e.target.value)} 
            />

            {/* <TextField label="Estimated Time" type="number" fullWidth value={estimateTime} onChange={(e) => setEstimateTime(e.target.value)} /> */}
            
            <FormControl fullWidth margin="dense">
              <InputLabel>Assign Employee</InputLabel>
              <Select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
                <MenuItem value=""><em>None</em></MenuItem>
                {employees.map((emp) => (
                  <MenuItem key={emp.id} value={emp.id}>
                    {emp.firstName} {emp.lastName} (ID: {emp.id})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item>
                <Button variant="contained" color="success" onClick={() => handleUpdateAppointment("accepted")}>Accept</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="error" onClick={() => handleUpdateAppointment("rejected")}>Reject</Button>
              </Grid>
            </Grid>
            <Typography variant="body1">
                <strong>Customer Contact:</strong> {contactNo}
            </Typography>
            <Button
              variant="contained"
              color="success"
              startIcon={<WhatsAppIcon />}
              onClick={() => openWhatsApp(contactNo)}
            >
              Confirm Booking Date
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <div>
      <h2>Appointments</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Service</th>
            <th>Booking Date</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.service}</td>
              <td>{new Date(appointment.bookingDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      {/* Payment Confirmation */}
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h5">Payment Confirmation</Typography>
            <Divider sx={{ mb: 2 }} />
            <TextField label="Bill Amount" type="number" fullWidth value={price} onChange={(e) => setPrice(e.target.value)} />
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleUpdateActualPrice}>Confirm Payment</Button>
          </CardContent>
        </Card>
      </Grid>


      {/* Vehicle Details */}
      <Grid item xs={12} sm={6}>
        <Card sx={{ boxShadow: 3, borderRadius: "12px", padding: 3, background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#1565c0" }}>
              Vehicle Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
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

      {/* Employee Assigned Appointments */}
      {employeeAppointments.length > 0 && (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5">Appointments Assigned to Selected Employee</Typography>
              <Divider sx={{ mb: 2 }} />
              {employeeAppointments
                .filter((appt) => appt.jobStatus !== "finished") // Filter out finished appointments
                .map((appt) => (
                  <Typography key={appt.id}>
                    {appt.id} - Booked Date: {appt.bookingDate ? new Date(appt.bookingDate).toISOString().split("T")[0] : "N/A"} - Job Status: {appt.jobStatus} - Service: {appt.service}
                  </Typography>
                ))}
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}

export default AppointmentDetails;
