import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BuildIcon from "@mui/icons-material/Build";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, to: '/' },
    { text: 'Appointments', icon: <EventNoteIcon />, to: '/appointments' },
    { text: 'Users', icon: <PeopleIcon />, to: '/users' },
    { text: 'Auto Parts', icon: <BuildIcon />, to: '/auto-parts' }
  ];

  return (
    <Drawer variant="permanent" sx={{
      '& .MuiDrawer-paper': {
        background: "linear-gradient(135deg,rgb(1, 50, 128) 10%,rgb(0, 33, 48) 100%)",
        color: "white",
        boxShadow: "0 3px 6px rgba(0,0,0,0.1)"
      }
    }}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            component={Link}
            to={item.to}
            key={index}
            sx={{
              '&:hover': {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transform: "scale(1.05)"
              },
              backgroundColor: location.pathname === item.to ? "rgba(255, 255, 255, 0.2)" : "transparent",
              transition: "transform 0.3s, background-color 0.3s"
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.to ? "yellow" : "white" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ color: location.pathname === item.to ? "yellow" : "white" }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
