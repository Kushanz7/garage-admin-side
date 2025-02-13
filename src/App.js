import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import AdminHome from "./components/AdminHome";
import AutoPartsPage from "./components/AutoPartPage";
import UsersPage from "./components/RegisterUser";
import AppointmentsPage from "./components/ViewAllAppointments";
import AppointmentDetails from "./components/AppointmentDetails";
import UpdateAutoPartPage from "./components/UpdateAutoPartPage";

const App = () => {
  return (
      <Routes>
        {/* Wrap all main routes inside MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="auto-parts" element={<AutoPartsPage />} />
          <Route path="/appointment-details/:id" element={<AppointmentDetails />} />
          <Route path="/update-auto-part/:id" element={<UpdateAutoPartPage />} />
        </Route>
      </Routes>
  );
};

export default App;
