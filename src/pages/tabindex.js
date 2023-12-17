import { Explore, Home, Settings } from "@mui/icons-material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function TabIndex() {
  const ref = React.useRef(null);
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Outlet />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          {[
            { title: "Assets", icon: <Home />, path: "/" },
            { title: "Explore", icon: <Explore />, path: "/explore" },
            { title: "Settings", icon: <Settings />, path: "/settings" },
          ].map((tab, index) => (
            <BottomNavigationAction
              label={tab.title}
              icon={tab.icon}
              onClick={() => navigate(tab.path)}
              key={index}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
