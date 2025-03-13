import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Card, CardContent, Typography, IconButton, CircularProgress, Skeleton } from '@mui/material';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/stats`);
        setStats(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : "Error fetching dashboard data.");
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsData = [
    { title: "Total Appointments", value: stats.totalAppointments, icon: <EventNoteIcon />, gradient: "linear-gradient(135deg, #6B73FF 10%, #000DFF 100%)" },
    { title: "Pending Appointments", value: stats.pendingAppointments, icon: <ScheduleIcon />, gradient: "linear-gradient(135deg, #FFC371 10%, #FF5F6D 100%)" },
    { title: "Completed Repairs", value: stats.completedRepairs, icon: <BuildIcon />, gradient: "linear-gradient(135deg, #FFDD77 10%, #FFB347 100%)" },
    { title: "Registered Users", value: stats.registeredUsers, icon: <PeopleIcon />, gradient: "linear-gradient(135deg, #F093FB 10%, #F5576C 100%)" },
    { title: "Available Auto Parts", value: stats.availableAutoParts, icon: <SettingsIcon />, gradient: "linear-gradient(135deg, #00B4DB 10%, #0083B0 100%)" },
    { title: "Total Revenue", value: `Rs.${stats.totalRevenue}`, icon: <MonetizationOnIcon />, gradient: "linear-gradient(135deg, #00C9FF 10%, #92FE9D 100%)" },
  ];

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box flex={1} p={3} bgcolor="#F9FAFC">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard
        </Typography>

        {loading ? (
          <Grid container spacing={2}>
            {statsData.map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Skeleton variant="rectangular" width="100%" height={180} />
                <Skeleton width="60%" />
                <Skeleton width="40%" />
              </Grid>
            ))}
          </Grid>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={2}>
            {statsData.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{
                  background: stat.gradient,
                  color: "white",
                  textAlign: "center",
                  borderRadius: "16px",
                  boxShadow: 3,
                  padding: 2
                }}>
                  <CardContent>
                    {/* Icon */}
                    <Box sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 2,
                      fontSize: "2rem",
                    }}>
                      <IconButton sx={{ color: "white" }} aria-label={stat.title}>
                        {stat.icon}
                      </IconButton>
                    </Box>

                    {/* Title */}
                    <Typography variant="h6" fontWeight="bold">
                      {stat.title}
                    </Typography>

                    {/* Value */}
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default AdminHome;
