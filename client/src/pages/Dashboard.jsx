import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { assets } from "../assets/assets";

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* HEADER */}
      <Box
        sx={{
          px: { xs: 2, sm: 4 },
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #e5e7eb",
          bgcolor: "#fff"
        }}
      >
        <Box
          component="img"
          src={assets.logo}
          onClick={() => navigate("/")}
          alt="logo"
          sx={{ height: { xs: 28, sm: 36 }, cursor: "pointer" }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body2"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Hi, Kamalesh
          </Typography>

          <IconButton onClick={handleOpen} size="small">
            <Avatar sx={{ width: 34, height: 34 }}>
              {assets.company_icon}
            </Avatar>
          </IconButton>
        </Box>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>My Profile</MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Box>

      {/* MAIN LAYOUT */}
      <Box sx={{ display: "flex", minHeight: "calc(100vh - 72px)" }}>
        {/* SIDEBAR */}
        <Box
          sx={{
            width: { xs: 60, md: 220 },
            borderRight: "1px solid #e5e7eb",
            bgcolor: "#fafafa",
            height: "100vh",
            pt: 2,
            
          }}
        >
          <List sx={{ p: 0 }}>
            {/* Manage Jobs */}
            <ListItemButton
              component={NavLink}
              to="/dashboard/manage-jobs"
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 0,
                "&.active": {
                  bgcolor: "#eef2ff",
                  borderRight: "4px solid #6366f1",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 35 }}>
                <Box
                  component="img"
                  src={assets.home_icon}
                  sx={{ width: 20 }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Manage Jobs"
                sx={{
                  display: { xs: "none", md: "block" },
                }}
              />
            </ListItemButton>

            {/* Add Job */}
            <ListItemButton
              component={NavLink}
              to="/dashboard/add-job"
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 0,
                "&.active": {
                  bgcolor: "#eef2ff",
                  borderRight: "4px solid #6366f1",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 35 }}>
                <Box component="img" src={assets.add_icon} sx={{ width: 20 }} />
              </ListItemIcon>
              <ListItemText
                primary="Add Job"
                sx={{
                  display: { xs: "none", md: "block" },
                }}
              />
            </ListItemButton>

            {/* View Applications */}
            <ListItemButton
              component={NavLink}
              to="/dashboard/view-applications"
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 0,
                "&.active": {
                  bgcolor: "#eef2ff",
                  borderRight: "4px solid #6366f1",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 35 }}>
                <Box
                  component="img"
                  src={assets.person_tick_icon}
                  sx={{ width: 20 }}
                />
              </ListItemIcon>
              <ListItemText
                primary="View Applications"
                sx={{
                  display: { xs: "none", md: "block" },
                }}
              />
            </ListItemButton>
          </List>
        </Box>

        {/* CONTENT */}
        <Box sx={{ flex: 1, p: { xs: 2, sm: 4 } }}>
          <Outlet />
        </Box>
      </Box>
      
    </>
  );
};

export default Dashboard;
