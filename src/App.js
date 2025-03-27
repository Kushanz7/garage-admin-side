import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import MainLayout from "./components/MainLayout";
import AdminHome from "./components/AdminHome";
import AutoPartsPage from "./components/AutoPartPage";
import UsersPage from "./components/RegisterUser";
import AppointmentsPage from "./components/ViewAllAppointments";
import AppointmentDetails from "./components/AppointmentDetails";
import UpdateAutoPartPage from "./components/UpdateAutoPartPage";
import ServicesPage from "./components/ServicesPage";

// Protected Route to check authentication
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole === "ADMIN") {
      setIsAuthenticated(true);
    } else {
      navigate("/login"); // Redirect if not an admin
    }
  }, [navigate]);

  return isAuthenticated ? children : null;
};

const App = () => {
  return (
    <Router> {/* ✅ Only one Router wrapping everything */}
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Protect the admin routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="auto-parts" element={<AutoPartsPage />} />
          <Route path="appointment-details/:id" element={<AppointmentDetails />} />
          <Route path="update-auto-part/:id" element={<UpdateAutoPartPage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
