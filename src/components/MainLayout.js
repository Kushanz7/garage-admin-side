import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box display="flex" minHeight="100vh">
      {/* Sidebar with fixed width */}
      <Box width="250px">
        <Sidebar />
      </Box>

      {/* Main content with padding to avoid going under the sidebar */}
      <Box flex={1} p={3} bgcolor="#F9FAFC">
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
