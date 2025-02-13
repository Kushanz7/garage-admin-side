import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import { BarChart, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Bar, Legend, ResponsiveContainer } from 'recharts';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import Sidebar from './sidebar';

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    completedRepairs: 0,
    registeredUsers: 0,
    availableAutoParts: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    // Fetch data from the backend
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const statsData = [
    { title: "Total Appointments", value: stats.totalAppointments, icon: <EventNoteIcon />, color: "#4caf50" },  
    { title: "Pending Appointments", value: stats.pendingAppointments, icon: <ScheduleIcon />, color: "#f57c00" },  
    { title: "Completed Repairs", value: stats.completedRepairs, icon: <BuildIcon />, color: "#ff9800" },  
    { title: "Registered Users", value: stats.registeredUsers, icon: <PeopleIcon />, color: "#e91e63" },  
    { title: "Available Auto Parts", value: stats.availableAutoParts, icon: <SettingsIcon />, color: "#3f51b5" },  
    { title: "Total Revenue", value: `$${stats.totalRevenue}`, icon: <MonetizationOnIcon />, color: "#009688" },  
  ];

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box flex={1} p={3} bgcolor="#F9FAFC">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Hi, Welcome back 👋
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={2}>
          {statsData.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ backgroundColor: stat.color, color: "white", textAlign: "center" }}>
                <CardContent>
                  <IconButton sx={{ color: "white" }}>{stat.icon}</IconButton>
                  <Typography variant="h6">{stat.title}</Typography>
                  <Typography variant="h4" fontWeight="bold">{stat.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminHome;
