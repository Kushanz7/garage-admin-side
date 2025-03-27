import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box display="flex" minHeight="100vh">
      {/* Sidebar with fixed width */}
      <Box width="200px" sx={{ background: "linear-gradient(135deg, #0d1b2a 10%, #1b263b 100%)" }}>
        <Sidebar />
      </Box>

      {/* Main content with padding to avoid going under the sidebar */}
      <Box flex={1} p={3} bgcolor="linear-gradient(135deg, #0d1b2a 10%, #1b263b 100%)">
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
